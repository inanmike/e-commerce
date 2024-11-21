import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"


export async function POST(req:Request){
    
    try {
        const {userId} = await auth()
        const body = await req.json();

        const {name} = body;

        if (!userId) {
            return new NextResponse("Unauthorized", {status:403});
        }
        if (!name) {
            return new NextResponse("Name is requiered", {status:400});
        }

        const store = await prismadb.store.create({
            data:{
                name,
                userId,
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log('[POST_ERROR_STORE]', error)
        return new NextResponse("Intervar Error", {status:500})
    }
}