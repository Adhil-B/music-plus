import { useSearchParams } from "next/navigation";

export async function GET(req){
  const searchParams = useSearchParams();
  let property1 = searchParams.get("id");
  return property1;
  
}
