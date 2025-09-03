import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const updateApplicationSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'WAITLIST']),
  adminNotes: z.string().optional(),
  reviewedBy: z.string().optional(),
})


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // 임시 더미 데이터
    const application = {
      id,
      name: '김민수',
      email: 'test@example.com',
      phone: '010-1234-5678',
      generation: 2,
      motivation: 'CEO 아카데미에 참여하고 싶습니다.',
      experience: '10년 경력',
      goals: '리더십 향상',
      previousEducation: '대학교 졸업',
      currentJob: '마케팅팀장',
      company: '(주)테크스타트업',
      status: 'PENDING',
      adminNotes: '',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewer: null
    }

    return NextResponse.json(application)

  } catch (error) {
    console.error('지원서 조회 오류:', error)
    return NextResponse.json(
      { error: '지원서를 불러오는데 실패했습니다' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateApplicationSchema.parse(body)

    // 임시 응답
    const updatedApplication = {
      id,
      name: '김민수',
      email: 'test@example.com',
      phone: '010-1234-5678',
      generation: 2,
      motivation: 'CEO 아카데미에 참여하고 싶습니다.',
      experience: '10년 경력',
      goals: '리더십 향상',
      previousEducation: '대학교 졸업',
      currentJob: '마케팅팀장',
      company: '(주)테크스타트업',
      status: validatedData.status,
      adminNotes: validatedData.adminNotes || '',
      submittedAt: new Date().toISOString(),
      reviewedAt: new Date().toISOString(),
      reviewer: null
    }

    return NextResponse.json({
      message: '지원서 상태가 성공적으로 업데이트되었습니다',
      application: updatedApplication
    })

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

    console.error('지원서 업데이트 오류:', error)
    return NextResponse.json(
      { error: '지원서 업데이트에 실패했습니다' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    return NextResponse.json({
      message: '지원서가 성공적으로 삭제되었습니다'
    })

  } catch (error) {
    console.error('지원서 삭제 오류:', error)
    return NextResponse.json(
      { error: '지원서 삭제에 실패했습니다' },
      { status: 500 }
    )
  }
}