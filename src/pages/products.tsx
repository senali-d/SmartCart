import Card from '@/components/card'
import Search from '@/components/search'
import Head from 'next/head'
import React from 'react'

const Products = () => {
  const products = Array.from({length: 5}, (_, index) => index + 1)

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Smart Cart - Products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 pt-[100px] pb-10 md:px-4 mx-auto max-w-[1080px] flex flex-col min-h-[calc(100vh-111px)]">
        <Search />
        <div className="flex justify-start flex-wrap">
          {
            products.map(product => {
              return (<Card
                size=""
                key={product}
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

export default Products