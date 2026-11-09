import { Link } from 'react-router-dom'
import { FaHome, FaPlus } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'

const BottomNav = ({ active }) => {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-10 flex h-19 items-center justify-around border-t border-[#f1f1f1] bg-white"
    >
      <Link
        aria-label="Home"
        className={`flex h-full flex-1 items-center justify-center ${active === 'home' ? 'text-black' : 'text-[#a3a3a3]'}`}
        to="/home"
      >
        <FaHome aria-hidden="true" className="h-5 w-5" />
      </Link>
      <Link
        aria-label="Search"
        className={`flex h-full flex-1 items-center justify-center ${active === 'search' ? 'text-black' : 'text-[#a3a3a3]'}`}
        to="/search"
      >
        <FiSearch aria-hidden="true" className="h-5 w-5" />
      </Link>
      <Link
        aria-label="Upload"
        className={`flex h-full flex-1 items-center justify-center ${active === 'upload' ? 'text-black' : 'text-[#a3a3a3]'}`}
        to="/upload"
      >
        <FaPlus aria-hidden="true" className="h-5 w-5" />
      </Link>
    </nav>
  )
}

export default BottomNav