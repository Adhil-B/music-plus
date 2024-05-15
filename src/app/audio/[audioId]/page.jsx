import { redirect } from 'next/navigation'
const page = ({ params }) => {
  redirect(`https://ytpi.onrender.com/audio?videoId=Aurf-zapYng?${params.audioId}`)
}

export default page
