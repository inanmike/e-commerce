import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET(req: Request, {params}: {params: {colorId: string}}){
    try {
        if(!params.colorId){
            return new NextResponse("Color id is required", {status:400});
        }
        const color = await prismadb.color.findUnique({
            where:{
                id: params.colorId
            }
        })
        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLOR_GET]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}

export async function DELETE(req: Request, {params}: {params: {colorId: string, storeId: string}}){
    try {
        const {userId} = await auth()
        if(!userId){
            return new NextResponse("Unauthorized", {status:403});
        }
        if(!params.colorId){
            return new NextResponse("Color id is required", {status:400});
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
        const color = await prismadb.color.delete({
            where : {
                id: params.colorId
            }
        })
        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLOR_DELETE]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}

export async function PATCH(req: Request, {params}: {params: {colorId: string, storeId: string}}){
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
        if(!params.colorId){
            return new NextResponse("Color id is required", {status:400});
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

        const color = await prismadb.color.update({
            where:{
                id: params.colorId
            },
            data:{
                name,
                value
            }
        })
        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLOR_UPDATE]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}