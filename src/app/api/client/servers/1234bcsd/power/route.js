import { NextResponse } from "next/server";
const Pusher = require("pusher");

export async function GET(req){
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
            { status: 401 }
        );
}
export async function POST(request) {
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
            { status: 401 }
        );
}
