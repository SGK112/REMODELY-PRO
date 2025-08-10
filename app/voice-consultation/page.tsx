"use client";

import * as React from "react";
import { VoiceTranslationApp } from "@/components/VoiceTranslationApp";

// Define a type for our agents for better type-checking
export type AgentProfile = {
  id: string;
  name: string;
  description: string;
  voiceId: string; // This would be the actual voice ID from ElevenLabs
  agentId?: string; // Optional ElevenLabs agent ID
  systemPrompt?: string; // Optional system prompt for the agent
};

// Pre-defined agent profiles
const agents: AgentProfile[] = [
  {
    id: "bella",
    name: "Sarah (Consultant)",
    description:
      "Professional, clear, and knowledgeable. Best for initial consultations.",
    voiceId: "EXAVITQu4vr4xnSDxMaL",
  },
  {
    id: "charlie",
    name: "David (Project Manager)",
    description: "Warm, friendly, and reassuring. Good for project updates.",
    voiceId: "IKne3meq5aSn9XLyUdCD",
  },
  {
    id: "rachel",
    name: "Rachel (Support)",
    description: "Conversational and natural. Ideal for customer support.",
    voiceId: "21m00Tcm4TlvDq8ikWAM",
    systemPrompt: "You are Rachel, a customer support specialist...",
  },
  {
    id: "andy",
    name: "Andy (Renovation Specialist)",
    description: "Expert in complex renovation topics. Direct and analytical.",
    voiceId: "your-voice-id-for-andy",
    agentId: "agent_5401k1we1dkbf1mvt22mme8wz82a",
    systemPrompt: "You are Andy, a specialist at RemodelyPro. Your role is to provide expert-level insights on complex renovation topics. You are direct, analytical, and highly intelligent.",
  },
  {
    id: "maria",
    name: "Maria (Interior Designer)",
    description: "Creative, detail-oriented, and focused on design solutions.",
    voiceId: "your-voice-id-for-maria",
    systemPrompt: "You are Maria, RemodelyPro's interior design ambassador. Help users with style, color, and space planning.",
  },
  {
    id: "jack",
    name: "Jack (Site Foreman)",
    description: "Practical, safety-focused, and hands-on construction expert.",
    voiceId: "your-voice-id-for-jack",
    systemPrompt: "You are Jack, RemodelyPro's construction foreman. Advise on site safety, logistics, and build quality.",
  },
  {
    id: "lisa",
    name: "Lisa (Brand Ambassador)",
    description: "Friendly, knowledgeable, and passionate about RemodelyPro.",
    voiceId: "your-voice-id-for-lisa",
    systemPrompt: "You are Lisa, RemodelyPro's brand ambassador. Welcome users and explain our mission.",
  },
];

export default function VoiceConsultationPage() {
  const [selectedAgent, setSelectedAgent] = React.useState<AgentProfile | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <header className="p-4 flex justify-between items-center border-b-2 border-green-400 bg-gray-900">
        <h1 className="text-2xl font-bold text-green-400">RemodelyPro Voice Agent Marketplace</h1>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-8">
        <section className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">Choose Your Construction Expert</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Browse our marketplace of AI-powered construction agents and brand ambassadors. Select an expert to start a voice or text consultation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`group relative border-2 rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${selectedAgent?.id === agent.id ? 'border-orange-400 bg-green-900 ring-2 ring-orange-400' : 'border-green-400 bg-gray-900 hover:bg-gray-800'}`}
                onClick={() => setSelectedAgent(agent)}
              >
                <h3 className="text-xl font-bold text-orange-400 mb-2">{agent.name}</h3>
                <p className="text-gray-300 mb-4">{agent.description}</p>
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  {agent.systemPrompt && <span className="italic">{agent.systemPrompt}</span>}
                  {agent.agentId && <span>Agent ID: {agent.agentId}</span>}
                  {agent.voiceId && <span>Voice ID: {agent.voiceId}</span>}
                </div>
                <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors" onClick={(e) => {e.stopPropagation(); setSelectedAgent(agent);}}>
                  {selectedAgent?.id === agent.id ? 'Selected' : 'Consult'}
                </button>
              </div>
            ))}
          </div>
        </section>
        {selectedAgent && (
          <section className="max-w-3xl mx-auto w-full mt-12">
            <div className="bg-gray-900 rounded-2xl p-8 border-2 border-green-400 shadow-xl text-center">
              <h2 className="text-2xl font-bold text-green-400 mb-2">Voice-to-Text & Text-to-Voice AI</h2>
              <p className="text-gray-300 mb-6">
                Speak with <span className="text-orange-400 font-semibold">{selectedAgent.name}</span> for expert construction advice, project updates, and design inspiration. Use your voice or type your questions below.
              </p>
              <VoiceTranslationApp agent={selectedAgent} />
              <div className="mt-6 text-sm text-gray-400">
                <span className="font-bold text-green-400">How it works:</span> <br />
                <span>• Voice-to-text: Speak and your words are transcribed for the agent.</span><br />
                <span>• Text-to-voice: The agent responds with synthesized speech and text.</span><br />
                <span>• Powered by ElevenLabs and RemodelyPro AI.</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
