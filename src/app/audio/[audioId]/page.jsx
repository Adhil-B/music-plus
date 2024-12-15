import { Innertube, UniversalCache } from 'youtubei.js';

const page = async({ params }) => {
const yt = await Innertube.create({ cache: new UniversalCache(true) });

async function getVideoInfo() {
  const videoID = 'HPnLom-vBfc';
  const videoInfo = await yt.actions.execute('/player', {
    // You can add any additional payloads here, and they'll merge with the default payload sent to InnerTube.
    videoID,
    client: 'YTMUSIC', // InnerTube client to use.
    parse: true // tells YouTube.js to parse the response (not sent to InnerTube).
  });

  return videoInfo;
}

const videoInfo = await getVideoInfo('jLTOuvBTLxA');
return(console.info(videoInfo))




}

export default page
