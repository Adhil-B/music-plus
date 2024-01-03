import { NextResponse } from "next/server";
import { getRecommendedSongs, getSongData } from '@/services/dataAPI';
import { Innertube } from 'youtubei.js';
const youtube = await Innertube.create(/* options */);


export async function PUT(request) {
    const list = await request.json();
    return NextResponse.json(
            {
                success: true,
                message: "success",
                data: await getRecommendedSongs(list["data"][0] , list["data"][1], list["data"][2])
            }
        );
    
}
export async function POST(request) {
    const list = await request.json();
    return NextResponse.json(
            {
                success: true,
                message: "success",
                data: await getSongData(list["data"])
            }
        );
    
}
