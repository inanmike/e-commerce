import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET(req: Request, {params}: {params: {billboardId: string}}){
    try {
        if(!params.storeId){
            return new NextResponse("Store id is required", {status:400});
        }
        const billboard = await prismadb.billboard.findUnique({
            where:{
                id: params.billboardId
            }
        })
        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_GET]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}

export async function DELETE(req: Request, {params}: {params: {billboardId: string, storeId: string}}){
    try {
        const {userId} = await auth()
        if(!userId){
            return new NextResponse("Unauthorized", {status:403});
        }
        if(!params.billboardId){
            return new NextResponse("Billboard id is required", {status:400});
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
        const billboard = await prismadb.billboard.delete({
            where : {
                id: await params.billboardId
            }
        })
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}

export async function PATCH(req: Request, {params}: {params: {billboardId: string, storeId: string}}){
    try {
        const {userId} = await auth()

        const body = await req.json()
        const {label, imageUrl} = body


        if(!userId){
            return new NextResponse("Unauthorized", {status:403});
        }
        if(!label){
            return new NextResponse("Label is required", {status:400});
        }
        if(!imageUrl){
            return new NextResponse("Image Url is required", {status:400});
        }
        if(!params.billboardId){
            return new NextResponse("Billboard id is required", {status:400});
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

        const billboard = await prismadb.billboard.update({
            where:{
                id: params.billboardId
            },
            data:{
                label,
                imageUrl
            }
        })
        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_UPDATE]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}