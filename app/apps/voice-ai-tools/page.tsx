"use client";

import * as React from "react";
import { Brain, Mic, Volume2, Loader2 } from "lucide-react";

// Example agent profiles
const agents = [
	{
		id: "consultant",
		name: "Sarah (Consultant)",
		description: "Professional, clear, and knowledgeable. Best for initial consultations.",
		voiceId: "EXAVITQu4vr4xnSDxMaL",
	},
	{
		id: "project_manager",
		name: "David (Project Manager)",
		description: "Warm, friendly, and reassuring. Good for project updates.",
		voiceId: "IKne3meq5aSn9XLyUdCD",
	},
	// More agents to wire up later
	{
		id: "designer",
		name: "Maria (Interior Designer)",
		description: "Creative, detail-oriented, and focused on design solutions.",
		voiceId: "your-voice-id-for-maria",
	},
	{
		id: "foreman",
		name: "Jack (Site Foreman)",
		description: "Practical, safety-focused, and hands-on construction expert.",
		voiceId: "your-voice-id-for-jack",
	},
	{
		id: "ambassador",
		name: "Lisa (Brand Ambassador)",
		description: "Friendly, knowledgeable, and passionate about RemodelyPro.",
		voiceId: "your-voice-id-for-lisa",
	},
];

export default function VoiceAIToolsPage() {
	const [selectedAgent, setSelectedAgent] = React.useState(agents[0]);
	const [isRecording, setIsRecording] = React.useState(false);
	const [transcript, setTranscript] = React.useState("");
	const [textToSpeak, setTextToSpeak] = React.useState("");
	const [isSpeaking, setIsSpeaking] = React.useState(false);
	const audioRef = React.useRef<HTMLAudioElement | null>(null);

	// Placeholder handlers for voice-to-text and text-to-voice
	const handleStartRecording = () => {
		setIsRecording(true);
		setTranscript("Listening...");
		// TODO: Integrate browser SpeechRecognition or ElevenLabs API
		setTimeout(() => {
			setTranscript("Example transcript: How can I help you with your remodel?");
			setIsRecording(false);
		}, 2000);
	};

	const handleSpeakText = async () => {
		setIsSpeaking(true);
		try {
			const res = await fetch("/api/elevenlabs-tts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: textToSpeak, voiceId: selectedAgent.voiceId }),
			});
			if (!res.ok) throw new Error("Failed to synthesize speech");
			const audioBlob = await res.blob();
			const audioUrl = URL.createObjectURL(audioBlob);
			if (audioRef.current) {
				audioRef.current.src = audioUrl;
				audioRef.current.play();
			}
		} catch (err) {
			// Handle error (show toast, etc.)
		} finally {
			setIsSpeaking(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-950 text-white px-4 py-8 flex flex-col items-center animate-fade-in">
			<div className="max-w-2xl w-full">
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-2 mb-4">
						<Brain className="w-10 h-10 text-green-400" />
						<h1 className="text-3xl font-bold text-green-400">Voice & Speech AI Tools</h1>
					</div>
					<p className="text-green-200 font-medium">Talk to RemodelyPro's construction experts using voice or text.</p>
				</div>
				{/* Agent Selection */}
				<div className="flex gap-4 mb-8 justify-center flex-wrap">
					{agents.map((agent) => (
						<button
							key={agent.id}
							className={`px-4 py-2 rounded-xl border-2 font-semibold transition-all duration-200 ${selectedAgent.id === agent.id ? "border-orange-400 bg-green-900 text-orange-400" : "border-green-400 bg-gray-900 text-green-400 hover:bg-green-800"}`}
							onClick={() => setSelectedAgent(agent)}
						>
							{agent.name}
						</button>
					))}
				</div>
				{/* Voice-to-Text */}
				<div className="bg-gray-900 rounded-2xl border-2 border-green-400 p-6 mb-8 flex flex-col items-center">
					<h2 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2"><Mic className="w-5 h-5" /> Voice to Text</h2>
					<button
						className={`px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 ${isRecording ? "bg-orange-500" : "bg-green-600 hover:bg-orange-500"}`}
						onClick={handleStartRecording}
						disabled={isRecording}
					>
						{isRecording ? <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" /> : <Mic className="w-5 h-5 inline-block mr-2" />}
						{isRecording ? "Listening..." : "Start Recording"}
					</button>
					<div className="mt-4 w-full text-center text-gray-200 bg-gray-800 rounded p-3 min-h-[48px]">
						{transcript || "Transcript will appear here."}
					</div>
				</div>
				{/* Text-to-Voice */}
				<div className="bg-gray-900 rounded-2xl border-2 border-green-400 p-6 flex flex-col items-center">
					<h2 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2"><Volume2 className="w-5 h-5" /> Text to Voice</h2>
					<textarea
						className="w-full rounded-lg border-2 border-green-400 bg-gray-800 text-white p-3 mb-4 min-h-[60px]"
						placeholder="Type your message to speak..."
						value={textToSpeak}
						onChange={(e) => setTextToSpeak(e.target.value)}
					/>
					<button
						className={`px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 ${isSpeaking ? "bg-orange-500" : "bg-green-600 hover:bg-orange-500"}`}
						onClick={handleSpeakText}
						disabled={isSpeaking || !textToSpeak.trim()}
					>
						{isSpeaking ? <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" /> : <Volume2 className="w-5 h-5 inline-block mr-2" />}
						{isSpeaking ? "Speaking..." : "Speak Text"}
					</button>
					<audio ref={audioRef} className="mt-4 w-full" controls hidden />
				</div>
			</div>
		</div>
	);
}
