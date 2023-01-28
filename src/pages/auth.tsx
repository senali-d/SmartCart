import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import AuthForm from '../components/auth'

function AuthPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    auth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const auth = async() => {
    const session = await getSession()
    if (session) {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }
  
  if (loading) {
      return <p>Loading...</p>
  }
  return <AuthForm />
}

export default AuthPage;