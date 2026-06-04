"use client";

import React, { useState } from "react";

interface ImageGenerateResponse {
  image?: string;
  model?: string;
  error?: string;
}

const EXAMPLE_PROMPT =
  "A polished hero image for an interactive desktop OS portfolio, clean UI panels, creative tools, soft studio lighting, modern editorial style";

export function ImageStudioWindow() {
  const [prompt, setPrompt] = useState(EXAMPLE_PROMPT);
  const [image, setImage] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || loading) return;

    setLoading(true);
    setError("");
    setImage("");
    setModel("");

    try {
      const response = await fetch("/api/ai/image-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });
      const data = (await response.json()) as ImageGenerateResponse;

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.image) {
        setImage(data.image);
        setModel(data.model || "");
      } else {
        setError("No image was returned.");
      }
    } catch {
      setError("Image generation is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-black/20 text-white">
      <div className="border-b border-white/10 p-4">
        <div className="text-xs uppercase tracking-[0.2em] text-blue-300/80">
          Image Studio
        </div>
        <h2 className="mt-1 text-base font-semibold text-white/90">
          Generate a quick visual concept
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Text-to-image preview for portfolio covers and visual directions. Images are not saved.
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-auto p-4 md:grid-cols-[minmax(260px,360px)_1fr]">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-white/80" htmlFor="image-studio-prompt">
            Prompt
          </label>
          <textarea
            id="image-studio-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            maxLength={1200}
            className="min-h-48 resize-none rounded-lg border border-white/10 bg-white/[0.06] p-3 text-sm leading-6 text-white outline-none transition focus:border-blue-400/60 focus:bg-white/[0.08]"
            placeholder="Describe a portfolio cover, hero visual, or creative direction..."
          />
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>{prompt.trim().length}/1200</span>
            {model && <span>{model}</span>}
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || prompt.trim().length === 0}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
          >
            {loading ? "Generating..." : "Generate Preview"}
          </button>
          {error && (
            <p className="rounded-lg border border-yellow-300/20 bg-yellow-500/10 p-3 text-sm leading-6 text-yellow-100/80">
              {error}
            </p>
          )}
        </div>

        <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-4">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Generated portfolio concept"
              className="max-h-full max-w-full rounded-md object-contain shadow-2xl"
            />
          ) : (
            <div className="max-w-sm text-center text-sm leading-6 text-white/45">
              {loading
                ? "Generating image preview..."
                : "Generated images appear here for preview only."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
