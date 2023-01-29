import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Title from '@/components/title'
import useLocalStorage from '@/hooks/useLocalStorage'
import Button from '@/components/form-elements/button'
import { useToast } from '@chakra-ui/react'
import { getSession } from 'next-auth/react'
import { AiOutlineClose } from 'react-icons/ai'

const Cart = () => {
  const [localStoreCart, setLocalStoreCart] = useLocalStorage('cart', [])
  const [localStoreBudget, setLocalStoreBudget] = useLocalStorage('budget', 0)
  const [localStoreTotal, setLocalStoreTotal] = useLocalStorage('total', 0)
  const [budget, setBudget] = useState(0)
  
  const toast = useToast()

  useEffect(() => {
    setBudget(localStoreBudget)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(localStoreBudget < localStoreTotal) {
      toast({
        title: "Budget exceed",
        status: "error",
        duration: 3000,
        position: 'top-left',
        isClosable: true,
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStoreBudget, localStoreCart, localStoreTotal])

  const handleBudget = (e: { target: { value: string } }) => {
    setBudget(parseInt(e.target.value))
    setLocalStoreBudget(e.target.value)
  }

  const handleCheckout = () => {
    setLocalStoreCart([])
    setLocalStoreBudget(0)
    setLocalStoreTotal(0)
    setBudget(0)
  }

  const handleRemoveProduct = (id: any, price: any) => {
    console.log(id)
    const tempCart = localStoreCart
    const cart = tempCart.filter((pro: any) => pro._id !== id)
    setLocalStoreCart(cart)
    setLocalStoreTotal(localStoreTotal-price)
  }

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
            <div className="lg:w-1/2 w-full lg:pr-10 mb-6 lg:mb-0">
              <div className="flex mb-4">
                <a className="flex-grow text-orange-500 border-b-2 border-orange-500 py-2 text-lg px-1">
                  Products
                </a>
              </div>
              {
                localStoreCart.length >= 1 ?
                  (
                    localStoreCart.map((product: any) => <div key={product._id} className="flex border-b border-orange-400 py-2 justify-between">
                      <div className="text-gray-500">{product.name}</div>
                      <div className="text-gray-500">Qty {product.quantity}</div>
                      <div className="text-gray-900">Rs. {product.price}</div>
                      <AiOutlineClose className="text-red-500" onClick={() => handleRemoveProduct(product._id, product.price)} />
                    </div>)
                  )
                  : <></>
              }
              <div className="flex mt-5 justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs. {localStoreTotal}
                </span>
                <div className="max-w-[200px]">
                  <Button label="Checkout" onClick={handleCheckout} />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pr-10 mb-6 lg:mb-0">
              <div className="flex mb-4">
                <a className="flex-grow text-orange-500 border-b-2 border-orange-500 py-2 text-lg px-1">
                  Budget
                </a>
              </div>
              <div className="flex border-b border-orange-400 py-2 justify-between">
                <input
                  type="number"
                  placeholder="Set you budget"
                  value={localStoreBudget}
                  onChange={handleBudget}
                  className="w-full bg-transparent focus:border-none focus:outline-none"
                />
              </div>
              <div className="flex mt-5 justify-end">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs. {budget}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Cart

export async function getServerSideProps(context: { req: any }) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: { session },
  }
}