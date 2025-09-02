'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

interface Application {
  id: string
  name: string
  email: string
  phone: string
  generation: number
  motivation: string
  experience?: string
  goals: string
  previousEducation?: string
  currentJob?: string
  company?: string
  status: 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED' | 'WAITLIST'
  adminNotes?: string
  submittedAt: string
  reviewedAt?: string
  reviewer?: {
    id: string
    name: string
    email: string
  }
}

const statusLabels = {
  PENDING: '검토대기',
  REVIEWING: '검토중',
  APPROVED: '승인',
  REJECTED: '거부',
  WAITLIST: '대기목록'
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  REVIEWING: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  WAITLIST: 'bg-orange-100 text-orange-800'
}

export default function ApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState<string>('')
  const [adminNotes, setAdminNotes] = useState('')
  const [showStatusForm, setShowStatusForm] = useState(false)

  useEffect(() => {
    fetchApplication()
  }, [params.id])

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setApplication(data)
        setNewStatus(data.status)
        setAdminNotes(data.adminNotes || '')
      } else {
        const errorData = await response.json()
        setError(errorData.error || '지원서를 불러오는데 실패했습니다')
      }
    } catch (error) {
      console.error('지원서 조회 오류:', error)
      setError('지원서를 불러오는데 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!application) return
    
    setIsUpdating(true)
    
    try {
      const response = await fetch(`/api/applications/${application.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: adminNotes,
          reviewedBy: 'admin-user-id' // TODO: 실제 사용자 ID로 변경
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setApplication(result.application)
        setShowStatusForm(false)
        alert('상태가 성공적으로 업데이트되었습니다')
      } else {
        const errorData = await response.json()
        alert(errorData.error || '업데이트에 실패했습니다')
      }
    } catch (error) {
      console.error('상태 업데이트 오류:', error)
      alert('업데이트 중 오류가 발생했습니다')
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">지원서를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/board"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  if (!application) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* 헤더 */}
          <div className="bg-blue-600 px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">지원서 상세보기</h1>
                <p className="text-blue-100">
                  {application.name}님의 {application.generation}기 지원서
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${statusColors[application.status]}`}>
                  {statusLabels[application.status]}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            {/* 기본 정보 */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">기본 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">이름</label>
                  <p className="mt-1 text-sm text-gray-900">{application.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">이메일</label>
                  <p className="mt-1 text-sm text-gray-900">{application.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">전화번호</label>
                  <p className="mt-1 text-sm text-gray-900">{application.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">지원 기수</label>
                  <p className="mt-1 text-sm text-gray-900">{application.generation}기</p>
                </div>
              </div>
            </div>

            {/* 경력 정보 */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">경력 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">현재 직무</label>
                  <p className="mt-1 text-sm text-gray-900">{application.currentJob || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">현재 회사</label>
                  <p className="mt-1 text-sm text-gray-900">{application.company || '-'}</p>
                </div>
              </div>
              
              {application.experience && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">경력 사항</label>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{application.experience}</p>
                  </div>
                </div>
              )}

              {application.previousEducation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">학력 사항</label>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{application.previousEducation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 지원 동기 및 목표 */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">지원 동기 및 목표</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">지원 동기</label>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{application.motivation}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">향후 목표</label>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{application.goals}</p>
                </div>
              </div>
            </div>

            {/* 제출 정보 */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">제출 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">제출일</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(application.submittedAt).toLocaleString('ko-KR')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">검토일</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {application.reviewedAt 
                      ? new Date(application.reviewedAt).toLocaleString('ko-KR')
                      : '-'
                    }
                  </p>
                </div>
              </div>
              
              {application.reviewer && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">검토자</label>
                  <p className="mt-1 text-sm text-gray-900">{application.reviewer.name}</p>
                </div>
              )}
            </div>

            {/* 관리자 노트 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">관리자 노트</h2>
              <div className="bg-gray-50 rounded-md p-4 min-h-24">
                {application.adminNotes ? (
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{application.adminNotes}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">관리자 노트가 없습니다</p>
                )}
              </div>
            </div>

            {/* 상태 변경 폼 */}
            {showStatusForm ? (
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">상태 변경</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">새 상태</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">관리자 노트</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="검토 결과나 추가 사항을 입력하세요"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isUpdating}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isUpdating ? '업데이트 중...' : '상태 업데이트'}
                  </button>
                  <button
                    onClick={() => setShowStatusForm(false)}
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => setShowStatusForm(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700"
                >
                  상태 변경
                </button>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/board"
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium text-center hover:bg-gray-200 transition-colors"
              >
                목록으로 돌아가기
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                지원서 출력
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}