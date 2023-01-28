import { useState } from 'react'
import SignIn from './signin'
import SignUp from './signup'

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  const handleSwitchMode = () => {
    setIsLogin((prevState) => !prevState)
  }
  
  if(isLogin) {
    return <SignIn click={handleSwitchMode}/>
  }else {
    return <SignUp click={handleSwitchMode} />
  }
}

export default AuthForm