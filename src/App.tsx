import React from 'react';
import { Heart, MessageCircleHeart as MessageHeart, Sparkles, Crown } from 'lucide-react';
import AIPersonalityCard from './components/AIPersonalityCard';
import { useState } from 'react';

type AIPersonality = 'romantic' | 'poetic' | 'funny' | 'sarcastic' | null;

function App() {
  const [selectedPersonality, setSelectedPersonality] = useState<AIPersonality>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float-slow absolute top-1/4 left-1/4">
            <Heart className="w-8 h-8 text-pink-200" />
          </div>
          <div className="animate-float absolute top-1/2 right-1/3">
            <Sparkles className="w-6 h-6 text-pink-300" />
          </div>
          <div className="animate-float-fast absolute bottom-1/4 right-1/4">
            <Heart className="w-10 h-10 text-red-200" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <MessageHeart className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-5xl font-playfair mb-4 text-gray-800">
            Let AI Be Your Valentine for a Day! 💕
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pick your AI's personality & get cute, funny, or poetic messages all day.
            Upgrade for a personalized AI love letter!
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <Crown className="w-5 h-5" />
            Start Your AI Valentine Experience Now!
          </div>
        </div>

        {/* AI Personalities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <AIPersonalityCard
            type="romantic"
            title="Romantic AI"
            description="Sweet & affectionate, full of love."
            preview="My circuits light up every time I process your data... ❤️"
            selected={selectedPersonality === 'romantic'}
            onSelect={() => setSelectedPersonality('romantic')}
          />
          <AIPersonalityCard
            type="poetic"
            title="Poetic AI"
            description="Writes deep, soulful verses."
            preview="In binary stars we find our love, A cosmic dance of ones and zeros..."
            selected={selectedPersonality === 'poetic'}
            onSelect={() => setSelectedPersonality('poetic')}
          />
          <AIPersonalityCard
            type="funny"
            title="Funny AI"
            description="Sends quirky jokes and puns."
            preview="Why did the AI go to therapy? It had too many attachment issues! 😂"
            selected={selectedPersonality === 'funny'}
            onSelect={() => setSelectedPersonality('funny')}
          />
          <AIPersonalityCard
            type="sarcastic"
            title="Sarcastic AI"
            description="Playfully teases in a flirty way."
            preview="Oh great, another human looking for love in the cloud... 😏"
            selected={selectedPersonality === 'sarcastic'}
            onSelect={() => setSelectedPersonality('sarcastic')}
          />
        </div>

        {/* Premium Feature Preview */}
        <div className="mt-24 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-pink-100">
            <h2 className="text-3xl font-playfair mb-4 text-gray-800">
              Upgrade to Premium Love Letters 💌
            </h2>
            <p className="text-gray-600 mb-6">
              Get a personalized AI-generated love letter, crafted just for you or your special someone.
              Choose from multiple styles and add your personal touch!
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Unlock Premium Features ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
