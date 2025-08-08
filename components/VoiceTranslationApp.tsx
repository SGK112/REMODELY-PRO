"use client";

import * as React from "react";

type AgentProfile = {
  id: string;
  name: string;
  description: string;
  voiceId: string;
  agentId?: string; // Optional ElevenLabs agent ID
  systemPrompt?: string; // Optional system prompt for the agent
};

export function VoiceTranslationApp({ agent }: { agent: AgentProfile }) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{
    source: 'user' | 'agent';
    message: string;
    timestamp: Date;
  }>>([]);

  const handleToggleSession = async () => {
    if (isConnected) {
      setIsConnected(false);
      setMessages([]);
    } else {
      setIsConnecting(true);
      
      // Simulate connection process
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
        setMessages([{
          source: 'agent',
          message: `Hello! I'm ${agent.name}. ${agent.description} How can I help you today?`,
          timestamp: new Date()
        }]);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleToggleSession}
        className={`px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 ${
          isConnected
            ? "bg-red-600 hover:bg-red-700"
            : "bg-sky-600 hover:bg-sky-700"
        } ${isConnecting ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : isConnected ? "End Conversation" : "Start Conversation"}
      </button>
      
      {isConnecting && (
        <div className="flex items-center gap-2 text-blue-400">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <p>Connecting to {agent.name}...</p>
        </div>
      )}
      
      <div className="w-full p-4 bg-slate-700 rounded-lg max-h-64 overflow-y-auto">
        {messages.length > 0 ? (
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div key={index} className={`p-2 rounded ${
                message.source === 'user' ? 'bg-blue-600/20 ml-4' : 'bg-gray-600/20 mr-4'
              }`}>
                <p className="font-mono text-sm">
                  <span className="font-semibold">
                    {message.source === 'user' ? 'You' : agent.name}:
                  </span>{' '}
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center font-mono">
            {isConnected ? "Start speaking..." : "Press the button to begin"}
          </p>
        )}
      </div>
      
      <div className="text-xs text-gray-400 text-center">
        {isConnected ? "Connected" : "Disconnected"}
        {agent.agentId && (
          <span className="block">Agent ID: {agent.agentId}</span>
        )}
        {agent.voiceId && (
          <span className="block">Voice ID: {agent.voiceId}</span>
        )}
      </div>
      
      {isConnected && (
        <div className="text-xs text-blue-400 bg-blue-900/20 p-2 rounded">
          Note: This is a demo interface. Full ElevenLabs integration will be enabled with proper API configuration.
        </div>
      )}
    </div>
  );
}
