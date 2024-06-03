import { NextResponse } from "next/server"
import { cookies } from 'next/headers';

export function middleware(req){

   const cookieStore = cookies()
   const emailCookie = cookieStore.get('email')
    
    if(!emailCookie){
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    //matcher can be an array of all routes requiring a user
    matcher: ['/pages/user-dashboard', '/pages/tasks']
}       