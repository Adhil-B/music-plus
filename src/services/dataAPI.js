
// home page data
export async function homePageData(language) {
  try {
    const response = await fetch(
      `https://jiosaavn-api-gilt.vercel.app/modules?language=${language.toString()}`,
      {
        next: {
          revalidate: 14400,
        },
      }
    );
    const data = await response.json();
    const albums = data.data.albums;
    const playlists = data.data.playlists;
    data.data.albums = Object.values(albums).filter(entry => entry["explicitContent"] === '0');
    data.data.playlists = Object.values(playlists).filter(entry => entry["explicitContent"] === '0');
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}


// recommendations
export async function homePageData2() {
  try {
    const favresponse = await fetch("/api/favourite");
    const fav = await favresponse.json();
    const favsong = fav?.data?.favourites.reverse();
    const sh = favsong.slice(0, 3);
    //
    const [data2,data3,data4] = await Promise.all([getRecommendedSongs("546878", sh[0] ? sh[0] : "1tG_QlMf", "malayalam"),getRecommendedSongs("546878", sh[1] ? sh[1] : "1tG_QlMf", "malayalam"),getRecommendedSongs("546878", sh[2] ? sh[2] : "1tG_QlMf", "malayalam")]);
    //const data2 = await getRecommendedSongs("546878", sh[0] ? sh[0] : "1tG_QlMf", "malayalam");
    //const data3 = await getRecommendedSongs("546878", sh[1] ? sh[1] : "1tG_QlMf", "malayalam");
    //const data4 = await getRecommendedSongs("546878", sh[2] ? sh[2] : "1tG_QlMf", "malayalam");
    const alldata0 = sh[0] ? data2 : [];
    const alldata = alldata0.slice(0,7).concat(sh[1] ? data3?.slice(0,6) : []).concat(sh[2] ? data4?.slice(0,5) : []);

    let alldata1 = alldata
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    const result = [];
    let data33 = [];
    let songs = [];
    for (let x of alldata1) {
      let art = [];
      for (let y of x["primaryArtists"].split(", ")) {
        art.push({"name":y});
      }
      x["primaryArtists"]=art;
      if (!songs.includes(x["id"])){
      songs.push(x["id"]);
      data33.push(x);
      }
    }
    result["recommendations"]=data33;
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

// quick picks
export async function homePageData3(songHistory) {
  try {

    const sh = songHistory ? songHistory.slice(0, 3) : [];
    //
    const [data2,data3,data4] = await Promise.all([getRecommendedSongs("546878", sh[0] ? sh[0]["id"] : "1tG_QlMf", "malayalam"),getRecommendedSongs("546878", sh[1] ? sh[1]["id"] : "1tG_QlMf", "malayalam"),getRecommendedSongs("546878", sh[2] ? sh[2]["id"] : "1tG_QlMf", "malayalam")]);
    //const data2 = await getRecommendedSongs("546878", sh[0] ? sh[0]["id"] : "1tG_QlMf", "malayalam");
    //const data3 = await getRecommendedSongs("546878", sh[1] ? sh[1]["id"] : "1tG_QlMf", "malayalam");
    //const data4 = await getRecommendedSongs("546878", sh[2] ? sh[2]["id"] : "1tG_QlMf", "malayalam");
    const alldata0 = sh[0] ? data2 : [];
    const alldata = alldata0.slice(0,7).concat(sh[1] ? data3?.slice(0,6) : []).concat(sh[2] ? data4?.slice(0,5) : []);

    let alldata1 = alldata
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    const result = [];
    let data33 = [];
    let songs = [];
    for (let x of alldata1) {
      let art = [];
      for (let y of x["primaryArtists"].split(", ")) {
        art.push({"name":y});
      }
      x["primaryArtists"]=art;
      if (!songs.includes(x["id"])){
      songs.push(x["id"]);
      data33.push(x);
      }
    }
    result["recommendations"]=data33;
    //console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}


// get artist songs
export async function getArtistSongs(id, page) {
  try {
    if (Number.isInteger(id)){
    const response = await fetch(
      `https://jiosaavn-api-gilt.vercel.app/artists/${id}/songs?page=${page}`
    );
    const data = await response.json();
    return data?.data;
    }else{
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBq-PREFcZjvCMMTqf4WAFbjBgrnLDdS3Q&channelId=${id}&part=id&order=date&maxResults=100`);
    const data = await response.json();
    const ids = [];
    for (let x of data.items){
      if (x['id']['videoId']){
      ids.push(`yt-${x['id']['videoId']}`)
      }
    }
    const data1 = await getSongData(ids.join(','));
    console.log(data1);
    return data1;

    }
  } catch (error) {
    console.log(error);
  }
}

// get song data
export async function getSongData(id1) {
  try {
    
    const id2 = id1.toString().split(",");
//id1.toString().split(",")
function rearrangeArray(originalArray, orderArray) {
  const map = new Map(originalArray.map(item => [item.id, item]));
  const rearrangedArray = [];
  for (const id of orderArray) {
    if (map.has(id)) {
      rearrangedArray.push(map.get(id));
    }
  }
  return rearrangedArray;
}
    
function transformList(list) {

  const transformedList = [];
  let currentChunk = [];
  let currentChunk2 = [];

  for (const item of list) {
    if (item.startsWith("yt-")) {
      // Start a new chunk if the item begins with "yt-"
      //transformedList.push(currentChunk.join(","));
      //transformedList.push(item);
      currentChunk2.push(item);
      //currentChunk = [];
    } else {
      // Add the item to the current chunk
      //transformedList.push(currentChunk2.join(","));
      currentChunk.push(item);
      //currentChunk2 = [];
    }
  }

  // Add the last chunk to the transformed list
  transformedList.push(currentChunk.join(","));
  transformedList.push(currentChunk2.join(","));

  return Object.values(transformedList).filter(entry => entry !== '');
}
    const id3 = transformList(id2);

    //const id3 = ['_N6U0zWr,rVwJ8kB0,Uoa2n2WR,t8gC-iiK,KsDPoiuL,t5kko…tjGL,2r04CimM,Tmdf_z69,7uR_94uQ,KeU9a5dO,lXXSvQ2s', 'yt-sW5AgVN4lQ4', '', 'yt-n0iPxICKG54', 'xkn8fQaX,mmRcL1PN', 'yt-SuLGu8XdR84', '062bxDzt,noryoYgX,txJzyB7r,cf_CfDKh,pkO7S73_,WjiZY…VwYr,cOWH1iB7,o6JuL_ii,cXW9WbUR,Fq4vDHEi,_fbxzoTf', 'yt-Xx6SKzOUqhQ', 'zujE-loc,GW8xjvCj,RnZdqqsk,f8nIk1xu,St3m70zH,8ZHqAZW6,lWVbxiH_', 'yt-fMTN6wxDWOU', '', 'yt-NJAv_7lHUIU', '', 'yt-Aurf-zapYng', 'v97wbkxB', 'yt-CBqHkqWNaCU', 'aSfSByV9'];
    const result = [];
    console.log(id3)
    for (let id of id3) {
    
    if (id === ""){
      console.log();
    }else if (id.includes("yt-")){
    /////////////////////
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id.toString().replaceAll("yt-","")}&key=AIzaSyBq-PREFcZjvCMMTqf4WAFbjBgrnLDdS3Q`);
    //const response = await fetch(`https://ytpi.vercel.app/song?videoId=${id.toString().replaceAll("yt-","")}`);
    //const response = await fetch(`https://api.allorigins.win/raw?url=https%3A//beatbump.io/api/v1/player.json?videoId=${id.toString().replace("yt-","")}`);
    const data22 = await response.json();
    const data2 = [];
    const x = data22["items"];
    /*let sresponse;
    let sdata22;
    let sdata99;
    let topsong = [];
    //let true1 = false;
    //let true2 = false;
    //let true3 = false;
    if (id2.length < 2 && id.split(',').length < 2) {
    sresponse =  await fetch(`https://saavn.dev/api/search/songs?query=${x[0]["snippet"]["title"]+' '+x[0]["snippet"]["channelTitle"].replace(' - Topic', '')}`);
    sdata22 = await sresponse.json();
    sdata99 = sdata22.data?.results?.slice(0,2)
    x[0]['min'] = x[0]["contentDetails"]["duration"].includes('M') ? parseInt(x[0]["contentDetails"]["duration"].split("PT")[1].split("M")[0])*60 : parseInt('0');
    x[0]['sec'] = x[0]["contentDetails"]["duration"].includes('M') ? parseInt(x[0]["contentDetails"]["duration"].split("M")[1].split("S")[0]) : parseInt(x[0]["contentDetails"]["duration"].split("PT")[1].split("S")[0]);
    x[0]["duration"] = x[0]['min'] + x[0]['sec'];
    topsong = Object.values(sdata99).filter(entry => (Math.abs(parseInt(entry["duration"]) - (x[0]["duration"])) < 8) && (entry["name"].replace("(", "").replace(")", "").includes(x[0]["snippet"]["title"].split(' (')[0])) );

    }*/
    
  /*
    if (topsong.length > 0){
      const response = await fetch(`https://jiosaavn-api-gilt.vercel.app/songs?id=${topsong[0]['id']}`);
      const data = await response.json();
    //data.data["name"] = data?.data["name"].replaceAll('&quot;','"');
      for (let song of data?.data) {
        song["name"] = song["name"].replaceAll('&quot;','"').replaceAll('&#039;',"'");
        result.push(song);
      }
    
    }else{*/
      for (let y of x) {

      y["primaryArtists"] = y["snippet"]['channelTitle'].includes(' - Topic') ? y["snippet"]['tags'].slice(0,1).concat(y["snippet"]['tags'].slice(1,-2)).join(", ") : y["snippet"]['channelTitle'].replace(' - Topic', '');
      for (let tag of y["primaryArtists"].split(", ")){
       if (y["snippet"]["title"].includes(tag) && !(y["snippet"]['channelTitle'].includes(tag))){
            y["primaryArtists"] = y["primaryArtists"].replace(`, ${tag}`, '')
          }
      }
      
        //x["primaryArtists"] = x["channelId"].replace("UCJJhJ-jgdpikgmR632THgBQ","Saregama Malayalam");
      let imgcode = y["snippet"]['channelTitle'].includes(' - Topic') ? 'hq720.jpg' : 'hqdefault.jpg';
      y["image"] = [{
            "quality": "50x50",
            "link": `https://i.ytimg.com/vi/${y["id"]}/mqdefault.jpg`
          },
          {
            "quality": "150x150",
            "link": `https://i.ytimg.com/vi/${y["id"]}/mqdefault.jpg`
          },
          {
            "quality": "500x500",
            "link": `https://i.ytimg.com/vi/${y["id"]}/${imgcode}`
          }];
      y["name"] = y["snippet"]["title"];
      y['min'] = y["contentDetails"]["duration"].includes('M') ? parseInt(y["contentDetails"]["duration"].split("PT")[1].split("M")[0])*60 : parseInt('0');
      y['sec'] = y["contentDetails"]["duration"].includes('M') ? parseInt(y["contentDetails"]["duration"].split("M")[1].split("S")[0]) : parseInt(y["contentDetails"]["duration"].split("PT")[1].split("S")[0]);
      y["duration"] = y['min'] + y['sec'];
      y["playCount"] = parseInt(y["statistics"]["viewCount"]);
      //y["id"] = `yt-${y["id"]}`;
      y["type"] = "song";
      y["primaryArtistsId"] = y["primaryArtists"].replace(', ', ',');
      y["language"] = "YouTube";
      y["album"] = {
        "id": "13615087",
        "name": "Thunderclouds",
        "url": "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_"
      };
      //let linkurl = `https://musicplus.ddns.net/api/audio?audioId=${y["id"].replace("yt-",'')}`;
      //let linkurl = y["duration"] < 252 ? `https://ytpi.vercel.app/audio?videoId=${y["id"].replace("yt-",'')}` : `https://ytpi.onrender.com/audio?videoId=${y["id"].replace("yt-",'')}`;
      let audiodata = await getAudio(`yt-${y["videoId"]}`);
      y['id'] = audiodata[5];
      //x["id"] = `yt-${x["videoId"]}`;
      //let linkurl = `https://musicplus.ddns.net/api/audio?audioId=${x["id"].replace("yt-","")}`;
      y["downloadUrl"] = [
        {
          "quality": "12kbps",
          "link": audiodata[0]
        },
        {
          "quality": "48kbps",
          "link": audiodata[1]
        },
        {
          "quality": "96kbps",
          "link": audiodata[2]
        },
        {
          "quality": "160kbps",
          "link": audiodata[3]
        },
        {
          "quality": "320kbps",
          "link": audiodata[4]
        }
      ];
      result.push(y);
    } 
    //}
      /////////////////////////
    }else{
    const response = await fetch(`https://jiosaavn-api-gilt.vercel.app/songs?id=${id.toString()}`);
    const data = await response.json();
    //data.data["name"] = data?.data["name"].replaceAll('&quot;','"');
      for (let song of data?.data) {
        song["name"] = song["name"].replaceAll('&quot;','"').replaceAll('&#039;',"'");
        result.push(song);
      }
     
    }}
    return rearrangeArray(result,id2);
  } catch (error) {
    console.log(error);
  }
}

export async function getAudio(id) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id.replaceAll("yt-","")}&key=AIzaSyBq-PREFcZjvCMMTqf4WAFbjBgrnLDdS3Q`);
    const data22 = await response.json();
    const data2 = [];
    const x = data22["items"];
    let sresponse;
    let sdata22;
    let sdata99;
    let topsong = [];
  
    sresponse =  await fetch(`https://saavn.dev/api/search/songs?query=${x[0]["snippet"]["title"]+' '+x[0]["snippet"]["channelTitle"].replace(' - Topic', '')}`);
    sdata22 = await sresponse.json();
    sdata99 = sdata22.data?.results?.slice(0,2)
    x[0]['min'] = x[0]["contentDetails"]["duration"].includes('M') ? parseInt(x[0]["contentDetails"]["duration"].split("PT")[1].split("M")[0])*60 : parseInt('0');
    x[0]['sec'] = x[0]["contentDetails"]["duration"].includes('M') ? parseInt(x[0]["contentDetails"]["duration"].split("M")[1].split("S")[0]) : parseInt(x[0]["contentDetails"]["duration"].split("PT")[1].split("S")[0]);
    x[0]["duration"] = x[0]['min'] + x[0]['sec'];
    topsong = Object.values(sdata99).filter(entry => (Math.abs(parseInt(entry["duration"]) - (x[0]["duration"])) < 8) && (entry["name"].replace("(", "").replace(")", "").includes(x[0]["snippet"]["title"].split(' (')[0])) );    
    
    if (topsong.length > 0){
    const response9 = await fetch(`https://jiosaavn-api-gilt.vercel.app/songs?id=${topsong[0]['id']}`);
    const data9 = await response9.json();
    return([data9.data[0].downloadUrl[0].link,data9.data[0].downloadUrl[1].link,data9.data[0].downloadUrl[2].link,data9.data[0].downloadUrl[3].link,data9.data[0].downloadUrl[4].link,topsong[0]['id']])
    }else{
    return([`https://ytpi.onrender.com/audio?videoId=${id.replaceAll("yt-","")}`,`https://ytpi.onrender.com/audio?videoId=${id.replaceAll("yt-","")}`,`https://ytpi.onrender.com/audio?videoId=${id.replaceAll("yt-","")}`,`https://ytpi.onrender.com/audio?videoId=${id.replaceAll("yt-","")}`,`https://ytpi.onrender.com/audio?videoId=${id.replaceAll("yt-","")}`,id]) 
    }
}

// get album data
export async function getAlbumData(id) {
  try {
    const response = await fetch(`https://jiosaavn-api-gilt.vercel.app/albums?id=${id}`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

// get playlist data
export async function getplaylistData(id) {
  try {
    const response = await fetch(`https://jiosaavn-api-gilt.vercel.app/playlists?id=${id}`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

// get Lyrics data
export async function getlyricsData(id) {
  try {
    const response = await fetch(`https://jiosaavn-api-gilt.vercel.app/lyrics?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get artist data
export async function getArtistData(id) {
  try {
    let name;
    if (parseInt(id)){
    const response9 = await fetch(`https://jiosaavn-api-gilt.vercel.app/artists?id=${id}`);
    const data9 = await response9.json();
    name = data9?.data?.name;
    }else{
    name = id;
    }
      const response = await fetch(`https://ytpi.vercel.app/search?query=${name}&filter=artists`);
      const data = await response.json();
      const data1 = {
    "id": data[0]['browseId'],
    "name": data[0]["artist"],
    "url": `https://music.youtube.com/channel/${data[0]['browseId']}`,
    "image": [
      {
        "quality": "50x50",
        "link": data[0]['thumbnails'][1]['url'].replace('w120-h120','w50-h50')
      },
      {
        "quality": "150x150",
        "link": data[0]['thumbnails'][1]['url'].replace('w120-h120','w150-h150')
      },
      {
        "quality": "500x500",
        "link": data[0]['thumbnails'][1]['url'].replace('w120-h120','w500-h500')
      }
    ],
    "followerCount": "71752",
    "fanCount": "963569",
    "isVerified": false,
    "dominantLanguage": "English",
    "dominantType": "artist",
    "bio": [],
    "dob": "",
    "fb": "",
    "twitter": "",
    "wiki": "https://en.wikipedia.org/wiki/Sia_Furler",
    "availableLanguages": [
      "english",
      "hindi",
      "tamil",
      "malayalam"
    ],
    "isRadioPresent": true
  };
      return data1;
    
  } catch (error) {
    console.log(error);
  }
}



// get artist albums
export async function getArtistAlbums(id, page) {
  try {
    const response = await fetch(
      `https://jiosaavn-api-gilt.vercel.app/artists/${id}/albums?page=${page}`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

//get search artist
export async function getSearchedArtist(query) {
  try {
    const response = await fetch(`https://saavn.dev/api/search/artists?query=${query}`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

// get search data
export async function getSearchedData(query) {
  try {
    const response = await fetch(`https://saavn.dev/api/search?query=${query}`);
    const data = await response.json();
    //const data = {data:{songs    }};
    
    const response1 = await fetch(`https://ytpi.vercel.app/search?query=${query}`);
    const data1 = await response1.json();
    const data2 = [];
    let lastname = ':';
    const true1 = true;
    //const true1 = query.includes("youtube") || data.data["songs"]["results"].length < 3;
    if (true1){
    for (let x of data1) {
      if (lastname.split(":")[0].includes("Top result") && lastname.split(':')[1].includes(x["title"].split(' (')[0]) ){ data2.pop();}
      if ("Top result Songs".includes(x['category']) && x['videoId'] != null) { lastname = x['category'] + ':' + JSON.stringify(x["title"]) }else{ continue; }
      
      let art = [];
      for (let arti of x["artists"]) {
        if (!'VideoSong'.includes(arti["name"])) {
        art.push(arti["name"])
        }
      }
      x["primaryArtists"] = art.reverse().join(", ").replace(' &',',');
      x["duration"] = x["lengthSeconds"];
      x["image"] = [{
            "quality": "50x50",
            "link": `${x["thumbnails"][0]['url'].replace('sddefault', 'hqdefault')}`
          },
          {
            "quality": "150x150",
            "link": `${x["thumbnails"][0]['url'].replace('w120-h120','w150-h150').replace('sddefault', 'hqdefault')}`
          },
          {
            "quality": "500x500",
            "link": `${x["thumbnails"][0]['url'].replace('w120-h120','w500-h500').replace('sddefault', 'hqdefault')}`
          }];
      x["name"] = JSON.stringify(x["title"]);
      x["title"] = x["title"];
      x["album"] = {
        "id": "13615087",
        "name": "Thunderclouds",
        "url": "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_"
      };
      x["id"] = `yt-${x["videoId"]}`;
      x["type"] = "song";
      x["primaryArtistsId"] = art.join().replace(' & ',',');
        data2.push(x);
      
    }
  }
    data.data["songs"]["results"] = [...data2.slice(0,4)];
    data.data["albums"]["results"] = data.data["albums"]["results"];
    //data.data["songs"]["results"] = true1 ? [...data2.slice(0,4)] : [...data2.slice(0,4),...data?.data["songs"]["results"]];
    //data.data["albums"]["results"] = true1 ? [] : data.data["albums"]["results"];
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

// add and remove from favourite
export async function addFavourite(id) {
  try {
    /*let songid = id;
    
    if (songid.startsWith("yt-")){
    const response = await fetch(`https://ytpi.vercel.app/song?videoId=${id.toString().replace("yt-","")}`);
    const data22 = await response.json();
    const data2 = [];
    
    const x = data22["videoDetails"];
    let topsong = [];
    const sresponse =  await fetch(`https://saavn.dev/api/search/songs?query=${x["title"]+' '+x["author"].replace(' &', ',')}`);
    const sdata22 = await sresponse.json();
    const sdata99 = sdata22.data?.results?.slice(0,2)
    topsong = Object.values(sdata99).filter(entry => (Math.abs(parseInt(entry["duration"]) - parseInt(x["lengthSeconds"])) < 8) && (entry["name"].includes(x["title"].split(' (')[0])));
    if (topsong.length > 0){
      songid = topsong[0]['id'];
    }
    }*/
      
    const response = await fetch("/api/favourite", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;

    
  } catch (error) {
    console.log("Add favourite API error", error);
  }
}

// get favourite
export async function getFavourite() {
  try {
    const response = await fetch("/api/favourite");
    const data = await response.json();
    return data?.data?.favourites;
  } catch (error) {
    console.log("Get favourite API error", error);
  }
}

// set language
export async function addLang(lang) {
  try {
    const response = await fetch("/api/lang", {
      method: "POST",
      body: JSON.stringify(lang),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Add language API error", error);
  }
}

// get language
export async function getLang() {
  try {
    const response = await fetch("/api/lang");
    const data = await response.json();
    return data?.data?.language;
  } catch (error) {
    console.log("Get language API error", error);
  }
}

// user info
export async function getUserInfo() {
  try {
    const response = await fetch("/api/userInfo");
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log("Get user info API error", error);
  }
}

// reset password
export async function resetPassword(password, confirmPassword, token) {
  try {
    const response = await fetch("/api/forgotPassword", {
      method: "PUT",
      body: JSON.stringify({ password, confirmPassword, token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Reset password API error", error);
  }
}

// send reset password link
export async function sendResetPasswordLink(email) {
  try {
    const response = await fetch("/api/forgotPassword", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Send reset password link API error", error);
  }
}

// get  recommended songs
export async function getRecommendedSongs(artistId, sondId, language) {
  try {
    if (sondId.includes("yt-")){
      //let songName;
      //if (language == 'name'){
      //songName = artistId;  
      //}else{
      //const response = await fetch(`https://ytpi.vercel.app/song?videoId=${sondId.replace("yt-","")}`);
      //const data = await response.json();
      //songName = sondId.includes("Saregama") ? sondId.replace("yt-","") : data['videoDetails']["title"];
      //}

      //const response1 = await fetch(`https://ytpi.vercel.app/search?query=${songName}&filter=songs`);
      const response1 = await fetch(`https://ytpi.vercel.app/browseid?songId=${sondId.replace("yt-","")}`);
      const data1 = await response1.json();
      const data2 = [];
    //if (data1[0]["author"].includes("Saregama")){
    for (let x of data1.tracks) {
      //let art = x["artists"].map(function(d) { return d['name']; });
      let art = [];
      for (let arti of x["artists"]) {
        art.push(arti["name"])
      }
      x["primaryArtists"] = art.reverse().join(", ").replace(' & ', ', ').replace('and ','').replace(', ,',',');
      x["duration"] = (parseInt(x["length"].split(':')[0])*60) + parseInt(x["length"].split(':')[1]);
      //x["duration"] = x["duration_seconds"];
      x["image"] = [{
            "quality": "50x50",
            "link": `https://i.ytimg.com/vi/${x["videoId"]}/mqdefault.jpg`
          },
          {
            "quality": "150x150",
            "link": `https://i.ytimg.com/vi/${x["videoId"]}/mqdefault.jpg`
          },
          {
            "quality": "500x500",
            "link": `https://i.ytimg.com/vi/${x["videoId"]}/mqdefault.jpg`
          }];
      x["album"] = {
        "id": "13615087",
        "name": "Thunderclouds",
        "url": "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_"
      };
      x["name"] = x["title"].split(" -")[0].split(" |")[0].replace('Video Song', '');
      let audiodata = await getAudio(`yt-${x["videoId"]}`);
      x['id'] = audiodata[5];
      //x["id"] = `yt-${x["videoId"]}`;
      x["type"] = "song";
      //let linkurl = `https://musicplus.ddns.net/api/audio?audioId=${x["id"].replace("yt-","")}`;
      x["downloadUrl"] = [
        {
          "quality": "12kbps",
          "link": audiodata[0]
        },
        {
          "quality": "48kbps",
          "link": audiodata[1]
        },
        {
          "quality": "96kbps",
          "link": audiodata[2]
        },
        {
          "quality": "160kbps",
          "link": audiodata[3]
        },
        {
          "quality": "320kbps",
          "link": audiodata[4]
        }
      ];
      x["primaryArtistsId"] = art.reverse().join(",").replace(' & ', ',').replace('and ','').replace(', ,',',');
      if (!x["id"].includes(sondId)){
      data2.push(x);
      }
      
    }
    //}
      return data2.slice(1).slice(0, 8);
    }else{
    const response = await fetch(
      `https://jio-api-eta.vercel.app/song/recommend?id=${sondId}`
    );
    const data = await response.json();
    const data1 = [];
    for (let x of data?.data) {
      x["primaryArtists"] = x?.artist_map?.primary_artists?.map((artist) => artist?.name).join(', ')
      x["primaryArtistsId"] = x?.artist_map?.primary_artists?.map((artist) => artist?.id).join(', ')
      x["downloadUrl"] = x["download_url"];
      data1.push(x);
    }
    
    return data1;
    }
  } catch (error) {
    console.log(error);
  }
}
