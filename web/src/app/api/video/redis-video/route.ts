import { currentUserData } from "@/actions/user-actions";
import redisClient from "@/lib/redis-client";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await currentUserData();
    if (!redisClient) {
      return new NextResponse("Internal Server Error Please Try Later", {
        status: 500,
      });
    }

    if (!user) {
      return NextResponse.redirect("/sign-in");
    }
    const fetchSize = 10;
    let cursor = "0";
    let results = [];

    const reply = await redisClient.scan(
      cursor,
      "MATCH",
      "video:*:status",
      "COUNT",
      fetchSize
    );

    cursor = reply[0];
    const keys = reply[1];

    for (let key of keys) {
      const status = await redisClient.get(key);

      if (status) {
        const parsedStatus = JSON.parse(status);

        if (parsedStatus.userId === user.id) {
          results.push({
            key,
            status: parsedStatus.status,
            userId: parsedStatus.userId,
            video: parsedStatus.video,
          });
        }
      }
    }

    // console.log("RESULTS", results);

    return NextResponse.json({
      message: "Videos Fetched Successfully!",
      videos: results,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
