const activities = [
  {
    id: 1,
    generation: 15,
    title: "글로벌 리더십 컨퍼런스",
    date: "2024-03-15",
    description: "해외 저명한 CEO들과의 만남을 통해 글로벌 리더십의 핵심을 배우는 시간이었습니다.",
    images: ["/activities/conference-1.jpg", "/activities/conference-2.jpg"]
  },
  {
    id: 2,
    generation: 15,
    title: "스타트업 벤치마킹",
    date: "2024-02-28",
    description: "성공한 스타트업들을 직접 방문하여 혁신적인 경영 방식을 체험했습니다.",
    images: ["/activities/startup-1.jpg", "/activities/startup-2.jpg", "/activities/startup-3.jpg"]
  },
  {
    id: 3,
    generation: 14,
    title: "팀 빌딩 워크샵",
    date: "2024-01-20",
    description: "효과적인 팀 운영과 소통 방법을 실습을 통해 익히는 워크샵을 진행했습니다.",
    images: ["/activities/workshop-1.jpg", "/activities/workshop-2.jpg"]
  },
  {
    id: 4,
    generation: 14,
    title: "기업 현장 견학",
    date: "2024-01-10",
    description: "대기업 본사를 견학하며 기업 문화와 조직 운영 방식을 직접 관찰했습니다.",
    images: ["/activities/visit-1.jpg"]
  }
]

const generations = [14, 15]

export default function ActivitiesPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">활동내역</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CEO 아카데미 기수들의 다양한 활동과 성과를 확인해보세요.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
              전체
            </button>
            {generations.map((gen) => (
              <button
                key={gen}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                {gen}기
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl text-gray-400 mb-2 block">📸</span>
                  <span className="text-sm text-gray-500">{activity.images.length}장의 사진</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {activity.generation}기
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{activity.description}</p>
                
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors">
            더 많은 활동 보기
          </button>
        </div>
      </div>
    </div>
  )
}