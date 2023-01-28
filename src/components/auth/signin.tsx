import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Button from '@/components/form-elements/button'
import Input from '@/components/form-elements/input'
import SubTitle from '@/components/sub-title'
import { signIn } from 'next-auth/react'

interface DataProps {
  email: string
  password: string
}

function SignIn({ click }: { click: () => void}) {
  const [datas, setData] = useState<DataProps>({email: '', password: ''});
  
  const handleData = (e: any) => {
    setData({ ...datas, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async() => {
    const status = await signIn('credentials', {
      redirect: false,
      email: datas.email,
      password: datas.password,
    });
    Router.push({ pathname: '/products' })
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Smart Cart - Sign In" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <div className="pt-[70px]">
          <main className="px-4 md:px-4 mx-auto max-w-[1080px] flex justify-center flex-col min-h-[calc(100vh-111px)]">
            <div className="md:text-left  flex justify-center flex-row">

              <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                  <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <form className="bg-white p-10 rounded-md space-y-5">
                      <SubTitle title="Sign In" />
                      <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={datas.email}
                        onChange={handleData}
                      />
                      <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={datas.password}
                        onChange={handleData}
                      />
                      <div className="flex m-auto">
                        <Button label="Sign In" onClick={handleSubmit} />
                      </div>
                      <div className="pt-1">
                        <span className="text-gray-600">{"Already have an account ? "}</span>
                        <span className="text-orange-600 hover:cursor-pointer" onClick={click}>Sign Up</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    </>
  )
}

export default SignIn