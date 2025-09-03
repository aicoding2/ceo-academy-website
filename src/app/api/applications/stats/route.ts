import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  try {
    // 임시 더미 통계 데이터
    const stats = {
      total: 156,
      statusBreakdown: {
        PENDING: 45,
        REVIEWING: 23,
        APPROVED: 67,
        REJECTED: 15,
        WAITLIST: 6
      },
      generationBreakdown: [
        { generation: 2, count: 156 }
      ],
      monthlyTrend: [
        { month: new Date(), count: 25 }
      ],
      approvalRate: 43
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