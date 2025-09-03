'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ApplicationForm {
  name: string
  phone: string
  birthDate: string
  gender: string
  companyPosition: string
  address: string
  interests: string[]
  golf: string
  referrer: string
  taxInvoice: string
  generation: number | ''
}

export default function ApplyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    phone: '',
    birthDate: '',
    gender: '',
    companyPosition: '',
    address: '',
    interests: [],
    golf: '',
    referrer: '',
    taxInvoice: '',
    generation: ''
  })

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'generation' && value ? parseInt(value) : value
    }))
    
    // 입력 시 해당 필드 에러 클리어
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const handleInterestChange = useCallback((interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }))
    
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: '' }))
    }
  }, [errors.interests])

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = '성명을 입력해주세요'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '휴대전화를 입력해주세요'
    } else if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '010-1234-5678 형식으로 입력해주세요'
    }

    if (!formData.companyPosition.trim()) {
      newErrors.companyPosition = '소속과 직위를 입력해주세요'
    }

    if (formData.interests.length === 0) {
      newErrors.interests = '관심 분야를 최소 1개 이상 선택해주세요'
    }

    if (!formData.golf) {
      newErrors.golf = '골프 여부를 선택해주세요'
    }

    if (!formData.taxInvoice) {
      newErrors.taxInvoice = '세금계산서 발행 여부를 선택해주세요'
    }

    if (!formData.generation) {
      newErrors.generation = '기수를 선택해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('지원서가 성공적으로 제출되었습니다!')
        router.push('/board')
      } else {
        if (result.details) {
          const fieldErrors: Record<string, string> = {}
          result.details.forEach((detail: { field: string; message: string }) => {
            fieldErrors[detail.field] = detail.message
          })
          setErrors(fieldErrors)
        } else {
          alert(result.error || '지원서 제출에 실패했습니다')
        }
      }
    } catch (error) {
      console.error('지원서 제출 오류:', error)
      alert('지원서 제출 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }, [validateForm, formData, router])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">CMB 레인보우TV 아카데미 가입신청서 (2기)</h1>
            <p className="text-blue-100 mb-2">국내 최초 방송국에서 운영하는 'CEO 아카데미 과정'</p>
            <p className="text-blue-100">소중한 만남에 유익한 교육으로 보답하겠습니다.</p>
            <p className="text-xs text-blue-200 mt-4">* 표시는 필수 질문입니다</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
            
            {/* 1. 성명 */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-900 mb-3">
                1. 성명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="홍길동"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* 2. 휴대전화 */}
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-900 mb-3">
                2. 휴대전화 (010-1234-5678) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="010-1234-5678"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* 3. 생년월일 */}
            <div>
              <label htmlFor="birthDate" className="block text-lg font-medium text-gray-900 mb-3">
                3. 생년월일 (예 : 751225 / 남)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  placeholder="751225"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                >
                  <option value="">성별 선택</option>
                  <option value="남">남</option>
                  <option value="여">여</option>
                </select>
              </div>
            </div>

            {/* 4. 소속 및 직위 */}
            <div>
              <label htmlFor="companyPosition" className="block text-lg font-medium text-gray-900 mb-3">
                4. 소속(직장명)과 직위 / 하시는 업무 간단히 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="companyPosition"
                name="companyPosition"
                value={formData.companyPosition}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  errors.companyPosition ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="(주)ABC기업 / 마케팅팀장 / 브랜드 마케팅 기획 및 실행 업무"
              />
              {errors.companyPosition && <p className="mt-2 text-sm text-red-600">{errors.companyPosition}</p>}
            </div>

            {/* 5. 주소 */}
            <div>
              <label htmlFor="address" className="block text-lg font-medium text-gray-900 mb-3">
                5. 주소 (택배받는 곳 기준)
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="광주광역시 북구 중흥동 123-45"
              />
            </div>

            {/* 6. 관심 분야 */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                6. 관심 분야 (해당사항 모두 체크) <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {useMemo(() => [
                  '경제, 경영, 산업 전반',
                  '인문학',
                  '예술분야',
                  '리더쉽 및 소통 (조직관리)',
                  '의료 및 건강관리',
                  '미래기술 (AI, 챗GPT)',
                  '기타'
                ], []).map((interest) => (
                  <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={(e) => handleInterestChange(interest, e.target.checked)}
                      className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-base text-gray-900">{interest}</span>
                  </label>
                ))}
              </div>
              {errors.interests && <p className="mt-2 text-sm text-red-600">{errors.interests}</p>}
            </div>

            {/* 7. 골프 여부 */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                7. 골프 여부 (스코어 무관) <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="golf"
                    value="Yes"
                    checked={formData.golf === 'Yes'}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-base text-gray-900">Yes</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="golf"
                    value="No"
                    checked={formData.golf === 'No'}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-base text-gray-900">No</span>
                </label>
              </div>
              {errors.golf && <p className="mt-2 text-sm text-red-600">{errors.golf}</p>}
            </div>

            {/* 8. 추천인 */}
            <div>
              <label htmlFor="referrer" className="block text-lg font-medium text-gray-900 mb-3">
                8. 추천인 (복수 기재 가능)
              </label>
              <input
                type="text"
                id="referrer"
                name="referrer"
                value={formData.referrer}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="홍길동, 김철수"
              />
            </div>

            {/* 9. 세금계산서 발행 여부 */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                9. 세금계산서 발행 여부 체크 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="taxInvoice"
                    value="발행"
                    checked={formData.taxInvoice === '발행'}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                    <span className="text-base text-gray-900">세금계산서 발행</span>
                    <p className="text-sm text-gray-600">(사업자등록증 전송하실 팩스 062-443-7922)</p>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="taxInvoice"
                    value="미발행"
                    checked={formData.taxInvoice === '미발행'}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-base text-gray-900">세금계산서 미발행</span>
                </label>
              </div>
              {errors.taxInvoice && <p className="mt-2 text-sm text-red-600">{errors.taxInvoice}</p>}
            </div>

            {/* 기수 선택 */}
            <div>
              <label htmlFor="generation" className="block text-lg font-medium text-gray-900 mb-3">
                지원 기수 <span className="text-red-500">*</span>
              </label>
              <select
                id="generation"
                name="generation"
                value={formData.generation}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  errors.generation ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">기수를 선택하세요</option>
                <option value="2">2기</option>
                <option value="3">3기</option>
                <option value="4">4기</option>
              </select>
              {errors.generation && <p className="mt-2 text-sm text-red-600">{errors.generation}</p>}
            </div>

            {/* 개인정보 동의 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy-consent"
                  required
                  className="h-5 w-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor="privacy-consent" className="text-base text-gray-900 leading-relaxed">
                  상기 내용에 기재한 <strong>개인정보 제공에 동의합니다.</strong><br/>
                  <span className="text-sm text-gray-600">(해당 정보는 외부 유출이 되지 않습니다)</span>
                </label>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/board"
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-lg font-medium text-center hover:bg-gray-200 transition-colors text-lg"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isLoading ? '제출 중...' : '가입신청서 제출'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}