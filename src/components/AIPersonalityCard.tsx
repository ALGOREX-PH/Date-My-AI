import React from 'react';
import { Heart, Feather, Laugh, MessageCircle } from 'lucide-react';

type AIPersonalityType = 'romantic' | 'poetic' | 'funny' | 'sarcastic';
/*

Coded by Danielle Bagaforo Meer
Lets Connect : https://www.linkedin.com/in/algorexph

*/
interface AIPersonalityCardProps {
  type: AIPersonalityType;
  title: string;
  description: string;
  preview: string;
  selected: boolean;
  onSelect: () => void;
}

const iconMap = {
  romantic: Heart,
  poetic: Feather,
  funny: Laugh,
  sarcastic: MessageCircle,
};

const colorMap = {
  romantic: 'text-red-500',
  poetic: 'text-purple-500',
  funny: 'text-orange-500',
  sarcastic: 'text-blue-500',
};

const AIPersonalityCard: React.FC<AIPersonalityCardProps> = ({
  type,
  title,
  description,
  preview,
  selected,
  onSelect,
}) => {
  const Icon = iconMap[type];
  const iconColor = colorMap[type];

  return (
    <div
      className={`relative overflow-hidden group cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] ${
        selected
          ? 'bg-white/95 shadow-2xl scale-105'
          : 'bg-white/80 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]'
      } backdrop-blur-sm rounded-xl p-6`}
      onClick={onSelect}
    >
      {/* Background decoration */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 transition-transform duration-300 group-hover:scale-150 ${
          selected ? 'scale-150' : ''
        }`}
      >
        <Icon className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative">
        <Icon className={`w-12 h-12 mb-4 ${iconColor}`} />
        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">{title}</h3>
        <p className="text-gray-600 mb-4 font-light">{description}</p>
        
        {/* Preview message */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 text-sm text-gray-700 shadow-inner">
          <p className="italic">{preview}</p>
        </div>

        {/* Selection indicator */}
        {selected && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-400 to-green-500 text-white p-2 rounded-full shadow-lg animate-pulse">
            <Heart className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPersonalityCard;