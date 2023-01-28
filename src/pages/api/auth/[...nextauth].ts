import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import User from '../../../models/User'

async function verifyPassword (password: any, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword)
  return isValid
}

export default NextAuth({
  // session: {
  //   jwt: true,
  // },
  providers: [
    CredentialProvider({
      async authorize(credentials: any | undefined): Promise<any> {
        const user = await User.findOne({ email: credentials?.email })

        if (!user) {
          throw new Error("No user found!")
        }

        const isValid = await verifyPassword(
          credentials?.password,
          user.password
        )

        if (!isValid) {
          throw new Error("Could not log you in!")
        }

        return { email: user.email }
      },
      credentials: {}
    }),
  ],
});