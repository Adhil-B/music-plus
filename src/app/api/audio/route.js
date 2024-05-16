import { NextRequest } from "next/server";
import { redirect } from 'next/navigation'
import { getAudio } from "@/services/dataAPI";
export async function GET(req){
  const { searchParams } = new URL(req.url);
  redirect(await getAudio(searchParams.get("audioId"))); 
}
