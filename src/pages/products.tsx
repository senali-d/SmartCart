import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Card from '@/components/card'
import Search from '@/components/search'
import { IProduct } from '@/types/interface'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

const Products = () => {
  const { status } = useSession()
  const router = useRouter()

  const [localStoreBudget, setLocalStoreBudget] = useLocalStorage('budget', 0)
  const [localStoreCart, setLocalStoreCart] = useLocalStorage('cart', [])
  const [localStoreTotal, setLocalStoreTotal] = useLocalStorage('total', 0)
  const [products, setProducts] = useState<IProduct[]>([])
  const [search, setSearch] = useState('')

  const toast = useToast()

  useEffect(() => {
    const params = search !== '' ? `?name=${search}` : ''
    fetchProducts(params)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if(localStoreBudget < localStoreTotal) {
      toast({
        title: "Budget exceed",
        status: "error",
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStoreBudget, localStoreCart, localStoreTotal])

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

  const handleAddCart = (product: any) => {
    if(status === "authenticated") {
      let tempCart = []
      if(localStoreCart !== null) {
        tempCart = localStoreCart
      }
      product.quantity = 1
      tempCart.push(product)
      setLocalStoreCart(tempCart)
      let tempTotal = localStoreTotal
      setLocalStoreTotal(tempTotal+product.price)
    }else {
      router.replace('/auth')
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
                  image={product.image}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                  id={product._id}
                  onClick={() => handleAddCart(product)}
                />)
            }): ''
          }
        </div>
      </main>
    </>
  )
}

export default Products
