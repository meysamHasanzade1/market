import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Request Body:", body);

    const { name, email, password } = body;

    if (!email || !password) {
      console.log("❌ Email or password missing");
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // چک کن کاربر وجود داره یا نه
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log("👤 Existing User:", existingUser);

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // هش کردن پسورد
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed Password:", hashedPassword);

    // ایجاد کاربر
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ User Created:", user);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
  console.error(error);
  return NextResponse.json(
    { error: "خطا در ثبت نام" },
    { status: 500 }
  );
}
}
