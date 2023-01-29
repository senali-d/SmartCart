import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import mongoose from 'mongoose'
import SubTitle from '@/components/sub-title'
import Card from '@/components/card'
import Product from '@/models/Product'
import { IProduct } from '@/types/interface'
import Input from '@/components/form-elements/input'
import Button from '@/components/form-elements/button'
import { useSession } from 'next-auth/react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/toast'

type Props = {
  product: IProduct
};

const ProductDetail = ({ product }: Props) => {
  const { status } = useSession()
  const router = useRouter()

  const [localStoreCart, setLocalStoreCart] = useLocalStorage('cart', [])
  const [localStoreTotal, setLocalStoreTotal] = useLocalStorage('total', 0)
  
  const [quantity, setQuantity] = useState<number>(1)

  const [nutritionPro, setNutritionPro] = useState<IProduct[]>([])
  const [ingredientsPro, setIngredientsPro] = useState<IProduct[]>([])

  const toast = useToast()

  useEffect(() => {
    fetchNuttritionProducts(product.nutritions)
    fetchIngredientProducts(product.ingredients)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchNuttritionProducts = async(nutritions: any) => {
    let nutri: any[] = []
    nutritions.map((n: { name: any }) => nutri.push(n.name))
    const response = await fetch(`/api/product?nutritions=${nutri}&id=${product._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const status = response.status
    const res = await response.json()
    if(status === 200) {
      setNutritionPro(res.products)
    }
  }

  const fetchIngredientProducts = async(ingredients: string[]) => {
    const response = await fetch(`/api/product?ingredients=${ingredients}&id=${product._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const status = response.status
    const res = await response.json()
    if(status === 200) {
      setIngredientsPro(res.products)
    }
  }

  const handleAddCart = (product: any) => {
    if(status === "authenticated") {
      let tempCart = []
      if(localStoreCart !== null) {
        tempCart = localStoreCart
      }
      product.quantity = quantity
      product.price = product.price*quantity
      tempCart.push(product)
      setLocalStoreCart(tempCart)
      let tempTotal = localStoreTotal
      setLocalStoreTotal(tempTotal+product.price)
      toast({
        title: "Added to cart",
        status: "success",
        duration: 3000,
        position: 'top-left',
        isClosable: true,
      })
    }else {
      router.replace('/auth')
    }
  }

  return (
    <>
      <Head>
        <title>Product Detail</title>
        <meta name="description" content="Smart Cart - Product Detail" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 pt-[100px] pb-10 md:px-4 mx-auto max-w-[1080px] flex flex-col min-h-[calc(100vh-111px)]">
        <div className="max-w-sm w-full lg:max-w-full lg:flex flex-row mb-5">
          <div className="flex items-center w-1/3">
            <div>
              <Image width="200" height="200" src={product?.image} alt="product image" />
            </div>
          </div>
          <div className="p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">{product.name}</div>
              <div className="flex">
                <div className="w-1/2">
                  <p className="text-gray-700 font-bold">
                    Ingredients
                  </p>
                  <ul className="ml-8 text-gray-700">
                    {
                      product?.ingredients?.map(ingredient => <li className="list-disc" key={ingredient}>{ingredient}</li>)
                    }
                  </ul>
                </div>
                <div className="w-1/2">
                  <p className="text-gray-700 font-bold">
                    Nutritions
                  </p>
                  <ul className="ml-8 text-gray-700">
                    {
                      product?.nutritions?.map(nutrition => <li className="list-disc" key={nutrition.name}>
                        <span>{nutrition.name}</span> - <span>{nutrition.amount}</span>
                      </li>)
                    }
                  </ul> 
                </div>
              </div>
            </div>
            <div className="flex items-end space-x-5">
              <div className="text-sm">
                <p className="text-gray-900 leading-none font-bold">{`Rs. ${product.price}`}</p>
                <Input
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  value={quantity.toString()}
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex items-baseline">
                <Button label="Add to cart" onClick={()=>handleAddCart(product)} />
              </div>
            </div>
          </div>
        </div>
        {ingredientsPro.length >= 1 ? <SubTitle title="Suggestion - Ingredients" /> : ''}
        <div className="flex justify-start flex-wrap mb-10">
          {
            ingredientsPro.length >= 1 ? ingredientsPro.map(pro => {
              return (
                <Card
                  key={pro._id}
                  size="sm"
                  image={pro.image}
                  name={pro.name}
                  rating={pro.rating}
                  price={pro.price}
                  id={pro._id}
                  ingredients={pro.ingredients}
                  nutritions={pro.nutritions}
                />)
            }): ''
          }
        </div>
        {nutritionPro.length >= 1 ? <SubTitle title="Suggestion - Nutritions" /> : '' }
        <div className="flex justify-start flex-wrap mb-10">
          {
            nutritionPro.length >= 1 ? nutritionPro.map(pro => {
              return (
                <Card
                  key={pro._id}
                  size="sm"
                  image={pro.image}
                  name={pro.name}
                  rating={pro.rating}
                  price={pro.price}
                  id={pro._id}
                  ingredients={pro.ingredients}
                  nutritions={pro.nutritions}
                />)
            }): ''
          }
        </div>
      </main>
    </>
  )
}

export default ProductDetail

export async function getServerSideProps(context: { req: any, query: { slug: string } }) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI as string)
  }
  const product = await Product.findOne({ _id: context.query.slug })
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  }
}