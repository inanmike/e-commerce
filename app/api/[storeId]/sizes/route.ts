import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function POST(req:Request, {params}: {params: {storeId:string}}) {

    try {

        const {userId} = await auth();
        const body = await req.json();

        const {name, value} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status:403});
        }
        if(!name){
            return new NextResponse("name is required", {status:400});
        }

        if(!value){
            return new NextResponse("value is required", {status:400});
        }

        if(!params.storeId){
            return new NextResponse("Store id is required", {status:400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status:403});
        }

        const size = await prismadb.size.create({
            data:{
                name,
                value,
                storeId:params.storeId
            }
        });

        return NextResponse.json(size);

    } catch (error) {

        console.log('[size_POST]', error)
        return new NextResponse("Interval Error", {status:500})
        
    }
    
}


export async function GET(req:Request, {params}: {params: {storeId:string}}) {

   try {

    if(!params.storeId){
        return new NextResponse("Store id is required", {status:400});
    }

    const sizes = await prismadb.size.findMany({
        where:{
            storeId:params.storeId
        }
    })

    return NextResponse.json(sizes);

    
   } catch (error) {

    console.log('[size_GET]', error)
    return new NextResponse("Interval Error", {status:500})
    
    
   }
    
}