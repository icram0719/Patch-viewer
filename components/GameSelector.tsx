import React, { useState, useMemo } from 'react';
import { Game } from '../types';
import { SUPPORTED_GAMES } from '../constants';

interface GameSelectorProps {
  onSelect: (game: Game) => void;
  selectedId: string | null;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onSelect, selectedId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = useMemo(() => {
    return SUPPORTED_GAMES.filter(game => 
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-16 relative group">
        <div className="absolute inset-0 bg-nexus-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative glass-panel rounded-full flex items-center p-1 border border-white/10 group-focus-within:border-nexus-accent/50 group-focus-within:ring-2 ring-nexus-accent/20 transition-all duration-300">
          <div className="pl-4 text-gray-400 group-focus-within:text-nexus-accent transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-3 outline-none font-medium"
            placeholder="Find your game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="pr-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredGames.map((game, index) => {
            const isSelected = selectedId === game.id;
            return (
              <button
                key={game.id}
                onClick={() => onSelect(game)}
                className={`
                  relative group overflow-hidden rounded-2xl transition-all duration-500 ease-out
                  ${isSelected ? 'ring-2 ring-nexus-accent scale-105 shadow-[0_0_30px_rgba(0,240,255,0.3)]' : 'hover:scale-[1.02] hover:ring-1 hover:ring-nexus-gold/50 hover:shadow-2xl'}
                  glass-panel animate-fade-in-up
                `}
                style={{ 
                  height: '320px',
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Image Container */}
                <div className="absolute inset-0 z-0 bg-nexus-900">
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-100 grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-nexus-800', 'to-nexus-950');
                      // Create a fallback title or icon element if needed, but the parent bg change is subtle enough.
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nexus-950 via-nexus-900/80 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 items-start text-left">
                  <div className="w-full transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                    <h3 className={`text-2xl font-black font-sans tracking-tight mb-2 ${isSelected ? 'text-nexus-accent' : 'text-white'} group-hover:text-nexus-gold transition-colors drop-shadow-lg`}>
                      {game.name}
                    </h3>
                    
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <p className="text-gray-300 text-xs font-mono mt-2 mb-4">
                        Analyze latest meta & balance changes
                      </p>
                      <div className="flex items-center text-nexus-accent text-xs font-bold tracking-widest uppercase">
                        View Intelligence <span className="ml-2">→</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Border glow effect */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl z-30 pointer-events-none group-hover:border-nexus-gold/30 transition-colors"></div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 animate-fade-in-up">
          <div className="text-6xl mb-4 opacity-30">👾</div>
          <h3 className="text-2xl font-bold text-white mb-2">No Games Found</h3>
          <p className="text-gray-400">We haven't indexed patch data for "{searchQuery}" yet.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-6 text-nexus-accent hover:text-white transition-colors underline underline-offset-4"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSelector;