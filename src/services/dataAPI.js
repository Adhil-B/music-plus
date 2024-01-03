// home page data
export async function homePageData(language) {
  try {
    const response = await fetch(
      `https://saavn.me/modules?language=${language.toString()}`,
      {
        next: {
          revalidate: 14400,
        },
      }
    );
    const data = await response.json();
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
    const favsongs = favsong.slice(0, 3).join();

    const response = await fetch("/api/recommend", {
      method: "POST",
      body: JSON.stringify({ "data": favsongs }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data99 = await response.json();
    const sh = favsong ? data99?.data : [];
    
     const response2 = await fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[0] ? sh[0]["primaryArtistsId"].split(", ")[0] : "546878", sh[0] ? sh[0]["id"] : "1tG_QlMf", sh[0] ? sh[0]["language"] : "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response3 = await fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[1] ? sh[1]["primaryArtistsId"].split(", ")[0] : "546878", sh[1] ? sh[1]["id"] : "1tG_QlMf", sh[1] ? sh[1]["language"] : "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
   const response4 = await fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[2] ? sh[2]["primaryArtistsId"].split(", ")[0] : "546878", sh[2] ? sh[2]["id"] : "1tG_QlMf", sh[2] ? sh[2]["language"] : "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    //
    //
    const data2 = await response2.json();
    //const data2 = await response2.json();
    const data3 = await response3.json();
    const data4 = await response4.json();
    const alldata0 = sh[0] ? data2?.data : [];
    const alldata = alldata0.slice(0,7).concat(sh[1] ? data3?.data.slice(0,6) : []).concat(sh[2] ? data4?.data.slice(0,5) : []);

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
    
      const response2 = await fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[0] ? sh[0]["primaryArtistsId"].split(", ")[0] : "546878", sh[0] ? sh[0]["id"] : "1tG_QlMf", sh[0] ? sh[0]["language"] : "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response3 = await fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[1] ? sh[1]["primaryArtistsId"].split(", ")[0] : "546878", sh[1] ? sh[1]["id"] : "1tG_QlMf", sh[1] ? sh[1]["language"] : "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
   const response4 = await fetch("/api/recommend", {
      method: "PUT",
      body: JSON.stringify({ "data": [sh[2] ? sh[2]["primaryArtistsId"].split(", ")[0] : "546878", sh[2] ? sh[2]["id"] : "1tG_QlMf", sh[2] ? sh[2]["language"] : "malayalam"] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    //
    //
    const data2 = await response2.json();
    const data3 = await response3.json();
    const data4 = await response4.json();
    const alldata0 = sh[0] ? data2?.data : [];
    const alldata = alldata0.slice(0,7).concat(sh[1] ? data3?.data.slice(0,6) : []).concat(sh[2] ? data4?.data.slice(0,5) : []);

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
    const response = await fetch(`https://podz-music.vercel.app/api/search/?query=${id.toString().replace("yt-","")}`);
    const data22 = await response.json();
    const data2 = [];
    const x = data22[0];
      x["primaryArtists"] = x["author"];
      x["image"] = [{
            "quality": "50x50",
            "link": `https://i.ytimg.com/vi/${id.toString().replace("yt-","")}/hq720.jpg`
          },
          {
            "quality": "150x150",
            "link": `https://i.ytimg.com/vi/${id.toString().replace("yt-","")}/hq720.jpg`
          },
          {
            "quality": "500x500",
            "link": `https://i.ytimg.com/vi/${id.toString().replace("yt-","")}/hq720.jpg`
          }];
      x["name"] = x["title"];
      x["id"] = `yt-${x["id"]}`;
      x["type"] = "song";
      x["primaryArtistsId"] = x["author"];
      x["language"] = "YouTube";
      x["album"] = {
        "id": "13615087",
        "name": "Thunderclouds",
        "url": "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_"
      };
      x["downloadUrl"] = [
        {
          "quality": "12kbps",
          "link": `https://youtubeforever.vercel.app/audio/${id.toString().replace("yt-","")}`
        },
        {
          "quality": "48kbps",
          "link": `https://youtubeforever.vercel.app/audio/${id.toString().replace("yt-","")}`
        },
        {
          "quality": "96kbps",
          "link": `https://youtubeforever.vercel.app/audio/${id.toString().replace("yt-","")}`
        },
        {
          "quality": "160kbps",
          "link": `https://youtubeforever.vercel.app/audio/${id.toString().replace("yt-","")}`
        },
        {
          "quality": "320kbps",
          "link": `https://youtubeforever.vercel.app/audio/${id.toString().replace("yt-","")}`
        }
      ];
      result.push(x);
          
    }else{
    const response = await fetch(`https://saavn.me/songs?id=${id.toString()}`);
    const data = await response.json();
    //data.data["name"] = data?.data["name"].replaceAll('&quot;','"');
      for (let song of data?.data) {
        song["name"] = song["name"].replaceAll('&quot;','"');
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
    const response = await fetch(`https://saavn.me/albums?id=${id}`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

// get playlist data
export async function getplaylistData(id) {
  try {
    const response = await fetch(`https://saavn.me/playlists?id=${id}`);
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

// get Lyrics data
export async function getlyricsData(id) {
  try {
    const response = await fetch(`https://saavn.me/lyrics?id=${id}`);
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
    const response = await fetch(`https://saavn.me/artists?id=${id}`);
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
      `https://saavn.me/artists/${id}/songs?page=${page}`
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
      `https://saavn.me/artists/${id}/albums?page=${page}`
    );
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
}

// get search data
export async function getSearchedData(query) {
  try {
    const response = await fetch(`https://saavn.me/search/all?query=${query}`);
    const data = await response.json();
    
    const response1 = await fetch(`https://podz-music.vercel.app/api/search/?query=${query}`);
    const data1 = await response1.json();
    const data2 = [];
    if (data1[0]["author"].includes("Saregama")){
    for (let x of data1) {
      x["primaryArtists"] = x["author"];
      x["image"] = [{
            "quality": "50x50",
            "link": x["image"]
          },
          {
            "quality": "150x150",
            "link": x["image"]
          },
          {
            "quality": "500x500",
            "link": x["image"]
          }];
      x["name"] = x["title"];
      x["album"] = {
        "id": "13615087",
        "name": "Thunderclouds",
        "url": "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_"
      };
      x["id"] = `yt-${x["id"]}`;
      x["type"] = "song";
      x["primaryArtistsId"] = "9876541";
      if ((!x["name"].includes("Official Trailer")) && (x["author"].includes("Saregama")) && (x["duration"] > 60)){
        data2.push(x);
      }
      
    }
  }
    data.data["songs"]["results"] = [...data2.slice(0,4),...data?.data["songs"]["results"]];
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
      const response = await fetch(`https://podz-music.vercel.app/api/search/?query=${sondId.replace("yt-","")}`);
      const data = await response.json();
      const songName = sondId.includes("Saregama") ? sondId.replace("yt-","") : data[0]["title"];
      const response1 = await fetch(`https://podz-music.vercel.app/api/search/?query=${songName}`);
      const data1 = await response1.json();
      const data2 = [];
    if (data1[0]["author"].includes("Saregama")){
    for (let x of data1) {
      x["primaryArtists"] = x["author"];
      x["image"] = [{
            "quality": "50x50",
            "link": x["image"]
          },
          {
            "quality": "150x150",
            "link": x["image"]
          },
          {
            "quality": "500x500",
            "link": x["image"]
          }];
      x["album"] = {
        "id": "13615087",
        "name": "Thunderclouds",
        "url": "https://www.jiosaavn.com/album/thunderclouds/tq0W-ibW-dg_"
      };
      x["name"] = x["title"];
      x["id"] = `yt-${x["id"]}`;
      x["type"] = "song";
      x["downloadUrl"] = [
        {
          "quality": "12kbps",
          "link": `https://youtubeforever.vercel.app/audio/${x["id"].replace("yt-","")}}`
        },
        {
          "quality": "48kbps",
          "link": `https://youtubeforever.vercel.app/audio/${x["id"].replace("yt-","")}}`
        },
        {
          "quality": "96kbps",
          "link": `https://youtubeforever.vercel.app/audio/${x["id"].replace("yt-","")}}`
        },
        {
          "quality": "160kbps",
          "link": `https://youtubeforever.vercel.app/audio/${x["id"].replace("yt-","")}}`
        },
        {
          "quality": "320kbps",
          "link": `https://youtubeforever.vercel.app/audio/${x["id"].replace("yt-","")}}`
        }
      ];
      x["primaryArtistsId"] = "9876541";
      if ((!x["name"].includes("Official Trailer")) && (x["author"].includes("Saregama")) && (x["duration"] > 60)){
        if (sondId.includes("Saregama")){
          if (x["author"].includes(sondId.split("%20")[1].replace(" new-songs",""))){
           data2.push(x);
          }
        }else{
          data2.push(x);
        }
        
      }
      
    }
  }
      return data2.slice(1);
    }else{
    const response = await fetch(
      `https://saavn.me/artists/${artistId}/recommendations/${sondId}?language=${language}`
    );
    const data = await response.json();
    return data?.data;
    }
  } catch (error) {
    console.log(error);
  }
}
