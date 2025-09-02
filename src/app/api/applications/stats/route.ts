import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const generation = searchParams.get('generation')

    const where: any = {}
    if (generation && generation !== 'all') {
      where.generation = parseInt(generation)
    }

    // 상태별 통계
    const statusStats = await prisma.application.groupBy({
      by: ['status'],
      where,
      _count: {
        status: true
      }
    })

    // 기수별 통계
    const generationStats = await prisma.application.groupBy({
      by: ['generation'],
      where,
      _count: {
        generation: true
      },
      orderBy: {
        generation: 'desc'
      }
    })

    // 월별 지원 통계 (최근 6개월)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyStats = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "submittedAt") as month,
        COUNT(*)::integer as count
      FROM applications 
      WHERE "submittedAt" >= ${sixMonthsAgo}
      ${generation && generation !== 'all' ? 
        prisma.$queryRaw`AND generation = ${parseInt(generation)}` : 
        prisma.$queryRaw``
      }
      GROUP BY DATE_TRUNC('month', "submittedAt")
      ORDER BY month DESC
    `

    // 전체 통계
    const totalApplications = await prisma.application.count({ where })
    
    // 최근 승인율 (최근 100개 지원서 기준)
    const recentApplications = await prisma.application.findMany({
      where,
      select: { status: true },
      orderBy: { submittedAt: 'desc' },
      take: 100
    })

    const recentApprovalRate = recentApplications.length > 0 
      ? Math.round((recentApplications.filter(app => app.status === 'APPROVED').length / recentApplications.length) * 100)
      : 0

    const stats = {
      total: totalApplications,
      statusBreakdown: statusStats.reduce((acc: any, stat) => {
        acc[stat.status] = stat._count.status
        return acc
      }, {}),
      generationBreakdown: generationStats.map(stat => ({
        generation: stat.generation,
        count: stat._count.generation
      })),
      monthlyTrend: monthlyStats,
      approvalRate: recentApprovalRate
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('지원서 통계 조회 오류:', error)
    return NextResponse.json(
      { error: '통계를 불러오는데 실패했습니다' },
      { status: 500 }
    )
  }
}