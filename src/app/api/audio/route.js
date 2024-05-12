'use client'
import { useSearchParams } from 'next/navigation'
export async function GET(req){
  const searchParams = useSearchParams()
 
  const search = searchParams.get('search')
  return search;
}
