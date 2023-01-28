import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Card from '@/components/card'
import Search from '@/components/search'
import { IProduct } from '@/types/interface'

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = search !== '' ? `?name=${search}` : ''
    fetchProducts(params)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const fetchProducts = async(params: string) => {
    const response = await fetch(`/api/product${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const status = response.status
    const res = await response.json()
    if(status === 200) {
      setProducts(res.products)
    }
  }

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Smart Cart - Products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 pt-[100px] pb-10 md:px-4 mx-auto max-w-[1080px] flex flex-col min-h-[calc(100vh-111px)]">
        <Search onChange={(e) => setSearch(e.target.value)} />
        <div className="flex justify-start flex-wrap">
          {
            products ?
              products.map(product => {
              return (
                <Card
                  size=""
                  key={product._id}
                  image="/images/Chocolate.webp"
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                  id={product._id}
                />)
            }): ''
          }
        </div>
      </main>
    </>
  )
}

export default Products