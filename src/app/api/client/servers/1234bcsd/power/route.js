import { NextResponse } from "next/server";

export async function POST(req) {
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1559468",
  key: "16cc5da1d681a2406c5f",
  secret: "0f3961bb2047c8f12b3d",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
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

export async function GET(reqq) {
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1559468",
  key: "16cc5da1d681a2406c5f",
  secret: "0f3961bb2047c8f12b3d",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
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
