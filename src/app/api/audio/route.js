import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { getAudio } from "@/services/dataAPI";
export async function GET(req){
  redirect(await getAudio(req.nextUrl.searchParams.get("audioId"))); 
}
