import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENAI_IMAGES_URL = "https://api.openai.com/v1/images/generations";
const MAX_PROMPT_LENGTH = 1200;

interface ImageGenerateRequest {
  prompt?: string;
}

export async function POST(request: Request) {
  let body: ImageGenerateRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const prompt = body.prompt?.trim();

  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt is required." },
      { status: 400 }
    );
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: `Prompt must be ${MAX_PROMPT_LENGTH} characters or less.` },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: "Image generation is not configured. Set OPENAI_API_KEY on the server.",
      },
      { status: 200 }
    );
  }

  try {
    const response = await fetch(OPENAI_IMAGES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "low",
        output_format: "png",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.error?.message || "Image generation failed.",
        },
        { status: 200 }
      );
    }

    const image = data.data?.[0]?.b64_json;

    if (typeof image !== "string" || image.length === 0) {
      return NextResponse.json(
        { error: "Image generation returned no image data." },
        { status: 200 }
      );
    }

    return NextResponse.json({
      image: `data:image/png;base64,${image}`,
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
    });
  } catch {
    return NextResponse.json(
      { error: "Image generation is temporarily unavailable." },
      { status: 200 }
    );
  }
}
