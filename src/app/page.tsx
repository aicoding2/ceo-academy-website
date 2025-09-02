import Link from 'next/link'

export default function Home() {
  return (
    <div className="py-16">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              차세대 <span className="text-blue-600">CEO</span>를 양성하는
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-4xl">
              최고의 리더십 아카데미
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              전문적인 교육과정과 실무 경험을 통해 미래의 리더가 될 수 있도록 돕습니다.
              CEO 아카데미와 함께 당신의 경영 역량을 키워보세요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/courses"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                과정 둘러보기
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
              >
                회사소개 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">왜 CEO 아카데미인가?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">체계적 교육과정</h3>
              <p className="text-gray-600">
                실무 중심의 체계적인 커리큘럼으로 실전에 바로 적용 가능한 경영 지식을 제공합니다.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">네트워킹</h3>
              <p className="text-gray-600">
                다양한 업계의 경영진들과 함께하는 네트워킹 기회를 통해 비즈니스 관계를 확장하세요.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">성과 중심</h3>
              <p className="text-gray-600">
                이론과 실습을 병행하여 실제 비즈니스 성과로 이어지는 경영 능력을 개발합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">최근 활동</h2>
            <p className="text-gray-600 mb-12">CEO 아카데미 기수들의 생생한 활동 모습을 확인해보세요.</p>
            <Link
              href="/activities"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              활동내역 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
