import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { ApplicationStatus, Prisma } from '@prisma/client'

const applicationSchema = z.object({
  name: z.string().min(1, '성명을 입력해주세요'),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, '010-1234-5678 형식으로 입력해주세요'),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  companyPosition: z.string().min(1, '소속과 직위를 입력해주세요'),
  address: z.string().optional(),
  interests: z.array(z.string()).min(1, '관심 분야를 최소 1개 이상 선택해주세요'),
  golf: z.string().min(1, '골프 여부를 선택해주세요'),
  referrer: z.string().optional(),
  taxInvoice: z.string().min(1, '세금계산서 발행 여부를 선택해주세요'),
  generation: z.number().min(1, '기수를 선택해주세요'),
})

type ApplicationWhere = {
  status?: ApplicationStatus
  generation?: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const generation = searchParams.get('generation')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: ApplicationWhere = {}
    
    if (status && status !== 'ALL') {
      where.status = status as ApplicationStatus
    }
    
    if (generation && generation !== 'all') {
      where.generation = parseInt(generation)
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      },
      skip,
      take: limit
    })

    const total = await prisma.application.count({ where })

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('지원서 조회 오류:', error)
    return NextResponse.json(
      { error: '지원서를 불러오는데 실패했습니다' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validatedData = applicationSchema.parse(body)

    // 전화번호 중복 확인
    const existingApplication = await prisma.application.findFirst({
      where: {
        phone: validatedData.phone,
        generation: validatedData.generation
      }
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: '이미 해당 기수에 지원하신 전화번호입니다' },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: validatedData
    })

    return NextResponse.json({ 
      message: '지원서가 성공적으로 제출되었습니다',
      application: {
        id: application.id,
        name: application.name,
        generation: application.generation,
        status: application.status
      }
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: '입력 데이터가 올바르지 않습니다',
          details: error.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }

    console.error('지원서 생성 오류:', error)
    return NextResponse.json(
      { error: '지원서 제출에 실패했습니다' },
      { status: 500 }
    )
  }
}