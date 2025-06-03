import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_QUERY, { id: profile?.id })

      // If doesn't exist, we create a new author in Sanity with the GitHub profile data
      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id: profile?.id,
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || '',

        })
      }

      return true; // Continue sign-in
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_QUERY, { id: profile?.id })
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    }
  }
})