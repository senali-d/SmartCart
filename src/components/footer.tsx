import { AiFillGithub} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className=" w-full p-2 sm:px-4 bg-orange-700 opacity-75 text-gray-50">
      <div className="mx-auto max-w-[1080px]">
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-md sm:text-center">© {new Date().getFullYear()} <a href="" className="hover:underline">Smart Cart</a>. All Rights Reserved.
          </span>
          <div className="flex space-x-6 sm:justify-center">
            <a href="" target="_blank" className="hover:text-gray-300" rel="noreferrer">
              <AiFillGithub size={25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
