import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import SubTitle from '@/components/sub-title'
import Card from '@/components/card'
import Link from 'next/link'

const ProductDetail = () => {
  const products = Array.from({ length: 5 }, (_, index) => index + 1)

  return (
    <>
      <Head>
        <title>Product Detail</title>
        <meta name="description" content="Smart Cart - Product Detail" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 pt-[100px] pb-10 md:px-4 mx-auto max-w-[1080px] flex flex-col min-h-[calc(100vh-111px)]">
        <div className="max-w-sm w-full lg:max-w-full lg:flex flex-col">
          <div className="flex items-baseline">
            <div className="h-48 lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-[url('/images/Chocolate.webp')] bg-no-repeat bg-cover bg-center" title="Woman holding a mug">
            </div>
            <div className="flex items-baseline">
              <Link href="/" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</Link>
            </div>
          </div>
          <div className="p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
              <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
            </div>
            <div className="flex items-center">
              <Image className="w-10 h-10 rounded-full mr-4" width={100} height={100} src="/images/Chocolate.webp" alt="Avatar of Jonathan Reinink" />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
          </div>
        </div>
        <SubTitle title="Suggestion" />
        <div className="flex justify-start flex-wrap">
          {
            products.map(product => {
              return (<Card
                key={product}
                size="sm"
                image="/images/Chocolate.webp"
                name="Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport"
                rating="5.0"
                price="$599"
              />)
            })
          }

        </div>
      </main>
    </>
  )
}

export default ProductDetail