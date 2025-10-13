import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma"; // مسیر رو درست تنظیم کن

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and Product ID are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        userId,
        productId,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
