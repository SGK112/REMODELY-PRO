"use client";

import * as React from "react";
import { VoiceTranslationApp } from "@/components/VoiceTranslationApp";
import { ThemeToggle } from "@/components/theme-toggle";

// Define a type for our agents for better type-checking
export type AgentProfile = {
  id: string;
  name: string;
  description: string;
  voiceId: string; // This would be the actual voice ID from ElevenLabs
};

// Pre-defined agent profiles
const agents: AgentProfile[] = [
  {
    id: "bella",
    name: "Sarah (Consultant)",
    description:
      "Professional, clear, and knowledgeable. Best for initial consultations.",
    voiceId: "EXAVITQu4vr4xnSDxMaL", // Bella's Voice ID
  },
  {
    id: "charlie",
    name: "David (Project Manager)",
    description: "Warm, friendly, and reassuring. Good for project updates.",
    voiceId: "IKne3meq5aSn9XLyUdCD", // Charlie's Voice ID
  },
  {
    id: "rachel",
    name: "Rachel (Support)",
    description: "Conversational and natural. Ideal for customer support.",
    voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel's Voice ID
    systemPrompt: "You are Rachel, a customer support specialist...",
  },
  {
    id: "andy",
    name: "Andy (Specialist)",
    description: "A new specialist agent.",
    voiceId: "your-voice-id-for-andy", // TODO: Add Andy's actual Voice ID
    agentId: "agent_5401k1we1dkbf1mvt22mme8wz82a",
    systemPrompt: "You are Andy, a specialist at RemodelyPro. Your role is to provide expert-level insights on complex renovation topics. You are direct, analytical, and highly intelligent.",
  },
];

export default function VoiceConsultationPage() {
  const [selectedAgent, setSelectedAgent] = React.useState<AgentProfile>(agents[0]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Voice Consultation</h1>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col md:flex-row p-4 gap-8">
        {/* Agent Selection Panel */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Select an Agent</h2>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedAgent.id === agent.id
                    ? "bg-sky-600 ring-2 ring-sky-400 shadow-xl"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <h3 className="font-bold text-lg">{agent.name}</h3>
                <p className="text-sm text-slate-300">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Voice App Panel */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-800/50 rounded-lg p-6 shadow-lg">
          <div className="w-full max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-2">
              Speak with {selectedAgent.name}
            </h2>
            <p className="text-slate-300 mb-6">
              Press the button and start talking to our AI assistant.
            </p>
            <VoiceTranslationApp agent={selectedAgent} />
          </div>
        </div>
      </main>
    </div>
  );
}
