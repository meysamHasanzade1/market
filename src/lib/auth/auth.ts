import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("ایمیل و پسورد الزامی است");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("کاربر یافت نشد");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("رمز عبور اشتباه است");
        }

        // 🚨 فقط اگر نقش ادمین داشت اجازه ورود بدیم
        if (user.role !== "ADMIN") {
          throw new Error("فقط ادمین اجازه ورود دارد");
        }

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (!session.user || !token.email) return session;

      const dbUser = await prisma.user.findUnique({
        where: { email: token.email as string },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
      }

      return session;
    },
    async redirect({ baseUrl }) {
  return `${baseUrl}/dashboard`;
}
  },
  pages: {
    signIn: "/auth/admin-login", // صفحه ورود ادمین
  },
};
