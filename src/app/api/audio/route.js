import { useRouter } from "next/router";

export async function GET(req){
  const router = useRouter();
  const { query } = router;

  const parameter1 = query.videoId;
  return parameter1;
  
}
