import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

interface SetupDialogProps {
  type: 'romantic' | 'poetic' | 'funny' | 'sarcastic';
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { aiName: string; userName: string }) => void;
}

const typeDetails = {
  romantic: {
    title: 'Your Romantic AI Partner',
    description: 'Sweet, caring, and full of love.',
    icon: Heart,
    gradient: 'from-red-500 to-pink-500',
  },
  poetic: {
    title: 'Your Poetic AI Muse',
    description: 'Eloquent verses from the digital heart.',
    icon: Sparkles,
    gradient: 'from-purple-500 to-indigo-500',
  },
  funny: {
    title: 'Your Comedy AI Companion',
    description: 'Laughter and joy in every message.',
    icon: Heart,
    gradient: 'from-orange-500 to-yellow-500',
  },
  sarcastic: {
    title: 'Your Witty AI Partner',
    description: 'Sharp wit with a heart of gold.',
    icon: Heart,
    gradient: 'from-blue-500 to-cyan-500',
  },
};

const SetupDialog: React.FC<SetupDialogProps> = ({
  type,
  isOpen,
  onClose,
  onComplete,
}) => {
  const [aiName, setAiName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const details = typeDetails[type];
  const Icon = details.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiName.trim() && userName.trim()) {
      onComplete({ aiName, userName });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Add click handler to backdrop for closing */}
      <div className="absolute inset-0" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-lg relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${details.gradient}`} />
        
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${details.gradient} text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-gray-800">
              {details.title}
            </h2>
          </div>
          
          <p className="text-gray-600 mb-8">
            {details.description} Let's get to know each other better! 💝
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="aiName" className="block text-sm font-medium text-gray-700">
                What would you like to name your AI Valentine?
              </label>
              <input
                type="text"
                id="aiName"
                value={aiName}
                onChange={(e) => setAiName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                placeholder="Choose a name..."
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                And what's your name?
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                placeholder="Enter your name..."
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${
                details.gradient
              } text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 ${
                !(aiName.trim() && userName.trim()) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={!(aiName.trim() && userName.trim())}
            >
              Start Your AI Valentine Experience ✨
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupDialog;