// middleware.ts
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server'
// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // if (request?.nextUrl?.pathname === '/dashboard') {
  //   return NextResponse.rewrite(new URL('/dashboard/overview', request.url))
  // }
}