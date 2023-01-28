import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CardProps {
  image: string
  name: string
  rating: string
  price: string
  size: string
}

const Card = ({ image, name, rating, price, size }: CardProps) => {
  const starts = Array.from({length: 5}, (_, index) => index + 1)
  return (
    <div className={`${size === 'sm' ? 'w-1/4' : 'w-1/3'}`}>
      <div className="w-[99%] bg-white border border-gray-200 rounded-lg shadow mt-5">
        <Link href="/">
          <Image width="200" height="200" className={`${size === 'sm' ? 'p-4' : 'p-6'} rounded-t-lg mx-auto`} src={image} alt="product image" />
        </Link>
        <div className="px-5 pb-5">
          <Link href="/product/1">
            <h5 className={`text-xl ${size === 'sm' ? 'font-medium' : 'font-semibold'} tracking-tight text-gray-900`}>{name}</h5>
          </Link>
          <div className="flex items-center mt-2.5 mb-5">
            {
              starts.map(star => <svg key={star} aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)
            }
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`{size === 'sm' ? 'text-xl' : 'text-3xl'} font-bold text-gray-900`}>{price}</span>
            <Link href="/" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card