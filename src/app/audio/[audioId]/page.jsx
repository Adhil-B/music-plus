import { redirect } from 'next/navigation'
const page = ({ params }) => {

    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${params.audioId.replaceAll("yt-","")}&key=AIzaSyBq-PREFcZjvCMMTqf4WAFbjBgrnLDdS3Q`);
    const data22 = await response.json();
    const data2 = [];
    const x = data22["items"];
    let sresponse;
    let sdata22;
    let sdata99;
    let topsong = [];
  
    if (id2.length < 2 && id.split(',').length < 2) {
    sresponse =  await fetch(`https://saavn.dev/api/search/songs?query=${x[0]["snippet"]["title"]+' '+x[0]["snippet"]["channelTitle"].replace(' - Topic', '')}`);
    sdata22 = await sresponse.json();
    sdata99 = sdata22.data?.results?.slice(0,2)
    x[0]['min'] = x[0]["contentDetails"]["duration"].includes('M') ? parseInt(x[0]["contentDetails"]["duration"].split("PT")[1].split("M")[0])*60 : parseInt('0');
    x[0]['sec'] = x[0]["contentDetails"]["duration"].includes('M') ? parseInt(x[0]["contentDetails"]["duration"].split("M")[1].split("S")[0]) : parseInt(x[0]["contentDetails"]["duration"].split("PT")[1].split("S")[0]);
    x[0]["duration"] = x[0]['min'] + x[0]['sec'];
    topsong = Object.values(sdata99).filter(entry => (Math.abs(parseInt(entry["duration"]) - (x[0]["duration"])) < 8) && (entry["name"].replace("(", "").replace(")", "").includes(x[0]["snippet"]["title"].split(' (')[0])) );    
    }
    if (topsong.length > 0){
    const response9 = await fetch(`https://jiosaavn-api-gilt.vercel.app/songs?id=${topsong[0]['id']}`);
    const data9 = await response9.json();
    redirect(data9.data[0].downloadUrl[4].url)
    }else{
    redirect(`https://ytpi.onrender.com/audio?videoId=${params.audioId.replaceAll("yt-","")}`) 
    }
}

export default page
