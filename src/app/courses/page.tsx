const courses = [
  {
    id: 1,
    title: "CEO 리더십 프로그램",
    description: "체계적인 리더십 이론과 실무를 결합한 8주 과정으로, 경영진의 핵심 역량을 개발합니다.",
    duration: "8주",
    price: 2500000,
    image: "/courses/leadership.jpg"
  },
  {
    id: 2,
    title: "전략경영 심화과정",
    description: "기업 전략 수립부터 실행까지, 전략적 사고력을 기르는 12주 집중 과정입니다.",
    duration: "12주", 
    price: 3500000,
    image: "/courses/strategy.jpg"
  },
  {
    id: 3,
    title: "디지털 트랜스포메이션",
    description: "디지털 시대에 맞는 조직 변화와 혁신 전략을 학습하는 6주 과정입니다.",
    duration: "6주",
    price: 2000000,
    image: "/courses/digital.jpg"
  },
  {
    id: 4,
    title: "글로벌 비즈니스",
    description: "해외 진출과 글로벌 시장 확장을 위한 전문 지식을 습득하는 10주 과정입니다.",
    duration: "10주",
    price: 4000000,
    image: "/courses/global.jpg"
  }
]

export default function CoursesPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">과정소개</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CEO 아카데미의 전문적이고 체계적인 교육과정을 통해 
            경영 리더로서의 역량을 키워보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-4xl text-blue-600">📚</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    📅 {course.duration}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ₩{course.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                    자세히 보기
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors">
                    문의하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">맞춤형 교육 과정</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            기업의 특성과 요구사항에 맞춘 맞춤형 교육 과정도 운영하고 있습니다. 
            귀하의 조직에 최적화된 교육 프로그램을 문의해보세요.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
            맞춤형 과정 문의
          </button>
        </div>
      </div>
    </div>
  )
}