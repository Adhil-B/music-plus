import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { getAudio } from "@/services/dataAPI";
export async function GET(request: NextRequest){
  redirect(await getAudio(request.nextUrl.searchParams.get("audioId"))); 
}
