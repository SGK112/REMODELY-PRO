/**
 * ElevenLabs Voice Service
 * Professional AI voice synthesis for contractor communications
 */

export interface VoiceSettings {
  stability: number
  similarity_boost: number
  style?: number
  use_speaker_boost?: boolean
}

export interface VoiceModel {
  model_id: string
  name: string
  can_be_finetuned: boolean
  can_do_text_to_speech: boolean
  can_do_voice_conversion: boolean
  can_use_style: boolean
  can_use_speaker_boost: boolean
  serves_pro_voices: boolean
  language_codes: string[]
  description: string
}

export interface GeneratedAudio {
  audio_base64: string
  alignment?: {
    character_start_times_seconds: number[]
    character_end_times_seconds: number[]
  }
}

export interface VoiceCloneRequest {
  name: string
  description?: string
  files: File[]
  labels?: Record<string, string>
}

export class ElevenLabsService {
  private static instance: ElevenLabsService
  private apiKey: string
  private baseUrl = 'https://api.elevenlabs.io/v1'
  
  // Professional voice IDs optimized for business communications
  public static readonly VOICES = {
    // Female voices - Professional, warm, trustworthy
    BELLA: 'EXAVITQu4vr4xnSDxMaL', // American, professional consultant
    RACHEL: '21m00Tcm4TlvDq8ikWAM', // American, warm and engaging
    DOMI: 'AZnzlk1XvdvUeBnXmlld', // American, confident and clear
    ELLI: 'MF3mGyEYCl7XYWbV9V6O', // American, friendly and approachable
    
    // Male voices - Authoritative, professional, trustworthy
    ADAM: 'pNInz6obpgDQGcFmaJgB', // American, deep and professional
    SAM: 'yoZ06aMxZJJ28mfd3POQ', // American, clear and authoritative
    ANTONI: 'ErXwobaYiN019PkySvjV', // American, warm and reliable
    JOSH: 'TxGEqnHWrfWFTfGW9XjX', // American, professional and engaging
    
    // Specialized voices
    GRACE: 'oWAxZDx7w5VEj9dCyTzz', // Southern American, warm
    DANIEL: 'onwK4e9ZLuTAKqWW03F9', // British, sophisticated
    SERENA: 'pMsXgVXv3BLzUgSXRplE', // American, customer service optimized
  } as const

  private constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY || ''
    if (!this.apiKey) {
      console.warn('⚠️  ElevenLabs API key not found. Voice features will be limited.')
    }
  }

  static getInstance(): ElevenLabsService {
    if (!ElevenLabsService.instance) {
      ElevenLabsService.instance = new ElevenLabsService()
    }
    return ElevenLabsService.instance
  }

  /**
   * Generate speech from text using specified voice
   */
  async generateSpeech(
    text: string,
    voiceId: string = ElevenLabsService.VOICES.BELLA,
    options: {
      model_id?: string
      voice_settings?: VoiceSettings
      output_format?: 'mp3_22050_32' | 'mp3_44100_32' | 'mp3_44100_64' | 'mp3_44100_96' | 'mp3_44100_128' | 'mp3_44100_192'
      optimize_streaming_latency?: number
    } = {}
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API key is required for voice synthesis')
    }

    try {
      const url = `${this.baseUrl}/text-to-speech/${voiceId}`
      
      const requestBody = {
        text: this.optimizeTextForSpeech(text),
        model_id: options.model_id || 'eleven_monolingual_v1',
        voice_settings: options.voice_settings || {
          stability: 0.75,
          similarity_boost: 0.85,
          style: 0.25,
          use_speaker_boost: true
        }
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`)
      }

      // Convert audio blob to base64 URL
      const audioBlob = await response.blob()
      const arrayBuffer = await audioBlob.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString('base64')
      const audioUrl = `data:audio/mpeg;base64,${base64}`

      return audioUrl
    } catch (error) {
      console.error('ElevenLabs speech generation failed:', error)
      throw error
    }
  }

  /**
   * Generate speech with streaming for real-time playback
   */
  async generateSpeechStream(
    text: string,
    voiceId: string = ElevenLabsService.VOICES.BELLA,
    onChunk?: (chunk: Uint8Array) => void
  ): Promise<ReadableStream> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API key is required for voice synthesis')
    }

    const url = `${this.baseUrl}/text-to-speech/${voiceId}/stream`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey
      },
      body: JSON.stringify({
        text: this.optimizeTextForSpeech(text),
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.85,
          style: 0.25,
          use_speaker_boost: true
        }
      })
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs streaming error: ${response.status}`)
    }

    return response.body!
  }

  /**
   * Get available voices from ElevenLabs
   */
  async getAvailableVoices(): Promise<any[]> {
    if (!this.apiKey) {
      // Return predefined voices if no API key
      return Object.entries(ElevenLabsService.VOICES).map(([name, id]) => ({
        voice_id: id,
        name,
        category: 'premade'
      }))
    }

    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.status}`)
      }

      const data = await response.json()
      return data.voices || []
    } catch (error) {
      console.error('Failed to fetch ElevenLabs voices:', error)
      return []
    }
  }

  /**
   * Get voice details and settings
   */
  async getVoiceDetails(voiceId: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API key is required')
    }

    try {
      const response = await fetch(`${this.baseUrl}/voices/${voiceId}`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch voice details: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to fetch voice details:', error)
      throw error
    }
  }

  /**
   * Create custom voice clone (Enterprise feature)
   */
  async createVoiceClone(request: VoiceCloneRequest): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API key is required for voice cloning')
    }

    try {
      const formData = new FormData()
      formData.append('name', request.name)
      
      if (request.description) {
        formData.append('description', request.description)
      }

      // Add audio files
      request.files.forEach((file, index) => {
        formData.append(`files`, file)
      })

      // Add labels if provided
      if (request.labels) {
        formData.append('labels', JSON.stringify(request.labels))
      }

      const response = await fetch(`${this.baseUrl}/voices/add`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey
        },
        body: formData
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Voice cloning failed: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      return result.voice_id
    } catch (error) {
      console.error('Voice cloning failed:', error)
      throw error
    }
  }

  /**
   * Get account usage and limits
   */
  async getUsageStats(): Promise<{
    character_count: number
    character_limit: number
    can_extend_character_limit: boolean
    allowed_to_extend_character_limit: boolean
    next_character_count_reset_unix: number
    voice_limit: number
    max_voice_add_edits: number
    voice_add_edit_counter: number
    professional_voice_limit: number
    can_extend_voice_limit: boolean
    can_use_instant_voice_cloning: boolean
    can_use_professional_voice_cloning: boolean
    currency: string
    status: string
  }> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API key is required')
    }

    try {
      const response = await fetch(`${this.baseUrl}/user`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch usage stats: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to fetch usage stats:', error)
      throw error
    }
  }

  /**
   * Optimize text for better speech synthesis
   */
  private optimizeTextForSpeech(text: string): string {
    return text
      // Handle common abbreviations
      .replace(/\bAI\b/g, 'A I')
      .replace(/\bUI\b/g, 'U I')
      .replace(/\bAPI\b/g, 'A P I')
      .replace(/\bURL\b/g, 'U R L')
      .replace(/\bCEO\b/g, 'C E O')
      .replace(/\bCTO\b/g, 'C T O')
      
      // Handle website URLs
      .replace(/\.com\b/g, ' dot com')
      .replace(/\.ai\b/g, ' dot A I')
      .replace(/\.org\b/g, ' dot org')
      .replace(/\.net\b/g, ' dot net')
      
      // Handle common contractions for more natural speech
      .replace(/\bcan't\b/g, 'cannot')
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bI'm\b/g, 'I am')
      .replace(/\byou're\b/g, 'you are')
      .replace(/\bwe're\b/g, 'we are')
      .replace(/\bthey're\b/g, 'they are')
      .replace(/\bit's\b/g, 'it is')
      .replace(/\bthat's\b/g, 'that is')
      
      // Handle numbers and currency
      .replace(/\$(\d+)/g, '$1 dollars')
      .replace(/\b(\d+)%/g, '$1 percent')
      
      // Clean up extra whitespace
      .replace(/\s+/g, ' ')
      .trim()
  }

  /**
   * Test voice synthesis with sample text
   */
  async testVoice(voiceId: string = ElevenLabsService.VOICES.BELLA): Promise<{
    success: boolean
    audioUrl?: string
    error?: string
    voiceName?: string
  }> {
    const testText = "Hello! This is a test of the REMODELY AI voice system. I'm here to help you find the perfect contractor for your home remodeling project."

    try {
      const audioUrl = await this.generateSpeech(testText, voiceId)
      
      // Get voice name
      const voices = await this.getAvailableVoices()
      const voice = voices.find(v => v.voice_id === voiceId)
      
      return {
        success: true,
        audioUrl,
        voiceName: voice?.name || 'Unknown Voice'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Generate voice for contractor recruitment call
   */
  async generateContractorRecruitmentCall(
    contractorName: string,
    projectType: string,
    estimatedValue: number,
    location: string
  ): Promise<string> {
    const script = `
      Hi ${contractorName}! This is David from REMODELY AI, the premier home remodeling marketplace.

      I'm reaching out because we have an exciting ${projectType} project in ${location} 
      with an estimated value of $${estimatedValue.toLocaleString()}.

      Our AI system identified you as an ideal match based on your expertise, location, 
      and outstanding customer reviews.

      The homeowner is ready to move forward quickly, and we'd love to connect you with 
      this opportunity.

      I'll be sending you the full project details via text message right after this call. 
      You can review everything and submit your competitive quote through our platform.

      Thanks for being part of the REMODELY AI contractor network. We're here to help 
      you grow your business with quality leads and satisfied customers.

      Visit REMODELY dot AI to access your contractor dashboard and view this opportunity.
    `

    return await this.generateSpeech(script, ElevenLabsService.VOICES.ADAM)
  }

  /**
   * Generate voice for customer consultation
   */
  async generateCustomerConsultationCall(
    customerName: string,
    projectType: string,
    matchCount: number
  ): Promise<string> {
    const script = `
      Hi ${customerName}! This is Sarah from REMODELY AI, your personal remodeling consultant.

      I'm calling about your ${projectType} project. Great news - our AI matching system 
      has found ${matchCount} excellent contractors in your area who specialize in exactly 
      what you're looking for.

      These aren't just any contractors. Each one has been verified, has outstanding reviews, 
      and matches your specific project requirements and budget preferences.

      I'd love to walk you through your personalized matches and help you understand why 
      each contractor is perfect for your project.

      You can view all your matches right now at REMODELY dot AI, or I can text you 
      the details immediately.

      Our goal is to make your remodeling project as smooth and successful as possible. 
      That's why we use AI to ensure you're only connected with contractors who are 
      the absolute best fit.

      Would you like me to send you the contractor profiles and quotes right now?
    `

    return await this.generateSpeech(script, ElevenLabsService.VOICES.BELLA)
  }
}

export default ElevenLabsService
