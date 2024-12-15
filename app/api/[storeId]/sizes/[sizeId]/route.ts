import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET(req: Request, {params}: {params: {sizeId: string, storeId: string}}){
    try {
        if(!params.sizeId){
            return new NextResponse("Store id is required", {status:400});
        }
        const size = await prismadb.size.findUnique({
            where:{
                id: params.sizeId
            }
        })
        return NextResponse.json(size);
    } catch (error) {
        console.log('[size_GET]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}

export async function DELETE(req: Request, {params}: {params: {sizeId: string, storeId: string}}){
    try {
        const {userId} = await auth()
        if(!userId){
            return new NextResponse("Unauthorized", {status:403});
        }
        if(!params.sizeId){
            return new NextResponse("size id is required", {status:400});
        }
        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status:403});
        }
        const size = await prismadb.size.delete({
            where : {
                id: await params.sizeId
            }
        })
        return NextResponse.json(size);
    } catch (error) {
        console.log('[size_DELETE]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}

export async function PATCH(req: Request, {params}: {params: {sizeId: string, storeId: string}}){
    try {
        const {userId} = await auth()

        const body = await req.json()
        const {name, value} = body


        if(!userId){
            return new NextResponse("Unauthorized", {status:403});
        }
        if(!name){
            return new NextResponse("name is required", {status:400});
        }
        if(!value){
            return new NextResponse("Image Url is required", {status:400});
        }
        if(!params.sizeId){
            return new NextResponse("size id is required", {status:400});
        }
        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status:403});
        }

        const size = await prismadb.size.update({
            where:{
                id: params.sizeId
            },
            data:{
                name,
                value
            }
        })
        return NextResponse.json(size);
    } catch (error) {
        console.log('[size_UPDATE]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}