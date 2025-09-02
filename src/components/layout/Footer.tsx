import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">CEO 아카데미</h3>
            <p className="text-gray-300 mb-4">
              차세대 리더를 양성하는 최고의 교육 프로그램
            </p>
            <p className="text-gray-400 text-sm">
              © 2024 CEO Academy. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">바로가기</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-blue-400 transition-colors">
                회사소개
              </Link>
              <Link href="/courses" className="block text-gray-300 hover:text-blue-400 transition-colors">
                과정소개
              </Link>
              <Link href="/activities" className="block text-gray-300 hover:text-blue-400 transition-colors">
                활동내역
              </Link>
              <Link href="/board" className="block text-gray-300 hover:text-blue-400 transition-colors">
                게시판
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>서울특별시 강남구</p>
              <p>전화: 02-1234-5678</p>
              <p>이메일: info@ceoacademy.co.kr</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}