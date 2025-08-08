"use client";

import { useConversation } from "@11labs/react";
import * as React from "react";

type AgentProfile = {
  id: string;
  name: string;
  description: string;
  voiceId: string;
};

export function VoiceTranslationApp({ agent }: { agent: AgentProfile }) {
  const {
    start,
    stop,
    isLoading,
    isRecording,
    isSpeaking,
    transcript,
    text,
  } = useConversation({
    voiceId: agent.voiceId,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={isRecording ? stop : start}
        className={`px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 ${
          isRecording
            ? "bg-red-600 hover:bg-red-700"
            : "bg-sky-600 hover:bg-sky-700"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {isRecording ? "Stop Listening" : "Start Conversation"}
      </button>
      {isSpeaking && <p>AI is speaking...</p>}
      <div className="w-full p-4 bg-slate-700 rounded-lg">
        <p className="font-mono">{transcript}</p>
        <p className="font-mono text-sky-400">{text}</p>
      </div>
    </div>
  );
}
