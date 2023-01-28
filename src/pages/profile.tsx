import React, { useState } from 'react'
import Head from 'next/head'
import Button from '@/components/form-elements/button'
import Input from '@/components/form-elements/input'
import Textarea from '@/components/form-elements/textarea'
import Title from '@/components/title'


const Profile = () => {
  const [data, setData] = useState({});

  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Submission logics
  }
  
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="LogChain - Profile" />
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
                  onChange={handleData}
                />
                <Textarea
                  id="address"
                  name="address"
                  label="Address"
                  placeholder="Address"
                  onChange={handleData}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4 mt-5 md:mt-0">
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  type="number"
                  onChange={handleData}
                />
                <Input
                  id="mobile"
                  name="mobile"
                  label="Mobile"
                  placeholder="Mobile"
                  type="number"
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