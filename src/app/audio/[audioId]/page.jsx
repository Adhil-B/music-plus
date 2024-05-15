import { redirect } from 'next/navigation'
import { getAudio } from "@/services/dataAPI";
const page = ({ params }) => {

useEffect(() => {
    const fetchDataa = async () => {
    redirect(await getAudio(params.audioId)); 
};
    fetchDataa();   
}, []);

}

export default page
