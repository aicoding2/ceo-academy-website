import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!application) {
      return NextResponse.json(
        { error: '지원서를 찾을 수 없습니다' },
        { status: 404 }
      )
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

    const existingApplication = await prisma.application.findUnique({
      where: { id }
    })

    if (!existingApplication) {
      return NextResponse.json(
        { error: '지원서를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    const updateData: any = {
      status: validatedData.status,
      reviewedAt: new Date()
    }

    if (validatedData.adminNotes !== undefined) {
      updateData.adminNotes = validatedData.adminNotes
    }

    if (validatedData.reviewedBy) {
      updateData.reviewedBy = validatedData.reviewedBy
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: updateData,
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

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
    const existingApplication = await prisma.application.findUnique({
      where: { id }
    })

    if (!existingApplication) {
      return NextResponse.json(
        { error: '지원서를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    await prisma.application.delete({
      where: { id }
    })

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