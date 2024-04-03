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
    data?.data.albums = data?.data.albums.filter(a => a.explicitContent == "0");
    data?.data.playlists = data?.data.playlists.filter(a => a.explicitContent == "0");
    data?.data.charts = data?.data.charts.filter(a => a.explicitContent == "0");
    data?.data.trending = data?.data.trending.filter(a => a.explicitContent == "0");
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

   /* const response = await fetch("/api/recommend", {
      method: "POST",
      body: JSON.stringify({ "data": favsongs }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data99 = await response.json();
    const sh = favsong ? data99?.data : [];
    
    const [response2,response3,response4] = await Promise.all([
    fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": ["546878", sh[0] ? sh[0] : "1tG_QlMf", "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    }),
    fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": ["546878", sh[1] ? sh[1] : "1tG_QlMf", "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    }),
   fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": ["546878", sh[2] ? sh[2] : "1tG_QlMf", "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    ]);

    */
    //
    //
    const data2 = await getRecommendedSongs("546878", sh[0] ? sh[0] : "1tG_QlMf", "malayalam");
    //const data2 = await response2.json();
    const data3 = await getRecommendedSongs("546878", sh[1] ? sh[1] : "1tG_QlMf", "malayalam");
    const data4 = await getRecommendedSongs("546878", sh[2] ? sh[2] : "1tG_QlMf", "malayalam");
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
    /*
    const [response2,response3,response4] = await Promise.all([
    fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[0] ? sh[0]["name"] : "546878", sh[0] ? sh[0]["id"] : "1tG_QlMf", "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    }),
    fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[1] ? sh[1]["name"] : "546878", sh[1] ? sh[1]["id"] : "1tG_QlMf", "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    }),
   fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[2] ? sh[2]["name"] : "546878", sh[2] ? sh[2]["id"] : "1tG_QlMf", "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    ]);
    */
    //
    //
    const data2 = await getRecommendedSongs(sh[0] ? sh[0]["name"] : "546878", sh[0] ? sh[0]["id"] : "1tG_QlMf", "name");
    const data3 = await getRecommendedSongs(sh[1] ? sh[1]["name"] : "546878", sh[1] ? sh[1]["id"] : "1tG_QlMf", "name");
    const data4 = await getRecommendedSongs(sh[2] ? sh[2]["name"] : "546878", sh[2] ? sh[2]["id"] : "1tG_QlMf", "name");
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

// get song data
export async function getSongData(id1) {
  try {
    const id2 = id1.toString().split(",");
//id1.toString().split(",")
function transformList(list) {
  const transformedList = [];
  let currentChunk = [];

  for (const item of list) {
    if (item.startsWith("yt-")) {
      // Start a new chunk if the item begins with "yt-"
      transformedList.push(currentChunk.join(","));
      transformedList.push(item);
      currentChunk = [];
    } else {
      // Add the item to the current chunk
      currentChunk.push(item);
    }
  }

  // Add the last chunk to the transformed list
  transformedList.push(currentChunk.join(","));

  return transformedList;
}
    const id3 = transformList(id2);

    const result = [];
    for (let id of id3) {
    
    if (id === ""){
      console.log();
    }else if (id.includes("yt-")){
    const response = await fetch(`https://ytpi.vercel.app/song?videoId=${id.toString().replace("yt-","")}`);
    //const response = await fetch(`https://api.allorigins.win/raw?url=https%3A//beatbump.io/api/v1/player.json?videoId=${id.toString().replace("yt-","")}`);
    const data22 = await response.json();
    const data2 = [];
    
    //const x = data22[0];
    const x = data22["videoDetails"];
    let sresponse;
    let sdata22;
    let true1 = false;
    let true2 = false;
    let true3 = false;
    if (id2.length < 2) {
    sresponse =  await fetch(`https://saavn.dev/api/search?query=${x["title"].split(' (From')[0]}&page=1&limit=2`);
    sdata22 = await sresponse.json();
    if (sdata22.data?.results?.length > 0){
    let artistnamelist = sdata22.data?.results[0]?.primaryArtists?.replace(' ', '')?.split(',');
    true1 = x["author"].replace(' ', '').includes(artistnamelist[0]) || x["author"].replace(' ', '').includes(artistnamelist?.slice(-1));
    true2 = sdata22.data?.results[0]?.name?.includes(x["title"].split(' ')[0]);
    true3 = Math.abs(parseInt(sdata22.data?.results[0]?.duration) - parseInt(x["lengthSeconds"])) < 10;
    }
    }
    
    
    if (true1 && true2 && true3){
      const response = await fetch(`https://jiosaavn-api-gilt.vercel.app/songs?id=${sdata22['data']['results'][0]['id']}`);
      const data = await response.json();
    //data.data["name"] = data?.data["name"].replaceAll('&quot;','"');
      for (let song of data?.data) {
        song["name"] = song["name"].replaceAll('&quot;','"').replaceAll('&#039;',"'");
        result.push(song);
      }
    
    }else{
      
      x["primaryArtists"] = x["author"].replace(',', ', ');
      //x["primaryArtists"] = x["channelId"].replace("UCJJhJ-jgdpikgmR632THgBQ","Saregama Malayalam");
      x["image"] = [{
            "quality": "50x50",
            "link": x["thumbnail"]["thumbnails"][0]['url'].replace('sddefault', 'hqdefault').replace('hq720', 'hqdefault')
          },
          {
            "quality": "150x150",
            "link": x["thumbnail"]["thumbnails"][1]['url'].replace('w120-h120','w150-h150').replace('sddefault', 'hqdefault').replace('hq720', 'hqdefault')
          },
          {
            "quality": "500x500",
            "link": x["thumbnail"]["thumbnails"][1]['url'].replace('w120-h120','w500-h500').replace('sddefault', 'hqdefault').replace('hq720', 'hqdefault')
          }];
      x["name"] = x["title"];
      x["duration"] = x["lengthSeconds"];
      x["playCount"] = parseInt(x["viewCount"]);
      x["id"] = `yt-${x["videoId"]}`;
      x["type"] = "song";
      x["primaryArtistsId"] = x["author"];
      x["language"] = "YouTube";
      x["album"] = {
        "id": "13615087",
        "name": "Thunderclouds",
        "url": "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_"
      };
      let lengthshort = x["lengthSeconds"] < 252;
      x["downloadUrl"] = [
        {
          "quality": "12kbps",
          "link": lengthshort ? `https://ytpi.vercel.app/audio?videoId=${id.toString().replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${id.toString().replace("yt-","")}`
        },
        {
          "quality": "48kbps",
          "link": lengthshort ? `https://ytpi.vercel.app/audio?videoId=${id.toString().replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${id.toString().replace("yt-","")}`
        },
        {
          "quality": "96kbps",
          "link": lengthshort ? `https://ytpi.vercel.app/audio?videoId=${id.toString().replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${id.toString().replace("yt-","")}`
        },
        {
          "quality": "160kbps",
          "link": lengthshort ? `https://ytpi.vercel.app/audio?videoId=${id.toString().replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${id.toString().replace("yt-","")}`
        },
        {
          "quality": "320kbps",
          "link": lengthshort ? `https://ytpi.vercel.app/audio?videoId=${id.toString().replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${id.toString().replace("yt-","")}`
        }
      ];
      result.push(x);
          
    }}else{
    const response = await fetch(`https://jiosaavn-api-gilt.vercel.app/songs?id=${id.toString()}`);
    const data = await response.json();
    //data.data["name"] = data?.data["name"].replaceAll('&quot;','"');
      for (let song of data?.data) {
        song["name"] = song["name"].replaceAll('&quot;','"').replaceAll('&#039;',"'");
        result.push(song);
      }
     
    }}
    return result;
  } catch (error) {
    console.log(error);
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
    if (!id.includes("Saregama")){
    const response = await fetch(`https://jiosaavn-api-gilt.vercel.app/artists?id=${id}`);
    const data = await response.json();
    return data?.data;
    }else{
      const data = {
    "id": "568707",
    "name": id.replace("yt-","").replace("%20"," "),
    "url": "https://www.jiosaavn.com/artist/sia-/C4hxFiXrHws_",
    "image": [
      {
        "quality": "50x50",
        "link": "https://musicplus-web.vercel.app/channels4_profile.jpg"
      },
      {
        "quality": "150x150",
        "link": "https://musicplus-web.vercel.app/channels4_profile.jpg"
      },
      {
        "quality": "500x500",
        "link": "https://musicplus-web.vercel.app/channels4_profile.jpg"
      }
    ],
    "followerCount": "71752",
    "fanCount": "963569",
    "isVerified": false,
    "dominantLanguage": id.includes("Music") ? "hindi" : id.split("%20")[1],
    "dominantType": "music provider",
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
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

// get artist songs
export async function getArtistSongs(id, page) {
  try {
    if (!id.includes("Saregama")){
    const response = await fetch(
      `https://jiosaavn-api-gilt.vercel.app/artists/${id}/songs?page=${page}`
    );
    const data = await response.json();
    return data?.data;
    }else{
      const response = await fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": ["546878", `yt-${id} new-songs`, "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      const data1 = {"results":[]};
      const data = await response.json();
      data1["results"] = data?.data;
      return data1;
    }
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
    
    const response1 = await fetch(`https://ytpi.vercel.app/search?query=${query}`);
    const data1 = await response1.json();
    const data2 = [];
    let lastname = ':';
    const true1 = query.includes("youtube") || data.data["songs"]["results"].length < 3;
    //(data.data?.songs?.results[0]?.name != JSON.stringify(data1[0].title) && data.data?.songs?.results[1]?.name != JSON.stringify(data1[0].title))
    if (true1){
    console.log(data.data["songs"]["results"][0]?.toString() + ":" + JSON.stringify(data1[0].title))
    console.log(data.data["songs"]["results"]?.toString() + ":" + JSON.stringify(data1[0].title))
    for (let x of data1) {
      if (lastname.split(":")[0] == "Top result" && lastname.split(':')[1].includes(JSON.stringify(x["title"]))){ data2.pop(); }
      if ("Top result Songs".includes(x['category']) && x['videoId'] != null) { lastname = x['category'] + ':' + JSON.stringify(x["title"]) }else{ continue; }
      
      let art = [];
      for (let arti of x["artists"]) {
        if (!'VideoSong'.includes(arti["name"])) {
        art.push(arti["name"])
        }
      }
      x["primaryArtists"] = art.reverse().join(", ");
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
      x["primaryArtistsId"] = art.join();
      //if ((!x["name"].includes("Official Trailer")) && (!x["name"].includes("Teaser")) && (x["duration"] > 60) && (x["duration"] < 1800)){
        data2.push(x);
      //}
      
    }
  }
    data.data["songs"]["results"] = true1 ? [...data2.slice(0,4)] : [...data2.slice(0,4),...data?.data["songs"]["results"]];
    data.data["albums"]["results"] = true1 ? [] : data.data["albums"]["results"];
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

// add and remove from favourite
export async function addFavourite(id) {
  try {
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
      let songName;
      if (language == 'name'){
      songName = artistId;  
      }else{
      const response = await fetch(`https://ytpi.vercel.app/song?videoId=${sondId.replace("yt-","")}`);
      const data = await response.json();
      songName = sondId.includes("Saregama") ? sondId.replace("yt-","") : data['videoDetails']["title"];
      }

      const response1 = await fetch(`https://ytpi.vercel.app/search?query=${songName}&filter=songs`);
      const data1 = await response1.json();
      const data2 = [];
    //if (data1[0]["author"].includes("Saregama")){
    for (let x of data1) {
      let art = [];
      for (let arti of x["artists"]) {
        art.push(arti["name"])
      }
      x["primaryArtists"] = art.reverse().join();
      x["duration"] = x["duration_seconds"];
      x["image"] = [{
            "quality": "50x50",
            "link": `${x["thumbnails"][0]['url'].replace('sddefault', 'hqdefault')}`
          },
          {
            "quality": "150x150",
            "link": `${x["thumbnails"][1]['url'].replace('w120-h120','w150-h150').replace('sddefault', 'hqdefault')}`
          },
          {
            "quality": "500x500",
            "link": `${x["thumbnails"][1]['url'].replace('w120-h120','w500-h500').replace('sddefault', 'hqdefault')}`
          }];
      x["album"] = {
        "id": "13615087",
        "name": "Thunderclouds",
        "url": "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_"
      };
      x["name"] = x["title"].split(" -")[0].split(" |")[0];
      x["id"] = `yt-${x["videoId"]}`;
      x["type"] = "song";
      x["downloadUrl"] = [
        {
          "quality": "12kbps",
          "link": x["lengthSeconds"] < 252 ? `https://ytpi.vercel.app/audio?videoId=${x["id"].replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${x["id"].replace("yt-","")}`
        },
        {
          "quality": "48kbps",
          "link": x["lengthSeconds"] < 252 ? `https://ytpi.vercel.app/audio?videoId=${x["id"].replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${x["id"].replace("yt-","")}`
        },
        {
          "quality": "96kbps",
          "link": x["lengthSeconds"] < 252 ? `https://ytpi.vercel.app/audio?videoId=${x["id"].replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${x["id"].replace("yt-","")}`
        },
        {
          "quality": "160kbps",
          "link": x["lengthSeconds"] < 252 ? `https://ytpi.vercel.app/audio?videoId=${x["id"].replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${x["id"].replace("yt-","")}`
        },
        {
          "quality": "320kbps",
          "link": x["lengthSeconds"] < 252 ? `https://ytpi.vercel.app/audio?videoId=${x["id"].replace("yt-","")}` : `https://ytmrelay-api.onrender.com/audio?videoId=${x["id"].replace("yt-","")}`
        }
      ];
      x["primaryArtistsId"] = art.join();
      if (!x["name"].includes(songName)){
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
