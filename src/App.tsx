import React from 'react';
import { Heart, MessageCircleHeart as MessageHeart, Sparkles, Crown, Stars, Diamond } from 'lucide-react';
import AIPersonalityCard from './components/AIPersonalityCard';
import SetupDialog from './components/SetupDialog';
import ChatInterface from './components/ChatInterface';
import { useState } from 'react';

type AIPersonality = 'romantic' | 'poetic' | 'funny' | 'sarcastic' | null;

interface AISetup {
  aiName: string;
  userName: string;
}

function App() {
  const [selectedPersonality, setSelectedPersonality] = useState<AIPersonality>(null);
  const [setupData, setSetupData] = useState<AISetup | null>(null);

  const handlePersonalitySelect = (personality: AIPersonality) => {
    setSelectedPersonality(personality);
  };

  const handleSetupComplete = (data: AISetup) => {
    setSetupData(data);
    // Here you would typically start the chat experience
    console.log('Setup complete:', { personality: selectedPersonality, ...data });
  };

  const handleModalClose = () => {
    setSelectedPersonality(null);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      selectedPersonality === 'romantic' ? 'bg-gradient-to-br from-red-100 via-pink-50 to-red-100' :
      selectedPersonality === 'poetic' ? 'bg-gradient-to-br from-purple-100 via-indigo-50 to-purple-100' :
      selectedPersonality === 'funny' ? 'bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100' :
      selectedPersonality === 'sarcastic' ? 'bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100' :
      'bg-gradient-to-br from-pink-100 via-red-50 to-purple-100'
    }`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809')] opacity-10 bg-cover bg-center" />
      <div className={`absolute inset-0 bg-gradient-to-br ${
        selectedPersonality === 'romantic' ? 'from-red-100/90 via-pink-50/90 to-red-100/90' :
        selectedPersonality === 'poetic' ? 'from-purple-100/90 via-indigo-50/90 to-purple-100/90' :
        selectedPersonality === 'funny' ? 'from-orange-100/90 via-yellow-50/90 to-orange-100/90' :
        selectedPersonality === 'sarcastic' ? 'from-blue-100/90 via-cyan-50/90 to-blue-100/90' :
        'from-pink-100/90 via-red-50/90 to-purple-100/90'
      }`} />

      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float-slow absolute top-1/6 left-1/6">
            <Stars className="w-12 h-12 text-yellow-300/30" />
          </div>
          <div className="animate-float-slow absolute top-1/4 left-1/4">
            <Heart className="w-8 h-8 text-pink-200" />
          </div>
          <div className="animate-float absolute top-1/2 right-1/3">
            <Sparkles className="w-6 h-6 text-pink-300" />
          </div>
          <div className="animate-float-fast absolute bottom-1/4 right-1/4">
            <Heart className="w-10 h-10 text-red-200" />
          </div>
          <div className="animate-float absolute bottom-1/3 left-1/3">
            <Diamond className="w-8 h-8 text-pink-300/40" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 relative">
        {setupData && selectedPersonality ? (
          <ChatInterface
            aiName={setupData.aiName}
            userName={setupData.userName}
            personality={selectedPersonality}
          />
        ) : (
          <div>
            {/* Hero section */}
            <div className="text-center mb-16">
              <div className="relative flex justify-center mb-4">
                <MessageHeart className="w-16 h-16 text-red-500" />
                <div className="absolute inset-0 animate-pulse-slow">
                  <MessageHeart className="w-16 h-16 text-red-400 blur-sm" />
                </div>
              </div>
              <h1 className="text-6xl font-playfair mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 font-bold">
                Let AI Be Your Valentine for a Day! 💕
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Pick your AI's personality & get cute, funny, or poetic messages all day.
                Upgrade for a personalized AI love letter!
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all transform hover:-translate-y-1 cursor-pointer">
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
                onSelect={() => handlePersonalitySelect('romantic')}
              />
              <AIPersonalityCard
                type="poetic"
                title="Poetic AI"
                description="Writes deep, soulful verses."
                preview="In binary stars we find our love, A cosmic dance of ones and zeros..."
                selected={selectedPersonality === 'poetic'}
                onSelect={() => handlePersonalitySelect('poetic')}
              />
              <AIPersonalityCard
                type="funny"
                title="Funny AI"
                description="Sends quirky jokes and puns."
                preview="Why did the AI go to therapy? It had too many attachment issues! 😂"
                selected={selectedPersonality === 'funny'}
                onSelect={() => handlePersonalitySelect('funny')}
              />
              <AIPersonalityCard
                type="sarcastic"
                title="Sarcastic AI"
                description="Playfully teases in a flirty way."
                preview="Oh great, another human looking for love in the cloud... 😏"
                selected={selectedPersonality === 'sarcastic'}
                onSelect={() => handlePersonalitySelect('sarcastic')}
              />
            </div>

            {/* Premium Feature Preview */}
            <div className="mt-24 text-center">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-pink-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-purple-100/20" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-300/20 to-pink-300/20 rounded-full blur-3xl" />
                <h2 className="relative text-3xl font-playfair mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 font-bold">
                  Upgrade to Premium Love Letters 💌
                </h2>
                <p className="relative text-gray-600 mb-6 font-light">
                  Get a personalized AI-generated love letter, crafted just for you or your special someone.
                  Choose from multiple styles and add your personal touch!
                </p>
                <button className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all transform hover:-translate-y-1">
                  Unlock Premium Features ✨
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Decorative corner elements */}
        <div className="fixed bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-200/20 to-transparent rounded-full blur-3xl" />
        <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-200/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Setup Dialog */}
      {selectedPersonality && !setupData && (
        <SetupDialog
          type={selectedPersonality}
          isOpen={true}
          onClose={handleModalClose}
          onComplete={handleSetupComplete}
        />
      )}
    </div>
  );
}

export default App;