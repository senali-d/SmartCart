import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'

const Search = ({ onChange }: { onChange: (e: any) => void }) => {
  return (
    <>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BiSearchAlt size={25} />
        </div>
        <input onChange={onChange} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500" placeholder="Search product...." required />
      </div>
    </>
  )
}

export default Search