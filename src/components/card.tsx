import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Button from './form-elements/button'

interface CardProps {
  id: string
  image: string
  name: string
  rating: number
  price: number
  size: string
  category?: string
  ingredients?: string[]
  nutritions?: Nutrition[]
  onClick?: any
}

interface Nutrition {
  name: string
  amount: string
}

const Card = ({ id, image, name, rating, price, size, category, ingredients, nutritions, onClick }: CardProps) => {
  const stars = Array.from({length: Math.round(rating)}, (_, index) => index + 1)
  const emptyStars = Array.from({length: 5-Math.round(rating)}, (_, index) => index + 1)
  return (
    <div className={`${size === "sm" ? "w-1/4" : "w-1/3"} mb-3`}>
      <div className="w-[99%] bg-white border border-gray-200 rounded-lg shadow mt-5 h-full">
        <Link href={`/product/${id}`}>
          <Image
            width="200"
            height="200"
            className={`${size === "sm" ? "p-4" : "p-6"} rounded-t-lg mx-auto`}
            src={image}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link href={`/product/${id}`}>
            <h5
              className={`text-xl ${
                size === "sm" ? "font-medium" : "font-semibold"
              } tracking-tight text-gray-900`}
            >
              {name}
            </h5>
          </Link>
          {size === "sm" ? (
            <div className="mb-8">
              <div className="flex px-2 flex-col">
                <div className="w-full">
                  <p className="text-gray-700 font-bold">Ingredients</p>
                  <ul className="ml-8 text-gray-700">
                    {ingredients?.map((ingredient) => (
                      <li className="list-disc" key={ingredient}>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <p className="text-gray-700 font-bold">Nutritions</p>
                  <ul className="ml-8 text-gray-700">
                    {nutritions?.map((nutrition) => (
                      <li className="list-disc" key={nutrition.name}>
                        <span>{nutrition.name}</span> -{" "}
                        <span>{nutrition.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
            <div className="flex items-center mt-2.5 mb-5">
              {stars.map((star) => (
                <AiFillStar className="text-yellow-500" size={20} key={star} />
              ))}
              {emptyStars.map((star) => (
                <AiOutlineStar
                  className="text-yellow-500"
                  size={20}
                  key={star}
                />
              ))}
              <span className="bg-orange-100 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                {rating}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`{size === 'sm' ? 'text-xl' : 'text-3xl'} font-bold text-gray-900`}
              >{`Rs. ${price}`}</span>
              {size !== "sm" ? <div className="max-w-[200px] flex">
                <Button label="Add to cart" onClick={onClick} />
              </div> : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card