import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

import { LoginSchema } from "@/schemas";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    }
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          const user = await db.user.findUnique({ where: { email } });
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  // Log de Auditoria
  events: {
    async signIn({ user }) {
      if (user.id) {
        try {
          await db.auditLog.create({
            data: {
              action: "USER_LOGIN",
              userId: user.id,
              details: "Login realizado via Credenciais (Email/Senha)"
            }
          })
          console.log(`✅ Log de auditoria criado para usuário: ${user.email}`)
        } catch (error) {
          console.error("Erro ao criar log de auditoria:", error)
        }
      }
    }
  }
})