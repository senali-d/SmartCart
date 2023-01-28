import React, { useState } from 'react'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import mongoose from 'mongoose'
import { useToast } from '@chakra-ui/react'
import Button from '@/components/form-elements/button'
import Input from '@/components/form-elements/input'
import Textarea from '@/components/form-elements/textarea'
import Title from '@/components/title'
import User from '../models/User'
import { IUser } from '../types/interface'

type Props = {
  user: IUser
}

const Profile = ({ user }: Props) => {
  const [data, setData] = useState<IUser>(user);
  
  const toast = useToast()

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async() => {
    const response = await fetch(`/api/user/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const status = response.status
    const res = await response.json()

    if(status === 200) {
      toast({
        title: "Profile",
        description: res.message,
        status: "success",
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
    }
    else {
      toast({
        title: "Error",
        status: "error",
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Smart Cart - Profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 pt-[100px] pb-10 md:px-4 mx-auto max-w-[1080px] flex flex-col min-h-[calc(100vh-111px)]">
        <Title title="Profile" />
        <div className="px-5">
          <form>
            <div className="flex flex-col md:flex-row md:space-x-5">
              <div className="w-full md:w-1/2 space-y-4">
                <Input
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Name"
                  value={data.name}
                  onChange={handleData}
                />
                <Textarea
                  id="address"
                  name="address"
                  label="Address"
                  placeholder="Address"
                  value={data.address}
                  onChange={handleData}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4 mt-5 md:mt-0">
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  value={data.email}
                  onChange={handleData}
                />
                <Input
                  id="mobile"
                  name="mobile"
                  label="Mobile"
                  placeholder="Mobile"
                  value={data.mobile}
                  onChange={handleData}
                />
              </div>
            </div>
            <div className="max-w-[200px] flex m-auto mt-10">
              <Button label="Update" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default Profile

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
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI as string);
  }
  
  if (session) {
    const user = await User.findOne({email: session.user?.email},{password: 0})
    return {
      props: { session, user: JSON.parse(JSON.stringify(user)) },
    }
  }
  return { props: { user: {}} }
}