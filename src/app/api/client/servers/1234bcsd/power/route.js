import { NextResponse } from "next/server";
const Pusher = require("pusher");

export async function POST(req) {
const favresponse = await fetch("https://flask-hello-world-theta-dusky.vercel.app/api/client/servers/1234bcsd/power");
}
export async function GET(reqq) {

const pusher = new Pusher({
  appId: "1559468",
  key: "16cc5da1d681a2406c5f",
  secret: "0f3961bb2047c8f12b3d",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "start-hc"
});
return NextResponse.json(
            {
                success: true,
                message: "Starting",
                data: null
            },
            { status: 200 }
        );
}
