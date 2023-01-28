import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@chakra-ui/button'
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'

const NavBar = () => {
  const { data: session, status } = useSession()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const { pathname } = useRouter()

  const handleClick = () => {
    signOut()
  }

  return (
    <>
      <nav className="fixed z-10 w-full bg-orange-100 opacity-80 border-gray-200 px-2 sm:px-4 py-2.5 drop-shadow-lg">
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-0">
            <span className="flex flex-row items-center self-center text-xl font-semibold whitespace-nowrap text-orange-600 hover:text-orange-400">
              <Image src="/smart-cart.png" width="50" height="50" alt="Smart Cart" />
              Smart Cart
            </span>
          </Link>
          <div className="flex md:order-2 md:hidden" style={{ marginLeft: "2rem" }}>
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="ml-2 md:ml-0 inline-flex items-center py-2 px-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <span className="sr-only">Open main menu</span>
              <AiOutlineMenu size="20" />
            </button>
          </div>
          <div
            className={`${
              isOpenMenu ? "block" : "hidden"
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              {status === "authenticated" ? (
                <>
                  <li>
                    <Link
                      href="/products"
                      className={`${
                        pathname === "/products" ? "text-orange-600" : "text-gray-700"
                      } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0`}
                      aria-current="page"
                    >
                      <b>Products</b>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className={`${
                        pathname === "/cart" ? "text-orange-600" : "text-gray-700"
                      } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0`}
                      aria-current="page"
                    >
                      <b>Cart</b>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className={`${
                        pathname === "/profile" ? "text-orange-600" : "text-gray-700"
                      } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0`}
                      aria-current="page"
                    >
                      <b>Profile</b>
                    </Link>
                  </li>
                  <li>
                    <Button
                      onClick={handleClick}
                      className={`text-gray-700 hover:cursor-pointer block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0`}
                    >
                      <b>Sign Out</b>
                    </Button>
                  </li>
                </>
              ): (
                <li>
                  <Link href="/auth" className="w-full md:w-[70%] lg:w-full flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-bold rounded-full text-white bg-orange-500 md:py-2 md:px-5"
                    >Sign In</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar
