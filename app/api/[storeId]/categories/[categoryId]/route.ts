import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

export async function GET(req: Request, {params}: {params: {categoryId: string}}){
    try {
        if(!params.categoryId){
            return new NextResponse("Category Id is required", {status:400});
        }
        const category = await prismadb.category.findUnique({
            where:{
                id: params.categoryId
            }
        })
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_GET]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}

export async function DELETE(req: Request, {params}: {params: {categoryId: string, storeId: string}}){
    try {
        const {userId} = await auth()
        if(!userId){
            return new NextResponse("Unauthorized", {status:403});
        }
        if(!params.categoryId){
            return new NextResponse("Category Id is required", {status:400});
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
        const category = await prismadb.category.delete({
            where : {
                id: await params.categoryId
            }
        })
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_DELETE]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}

export async function PATCH(req: Request, {params}: {params: {categoryId: string, storeId: string}}){
    try {
        const {userId} = await auth()

        const body = await req.json()
        const {name, billboardId} = body


        if(!userId){
            return new NextResponse("Unauthorized", {status:403});
        }
        if(!name){
            return new NextResponse("Name is required", {status:400});
        }
        if(!billboardId){
            return new NextResponse("Billboard Id is required", {status:400});
        }
        if(!params.categoryId){
            return new NextResponse("Category Id is required", {status:400});
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

        const category = await prismadb.category.update({
            where:{
                id: params.categoryId
            },
            data:{
                name,
                billboardId
            }
        })
        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_UPDATE]', error)
        return new NextResponse("Interval Error", {status:500})
    }
}