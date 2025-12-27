import React, { useState } from 'react';
import { Game, PatchNotes, GroundingSource } from './types';
import GameSelector from './components/GameSelector';
import PatchViewer from './components/PatchViewer';
import LoadingSkeleton from './components/LoadingSkeleton';
import { fetchLatestPatchNotes } from './services/geminiService';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [patchData, setPatchData] = useState<PatchNotes | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGameSelect = async (game: Game) => {
    setSelectedGame(game);
    setPatchData(null);
    setSources([]);
    setError(null);
    setIsLoading(true);

    try {
      const result = await fetchLatestPatchNotes(game.name);
      
      if (result.error) {
        setError(result.error);
      } else {
        setPatchData(result.data);
        setSources(result.sources);
      }
    } catch (err) {
      setError("An unexpected error occurred while processing the neural response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedGame(null);
    setPatchData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-nexus-accent selection:text-black">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center cursor-pointer group" onClick={handleBack}>
              <div className="w-10 h-10 bg-gradient-to-br from-nexus-accent to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-shadow duration-300">
                <span className="text-white font-black font-mono text-xl">N</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-tight block leading-none">NEXUS</span>
                <span className="text-nexus-accent text-[10px] tracking-[0.3em] font-mono">PATCH HUB</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-gray-400 text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Systems Online
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedGame ? (
          <div className="animate-fade-in-up">
            
            {/* Hero Section */}
            <div className="text-center mb-20 pt-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-nexus-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
              
              <h1 className="relative text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-tight drop-shadow-2xl">
                STAY AHEAD OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-accent via-white to-nexus-accent animate-shimmer bg-[length:200%_auto]">THE META</span>
              </h1>
              
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-nexus-gold to-transparent mx-auto mb-8"></div>
              
              <p className="relative text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                Elite-level patch intelligence powered by Gemini 3.0. <br />
                <span className="text-gray-500">Analyze changes. Adapt your strategy. Dominate.</span>
              </p>
            </div>

            <GameSelector onSelect={handleGameSelect} selectedId={null} />
          </div>
        ) : (
          <div>
            {isLoading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500 text-3xl border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  ⚠
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">System Malfunction</h3>
                <p className="text-gray-400 max-w-md mb-8 leading-relaxed border-l-2 border-red-500/30 pl-4">{error}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleGameSelect(selectedGame)}
                    className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-lg transition-all font-bold tracking-wide hover:scale-105"
                  >
                    RETRY UPLINK
                  </button>
                  <button 
                     onClick={handleBack}
                     className="px-8 py-3 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-lg transition-all font-medium"
                  >
                    ABORT
                  </button>
                </div>
              </div>
            ) : patchData ? (
              <PatchViewer 
                patch={patchData} 
                sources={sources} 
                onBack={handleBack} 
              />
            ) : null}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 mt-auto py-12 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 text-white/20">
             <span className="w-1 h-1 rounded-full bg-white/20"></span>
             <span className="w-1 h-1 rounded-full bg-white/20"></span>
             <span className="w-1 h-1 rounded-full bg-white/20"></span>
          </div>
          <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
            Nexus Patch Hub // v3.0.1
          </p>
          <p className="text-gray-700 text-xs mt-4">
            Powered by Google Gemini // Built for Gamers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
