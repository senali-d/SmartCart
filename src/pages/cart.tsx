import Button from '@/components/form-elements/button'
import Title from '@/components/title'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

const Cart = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="LogChain - Cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 pt-[100px] pb-10 md:px-4 mx-auto max-w-[1080px] flex flex-col min-h-[calc(100vh-111px)]">
        <Title title="Cart" />
        <div className="px-5">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <div className="flex mb-4">
                    <a className="flex-grow text-orange-500 border-b-2 border-orange-500 py-2 text-lg px-1">Products</a>
                  </div>
                  <div className="flex border-b border-orange-400 py-2 justify-between">
                    <span className="text-gray-500">Color</span>
                    <span className="text-gray-500">Color</span>
                    <span className="text-gray-900">Blue</span>
                  </div>
                  <div className="flex border-b border-orange-400 py-2 justify-between">
                    <span className="text-gray-500">Size</span>
                    <span className="text-gray-500">Size</span>
                    <span className="ml-auto text-gray-900">Medium</span>
                  </div>
                  <div className="flex border-b border-orange-400 py-2 justify-between">
                    <span className="text-gray-500">Size</span>
                    <span className="text-gray-500">Size</span>
                    <span className="ml-auto text-gray-900">Medium</span>
                  </div>
                  <div className="flex mt-5 justify-between">
                    <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                    <div className="max-w-[200px]">
                      <Button label="Checkout" onClick={()=>{}} />
                    </div>
                  </div>
                </div>
                <Image width={100} height={100} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/images/Chocolate.webp" />
              </div>
        </div>
      </main>
    </>
  )
}

export default Cart