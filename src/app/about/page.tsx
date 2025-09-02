export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">회사소개</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CEO 아카데미는 차세대 리더를 양성하기 위한 전문 교육기관입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">우리의 비전</h2>
            <p className="text-gray-700 mb-4">
              CEO 아카데미는 미래의 경영 환경에 필요한 통찰력과 실행력을 갖춘 리더를 양성하는 것을 목표로 합니다.
              급변하는 비즈니스 환경에서 성공할 수 있는 경영 역량을 개발하고, 지속 가능한 성장을 이끌어낼 수 있는 
              차세대 CEO를 배출하고자 합니다.
            </p>
            <p className="text-gray-700">
              우리는 단순한 이론 교육을 넘어서, 실제 비즈니스 현장에서 바로 적용할 수 있는 실무 중심의 
              교육 프로그램을 제공합니다.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">핵심 가치</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-700"><strong>혁신:</strong> 창의적 사고와 혁신적 접근</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-700"><strong>실용성:</strong> 실무에 바로 적용 가능한 지식</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-700"><strong>협력:</strong> 상호 학습과 네트워킹</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span className="text-gray-700"><strong>성장:</strong> 지속적인 발전과 개선</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">교육 방식</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">📚</span>
              </div>
              <h3 className="font-semibold mb-2">이론 교육</h3>
              <p className="text-gray-600 text-sm">
                체계적인 경영 이론과 최신 트렌드 학습
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">💼</span>
              </div>
              <h3 className="font-semibold mb-2">실무 실습</h3>
              <p className="text-gray-600 text-sm">
                실제 사례를 통한 문제 해결 능력 배양
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">멘토링</h3>
              <p className="text-gray-600 text-sm">
                현직 CEO들과의 1:1 멘토링 세션
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">🌐</span>
              </div>
              <h3 className="font-semibold mb-2">네트워킹</h3>
              <p className="text-gray-600 text-sm">
                동기들과의 지속적인 관계 형성
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">함께 성장하는 CEO 아카데미</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            지금까지 수많은 기업 리더들이 CEO 아카데미를 통해 성장했습니다. 
            당신도 우리와 함께 차세대 CEO로 거듭나보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              과정 살펴보기
            </a>
            <a
              href="/register"
              className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              지금 시작하기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}