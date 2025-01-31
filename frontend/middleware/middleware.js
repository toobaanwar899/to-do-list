import { Helper } from "@/Helper/Helper";
import { NextResponse } from "next/server";

const helper = new Helper()

export function middleware(request){
    const token = helper.getToken()
    if(token){
        return NextResponse.redirect(new URL('/dashboard/db-dashboard', request.url))
    }
    return NextResponse.redirect(new URL('/', request.url))
}