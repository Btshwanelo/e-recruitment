import React from 'react'

const HeaderV2 = () => {
  return (
    <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded flex items-center justify-center">
              <img src="/logo-2.svg" alt="EZRA Logo" className="w-6 h-6" />
            </div>
            <nav className="ml-8 hidden md:flex space-x-6">
              <a href="/applications" className="text-[#475467] font-semibold hover:text-blue-500">Home</a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">
                EZRA Jobs <span className="ml-1"></span>
              </a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">
                EZRA News <span className="ml-1"></span>
              </a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>
  )
}

export default HeaderV2