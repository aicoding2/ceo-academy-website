import Link from 'next/link'

const applications = [
  {
    id: 1,
    name: "김민수",
    generation: 2,
    status: "APPROVED",
    phone: "010-1234-5678",
    companyPosition: "(주)테크스타트업 / 마케팅팀장 / 브랜드 마케팅 기획 및 실행",
    interests: ["경제, 경영, 산업 전반", "리더쉽 및 소통 (조직관리)"],
    golf: "Yes",
    taxInvoice: "발행",
    submittedAt: "2024-03-20",
    reviewedAt: "2024-03-22"
  },
  {
    id: 2,
    name: "이지영",
    generation: 2,
    status: "REVIEWING",
    phone: "010-2345-6789",
    companyPosition: "(주)IT기업 / 프로덕트 매니저 / 신규 서비스 기획 및 개발",
    interests: ["미래기술 (AI, 챗GPT)", "경제, 경영, 산업 전반"],
    golf: "No",
    taxInvoice: "미발행",
    submittedAt: "2024-03-18",
    reviewedAt: null
  },
  {
    id: 3,
    name: "박상호",
    generation: 2,
    status: "PENDING",
    phone: "010-3456-7890",
    companyPosition: "(주)제조업 / 영업팀장 / 국내외 영업 및 신규 거래처 개발",
    interests: ["경제, 경영, 산업 전반", "리더쉽 및 소통 (조직관리)"],
    golf: "Yes",
    taxInvoice: "발행",
    submittedAt: "2024-03-17",
    reviewedAt: null
  },
  {
    id: 4,
    name: "최윤아",
    generation: 2,
    status: "WAITLIST",
    phone: "010-4567-8901",
    companyPosition: "(주)컨설팅펌 / 선임 컨설턴트 / 경영전략 컨설팅",
    interests: ["경제, 경영, 산업 전반", "인문학"],
    golf: "No",
    taxInvoice: "발행",
    submittedAt: "2024-03-15",
    reviewedAt: "2024-03-20"
  },
  {
    id: 5,
    name: "정현우",
    generation: 2,
    status: "REJECTED",
    phone: "010-5678-9012",
    companyPosition: "(주)소프트웨어회사 / 개발팀장 / 웹 서비스 개발 및 운영",
    interests: ["미래기술 (AI, 챗GPT)", "경제, 경영, 산업 전반"],
    golf: "No",
    taxInvoice: "미발행",
    submittedAt: "2024-03-14",
    reviewedAt: "2024-03-19"
  }
]

const statusOptions = [
  { value: 'ALL', label: '전체', count: 156 },
  { value: 'PENDING', label: '검토대기', count: 45 },
  { value: 'REVIEWING', label: '검토중', count: 23 },
  { value: 'APPROVED', label: '승인', count: 67 },
  { value: 'REJECTED', label: '거부', count: 15 },
  { value: 'WAITLIST', label: '대기목록', count: 6 }
]

export default function BoardPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">지원서 관리</h1>
          <p className="text-xl text-gray-600">
            CEO 아카데미 지원자들의 지원서를 검토하고 관리하세요.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  status.value === 'ALL' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.label} ({status.count})
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="latest">최신순</option>
                <option value="generation">기수별</option>
                <option value="name">이름순</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option value="all">전체 기수</option>
                <option value="16">16기</option>
                <option value="15">15기</option>
                <option value="14">14기</option>
              </select>
            </div>
            
            <Link
              href="/board/apply"
              className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              지원서 작성
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-700 border-b">
            <div className="col-span-1">번호</div>
            <div className="col-span-2">지원자명</div>
            <div className="col-span-1">기수</div>
            <div className="col-span-4">소속 및 직위</div>
            <div className="col-span-1">상태</div>
            <div className="col-span-2">지원일</div>
            <div className="col-span-1">검토일</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {applications.map((application, index) => (
              <Link
                key={application.id}
                href={`/board/${application.id}`}
                className="block hover:bg-gray-50 transition-colors"
              >
                <div className="md:grid md:grid-cols-12 gap-4 px-6 py-4">
                  <div className="hidden md:block col-span-1 text-sm text-gray-500">
                    {index + 1}
                  </div>
                  
                  <div className="md:col-span-2 mb-2 md:mb-0">
                    <h3 className="font-medium text-gray-900">
                      {application.name}
                    </h3>
                    <p className="text-sm text-gray-500 md:hidden">
                      {application.phone}
                    </p>
                  </div>
                  
                  <div className="md:col-span-1 text-sm text-gray-600">
                    {application.generation}기
                  </div>
                  
                  <div className="md:col-span-4 text-sm text-gray-600">
                    <div className="truncate max-w-full">
                      {application.companyPosition}
                    </div>
                  </div>
                  
                  <div className="md:col-span-1">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      application.status === 'APPROVED' 
                        ? 'bg-green-100 text-green-800'
                        : application.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : application.status === 'REVIEWING'
                        ? 'bg-blue-100 text-blue-800'
                        : application.status === 'WAITLIST'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {application.status === 'APPROVED' ? '승인' : 
                       application.status === 'PENDING' ? '대기' : 
                       application.status === 'REVIEWING' ? '검토중' :
                       application.status === 'WAITLIST' ? '대기목록' : '거부'}
                    </span>
                  </div>
                  
                  <div className="md:col-span-2 text-sm text-gray-500">
                    {new Date(application.submittedAt).toLocaleDateString('ko-KR')}
                  </div>
                  
                  <div className="md:col-span-1 text-sm text-gray-500">
                    {application.reviewedAt ? new Date(application.reviewedAt).toLocaleDateString('ko-KR') : '-'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
              이전
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
              다음
            </button>
          </nav>
        </div>

        {/* 지원서 통계 */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">지원서 현황</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">45</div>
              <div className="text-sm text-gray-600">검토대기</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">검토중</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">67</div>
              <div className="text-sm text-gray-600">승인</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">15</div>
              <div className="text-sm text-gray-600">거부</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">6</div>
              <div className="text-sm text-gray-600">대기목록</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              총 <span className="font-semibold text-gray-900">156명</span>의 지원자가 CEO 아카데미에 관심을 가져주셨습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}