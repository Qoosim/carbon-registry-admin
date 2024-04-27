import { NextRequest, NextResponse } from "next/server"

export const middleware = (request: NextRequest) => {
  
 

  return NextResponse.next();
}

export const config = {
  matcher: []
}
