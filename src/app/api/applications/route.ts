import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// 상수 정의
const PHONE_REGEX = /^010-\d{4}-\d{4}$/
const DEFAULT_PAGE_SIZE = 10
const MAX_PAGE_SIZE = 100

// 스키마 정의
const applicationSchema = z.object({
  name: z.string().min(1, '성명을 입력해주세요').max(50, '이름은 50자 이하로 입력해주세요'),
  phone: z.string().regex(PHONE_REGEX, '010-1234-5678 형식으로 입력해주세요'),
  birthDate: z.string().optional(),
  gender: z.enum(['남', '여']).optional(),
  companyPosition: z.string().min(1, '소속과 직위를 입력해주세요').max(200, '소속과 직위는 200자 이하로 입력해주세요'),
  address: z.string().max(300, '주소는 300자 이하로 입력해주세요').optional(),
  interests: z.array(z.string()).min(1, '관심 분야를 최소 1개 이상 선택해주세요').max(10, '관심 분야는 최대 10개까지 선택 가능합니다'),
  golf: z.enum(['Yes', 'No'], { message: '골프 여부를 선택해주세요' }),
  referrer: z.string().max(100, '추천인은 100자 이하로 입력해주세요').optional(),
  taxInvoice: z.enum(['발행', '미발행'], { message: '세금계산서 발행 여부를 선택해주세요' }),
  generation: z.number().int().min(1, '기수를 선택해주세요').max(100, '유효하지 않은 기수입니다'),
})

// 타입 정의
type ApplicationStatus = 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED' | 'WAITLIST'
type Application = {
  id: string
  name: string
  phone: string
  generation: number
  status: ApplicationStatus
  companyPosition: string
  interests: string[]
  golf: string
  taxInvoice: string
  submittedAt: string
  reviewer: null
}

// 더미 데이터
const DUMMY_APPLICATIONS: Application[] = [
  {
    id: '1',
    name: '김민수',
    phone: '010-1234-5678',
    generation: 2,
    status: 'APPROVED',
    companyPosition: '(주)테크스타트업 / 마케팅팀장',
    interests: ['경제, 경영, 산업 전반'],
    golf: 'Yes',
    taxInvoice: '발행',
    submittedAt: new Date().toISOString(),
    reviewer: null
  },
  {
    id: '2',
    name: '이지영',
    phone: '010-2345-6789',
    generation: 2,
    status: 'REVIEWING',
    companyPosition: '(주)IT기업 / 프로덕트 매니저',
    interests: ['미래기술 (AI, 챗GPT)', '경제, 경영, 산업 전반'],
    golf: 'No',
    taxInvoice: '미발행',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    reviewer: null
  }
]


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const generation = searchParams.get('generation')
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(searchParams.get('limit') || DEFAULT_PAGE_SIZE.toString())))

    // 필터링 로직
    let filteredApplications = DUMMY_APPLICATIONS

    if (status && status !== 'ALL') {
      filteredApplications = filteredApplications.filter(app => app.status === status)
    }

    if (generation && generation !== 'all') {
      const genNum = parseInt(generation)
      if (!isNaN(genNum)) {
        filteredApplications = filteredApplications.filter(app => app.generation === genNum)
      }
    }

    // 페이지네이션
    const total = filteredApplications.length
    const totalPages = Math.ceil(total / limit)
    const skip = (page - 1) * limit
    const applications = filteredApplications.slice(skip, skip + limit)

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages
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

    // 중복 체크 (전화번호 + 기수)
    const existingApplication = DUMMY_APPLICATIONS.find(
      app => app.phone === validatedData.phone && app.generation === validatedData.generation
    )

    if (existingApplication) {
      return NextResponse.json(
        { error: '이미 해당 기수에 지원하신 전화번호입니다' },
        { status: 400 }
      )
    }

    // 새 지원서 생성
    const newApplication: Application = {
      id: Date.now().toString(),
      name: validatedData.name,
      phone: validatedData.phone,
      generation: validatedData.generation,
      status: 'PENDING',
      companyPosition: validatedData.companyPosition,
      interests: validatedData.interests,
      golf: validatedData.golf,
      taxInvoice: validatedData.taxInvoice,
      submittedAt: new Date().toISOString(),
      reviewer: null
    }

    // 더미 데이터에 추가 (메모리상에서만)
    DUMMY_APPLICATIONS.unshift(newApplication)

    return NextResponse.json({ 
      message: '지원서가 성공적으로 제출되었습니다',
      application: {
        id: newApplication.id,
        name: newApplication.name,
        generation: newApplication.generation,
        status: newApplication.status
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