import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrl } from "../_actions/get-presigned-url";

export async function POST(req: NextRequest) {
  try {
    const { filename } = await req.json();
    const presignedUrl = await getPresignedUrl(filename);

    return NextResponse.json({
      message: "Presigned URL Generated",
      url: presignedUrl,
      filename,
    });
  } catch (error) {
    console.error("[SERVER_ERRORS]", error);
    return new NextResponse("Error uploading video", {
      status: 500,
    });
  }
}
