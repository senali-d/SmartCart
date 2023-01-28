import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";

const NavBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { pathname } = useRouter();

  return (
    <>
      <nav className="fixed z-10 w-full bg-orange-100 opacity-80 border-gray-200 px-2 sm:px-4 py-2.5 drop-shadow-lg">
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-1">
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
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "text-orange-600" : "text-gray-700"
                  } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-400 md:p-0`}
                  aria-current="page"
                >
                  <b>Home</b>
                </Link>
              </li>
              <li>
                <AiOutlineShoppingCart className="hover:cursor-pointer" size={25} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
