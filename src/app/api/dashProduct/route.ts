import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const products = await prisma.product.findMany({
            orderBy:{createdAt:"desc"},
        });
        return NextResponse.json(products);
    }catch(error){
        return NextResponse.json({error:"Failed to fetch products"},{status:500});
    }
}

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {name,description,price,vendorId} = body;

        if(!name || !price || !vendorId){
            return NextResponse.json({error:"informaton not complate"},{status:400});
        }
        const product =await prisma.product.create({
            data:{name,description,price,vendorId}
        });
        return NextResponse.json(product);
    }catch(error){
        console.error("Craete product Error",error);
        return NextResponse.json({error:"مشکل در ساخت محصول "},{status:500});
    }
}