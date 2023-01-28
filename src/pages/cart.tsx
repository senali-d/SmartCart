import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Title from '@/components/title'
import useLocalStorage from '@/hooks/useLocalStorage'

const CartRow = (pro: any) => {
  return (
    <div key={pro._id} className="flex border-b border-orange-400 py-2 justify-between">
      <p className="text-gray-500">{pro.name}</p>
      <p className="text-gray-500">Qty {pro.quantity}</p>
      <p className="text-gray-900">$ {pro.price}</p>
    </div>
  )
}

const Cart = () => {
  const [localStoreCart, setLocalStoreCart] = useLocalStorage('cart', [])
  const [localStoreBudget, setLocalStoreBudget] = useLocalStorage('budget', 0)
  const [budget, setBudget] = useState(0)
  
  useEffect(() => {
    setBudget(localStoreBudget)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBudget = (e: { target: { value: string } }) => {
    setBudget(parseInt(e.target.value))
    setLocalStoreBudget(e.target.value)
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
              <>
              {
                localStoreCart ?
                localStoreCart.map((product: any) => {
                  return (
                    <CartRow
                      key={product._id}
                      name={product.name}
                      quantity={product.quantity}
                      price={product.price}
                    />)
                }): <></>
              }
              </>
            </div>
            <div className="lg:w-1/2 w-full lg:pr-10 mb-6 lg:mb-0">
              <div className="flex mb-4">
                <a className="flex-grow text-orange-500 border-b-2 border-orange-500 py-2 text-lg px-1">
                  Budget
                </a>
              </div>
              <div className="flex border-b border-orange-400 py-2 justify-between">
                <input type="number" placeholder="Set you budget" value={localStoreBudget} onChange={handleBudget} className="w-full bg-transparent focus:border-none focus:outline-none" />
              </div>
              <div className="flex mt-5 justify-end">
                <span className="title-font font-medium text-2xl text-gray-900">
                  $ {budget}
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