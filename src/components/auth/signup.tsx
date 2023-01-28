import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useToast } from '@chakra-ui/react'
import Button from '@/components/form-elements/button'
import Input from '@/components/form-elements/input'
import SubTitle from '@/components/sub-title'

function SignUp({ click }: { click: () => void}) {
  const [signupData, setSignupData] = useState({email: '', password: '', confirmPassword: ''});
  
  const toast = useToast()
  
  const handleData = (e: any) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async () => {
    const { email, password } = signupData
    //Validation
    if (!email || !email.includes('@') || !password) {
      alert('Invalid details');
      return;
    }
    //POST form values
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    //Await for data for any desirable next steps
    const data = await res.json()
    Router.push({ pathname: '/auth' })
    click()
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Smart Cart - Sign Up" />
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
                      <SubTitle title="Sign Up" />
                      <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={signupData.email}
                        onChange={handleData}
                      />
                      <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={signupData.password}
                          onChange={handleData}
                      />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={signupData.confirmPassword}
                        onChange={handleData}
                      />
                      <div className="flex m-auto">
                        <Button label="Sign Up" onClick={handleSubmit} />
                      </div>
                      <div className="pt-1">
                        <span className="text-gray-600">{"Don't have an account ? "}</span>
                        <span className="text-orange-600 hover:cursor-pointer" onClick={click}>Sign In</span>
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

export default SignUp