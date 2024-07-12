import { NextResponse } from "next/server"
import { cookies } from 'next/headers';

export function middleware(req){

   const cookieStore = cookies()
   const emailCookie = cookieStore.get('email')
    
    if(!emailCookie){
        console.warn(`No email cookie found for request to ${req.url}`);
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/pages/user-dashboard', '/pages/tasks']
}       