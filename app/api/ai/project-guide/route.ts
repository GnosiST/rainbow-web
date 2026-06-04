import { NextResponse } from "next/server";
import projectsIndex from "@/public/data/projects.index.json";
import type { Project } from "@/lib/types/project";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

function buildPrompt(projects: Project[]) {
  const projectSummaries = projects
    .slice(0, 8)
    .map((project) => {
      const tags = project.tags.length > 0 ? project.tags.join(", ") : "no tags";
      const featured = project.featured ? "featured" : "standard";

      return `- ${project.title} (${project.year}, ${featured}, ${tags}): ${project.excerpt}`;
    })
    .join("\n");

  return [
    "You are an AI curator for a creative portfolio website.",
    "Write a concise visitor guide in plain English.",
    "Recommend a browsing order, call out 2-3 strongest projects, and mention who each recommendation is for.",
    "Keep it under 120 words. Do not invent projects or metrics.",
    "",
    "Projects:",
    projectSummaries,
  ].join("\n");
}

function fallbackGuide(projects: Project[]) {
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const picks = featured.length > 0 ? featured : projects.slice(0, 3);
  const pickNames = picks.map((project) => project.title).join(", ");

  return [
    "AI Guide is not configured yet.",
    pickNames
      ? `For now, start with ${pickNames}; these projects give visitors a quick cross-section of the portfolio.`
      : "Add projects to the content directory to generate a guided browsing path.",
    "Set OPENAI_API_KEY on the server to enable generated recommendations.",
  ].join(" ");
}

export async function GET() {
  const projects = projectsIndex.projects as Project[];

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      guide: fallbackGuide(projects),
      source: "fallback",
    });
  }

  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: buildPrompt(projects),
        max_output_tokens: 220,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          guide: fallbackGuide(projects),
          source: "fallback",
          error: "AI guide request failed.",
        },
        { status: 200 }
      );
    }

    const data = await response.json();
    const fallback = fallbackGuide(projects);
    const guide =
      typeof data.output_text === "string" && data.output_text.trim().length > 0
        ? data.output_text.trim()
        : fallback;

    return NextResponse.json({
      guide,
      source: guide === fallback ? "fallback" : "openai",
    });
  } catch {
    return NextResponse.json(
      {
        guide: fallbackGuide(projects),
        source: "fallback",
        error: "AI guide is temporarily unavailable.",
      },
      { status: 200 }
    );
  }
}
