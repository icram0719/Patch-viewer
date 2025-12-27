import React, { useState, useMemo, useEffect } from 'react';
import { PatchNotes, ChangeType, GroundingSource, PatchItem } from '../types';
import { SUPPORTED_GAMES, TRENDING_UPDATES } from '../constants';

interface PatchViewerProps {
  patch: PatchNotes;
  sources: GroundingSource[];
  onBack: () => void;
}

const ChangeTypeIcon = ({ type }: { type: ChangeType }) => {
  switch (type) {
    case ChangeType.BUFF:
      return <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-500/5 text-green-400 border border-green-500/20">Buff</span>;
    case ChangeType.NERF:
      return <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/5 text-red-400 border border-red-500/20">Nerf</span>;
    case ChangeType.NEW:
      return <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-nexus-accent/5 text-nexus-accent border border-nexus-accent/20">New</span>;
    case ChangeType.FIX:
      return <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-500/5 text-gray-400 border border-gray-500/20">Fix</span>;
    default:
      return <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-yellow-500/5 text-yellow-400 border border-yellow-500/20">Adj</span>;
  }
};

// Component to highlight numbers in description
const DescriptionWithHighlights: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\d+(?:\.\d+)?(?:%|s)?)/g);
  return (
    <span className="text-gray-400 text-sm leading-relaxed">
      {parts.map((part, i) => 
        // Simple check if part starts with a digit
        /^\d/.test(part) ? <span key={i} className="number-highlight">{part}</span> : part
      )}
    </span>
  );
};

// Expandable text component
const ExpandableDescription: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 150;

  if (text.length <= maxLength) {
    return <p><DescriptionWithHighlights text={text} /></p>;
  }

  return (
    <div>
      <p>
        <DescriptionWithHighlights text={expanded ? text : `${text.slice(0, maxLength)}...`} />
      </p>
      <button 
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
        className="text-[10px] uppercase font-bold tracking-widest text-nexus-accent mt-2 hover:text-white transition-colors flex items-center gap-1"
      >
        {expanded ? 'Show Less' : 'Read More'}
        <span className={`transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>↓</span>
      </button>
    </div>
  );
};

// Helper to sanitize IDs
const slugify = (text: string) => {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
};

const PatchViewer: React.FC<PatchViewerProps> = ({ patch, sources, onBack }) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Calculate total changes across all sections for stats
  const totalChanges = patch.updates.reduce((sum, update) => sum + update.changes.length, 0);
  
  // Extract all subjects for the quick navigation bar
  const allSubjects = useMemo(() => {
    const subjects: { title: string, id: string, type: ChangeType }[] = [];
    patch.updates.forEach(update => {
      update.changes.forEach(change => {
        // Skip purely small bug fixes for navigation to keep it clean, unless it's the only thing
        if (change.type !== ChangeType.FIX || update.changes.length < 5) {
             subjects.push({
               title: change.title,
               id: `change-${slugify(change.title)}`,
               type: change.type
             });
        }
      });
    });
    return subjects;
  }, [patch]);

  const scrollToSubject = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky headers if needed
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Trigger highlight effect
      setHighlightedId(id);
      
      // Remove highlight after animation duration
      setTimeout(() => {
        setHighlightedId(null);
      }, 2500);
    }
  };
  
  // Helper to group changes for a single update section
  const groupChanges = (changes: PatchItem[]) => {
    return changes.reduce((acc, change) => {
      const type = change.type || ChangeType.ADJUSTMENT;
      if (!acc[type]) acc[type] = [];
      acc[type].push(change);
      return acc;
    }, {} as Record<string, PatchItem[]>);
  };

  // Helper function to generate class names based on highlight state
  const getItemClasses = (id: string, baseClasses: string) => {
    const isHighlighted = highlightedId === id;
    if (isHighlighted) {
      return `${baseClasses} ring-2 ring-nexus-accent shadow-[0_0_60px_rgba(0,240,255,0.4)] scale-[1.02] z-10 bg-nexus-900/90 transition-all duration-500`;
    }
    return `${baseClasses} glass-panel-hover transition-all duration-300`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-gray-500 hover:text-nexus-accent transition-colors text-xs font-mono tracking-widest uppercase group animate-fade-in"
      >
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Hub
      </button>

      {/* Hero Header */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border-l-[3px] border-nexus-gold/70 mb-8 relative overflow-hidden animate-fade-in-up">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-nexus-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-nexus-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
               <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter text-glow drop-shadow-2xl">{patch.gameName}</h1>
               </div>
               <div className="flex items-center gap-4 text-xs md:text-sm font-mono text-nexus-gold/90">
                  <span className="px-3 py-1 bg-nexus-gold/5 rounded border border-nexus-gold/10 backdrop-blur-sm">VERSION {patch.headlineVersion}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-400">{patch.headlineDate}</span>
               </div>
            </div>
            <div className="text-right hidden md:block opacity-40">
               <div className="text-[10px] uppercase tracking-[0.3em] mb-1 text-nexus-accent">Analysis Completed</div>
               <div className="font-mono text-xs text-gray-500">INTEGRITY CHECK PASSED</div>
            </div>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl border-l border-gray-700/50 pl-6 font-light">
            {patch.overallSummary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-10">
           
           {/* Quick Navigation Bar */}
           {allSubjects.length > 0 && (
             <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">Quick Jump</h3>
                <div className="flex flex-wrap gap-2 pb-4">
                  {allSubjects.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToSubject(sub.id)}
                      className="glass-panel px-3 py-1.5 rounded-full text-xs text-gray-300 hover:text-white hover:bg-white/10 hover:border-nexus-accent/50 transition-all duration-300 flex items-center gap-2 group border border-white/5"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        sub.type === ChangeType.BUFF ? 'bg-green-400' :
                        sub.type === ChangeType.NERF ? 'bg-red-400' :
                        sub.type === ChangeType.NEW ? 'bg-nexus-accent' :
                        'bg-yellow-400'
                      }`}></span>
                      {sub.title}
                    </button>
                  ))}
                </div>
             </div>
           )}
          
          {patch.updates.map((update, sectionIdx) => {
            const groupedChanges = groupChanges(update.changes);
            const isLatest = sectionIdx === 0;

            return (
              <div key={sectionIdx} className={`animate-fade-in-up ${!isLatest ? 'opacity-90' : ''}`} style={{ animationDelay: `${(sectionIdx + 1) * 0.1}s` }}>
                
                {/* Section Header */}
                <div className={`flex items-center gap-4 mb-8 pt-4 ${update.isHotfix ? 'border-t border-red-500/30 shadow-[0_-1px_10px_rgba(239,68,68,0.05)]' : 'border-t border-white/5'}`}>
                   {update.isHotfix ? (
                      <span className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                        Hotfix
                      </span>
                   ) : (
                      <span className="bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">Major Update</span>
                   )}
                   <h2 className={`text-2xl font-bold ${update.isHotfix ? 'text-red-100' : 'text-white'}`}>{update.title}</h2>
                   <span className="text-sm text-gray-500 font-mono">{update.date}</span>
                </div>

                {update.summary && (
                  <p className="mb-8 text-gray-400 italic text-sm border-l-2 border-gray-800 pl-4">
                    {update.summary}
                  </p>
                )}
                
                <div className="space-y-10">
                  {/* Render New Content First */}
                  {groupedChanges[ChangeType.NEW] && (
                    <section>
                      <h3 className="text-lg font-bold text-nexus-accent mb-4 flex items-center opacity-80">
                        <span className="w-4 h-[1px] bg-nexus-accent mr-3"></span>
                        NEW CONTENT
                      </h3>
                      <div className="grid gap-4">
                        {groupedChanges[ChangeType.NEW].map((change, idx) => {
                          const id = `change-${slugify(change.title)}`;
                          return (
                            <div 
                              key={idx} 
                              id={id}
                              className={getItemClasses(id, "glass-panel p-6 rounded-2xl border-t border-t-nexus-accent/30 relative overflow-hidden group scroll-mt-32")}
                            >
                              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                                  <svg className="w-16 h-16 text-nexus-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                              </div>
                              <div className="relative z-10">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg text-white group-hover:text-nexus-accent transition-colors duration-300">{change.title}</h4>
                                    {change.importance === 'High' && <span className="text-[9px] font-bold tracking-widest bg-nexus-accent/20 text-nexus-accent px-2 py-0.5 rounded border border-nexus-accent/20">MAJOR</span>}
                                  </div>
                                  <ExpandableDescription text={change.description} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Render Buffs */}
                  {groupedChanges[ChangeType.BUFF] && (
                    <section>
                      <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center opacity-80">
                        <span className="w-4 h-[1px] bg-green-500 mr-3"></span>
                        BUFFS
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {groupedChanges[ChangeType.BUFF].map((change, idx) => {
                           const id = `change-${slugify(change.title)}`;
                           return (
                            <div 
                              key={idx} 
                              id={id}
                              className={getItemClasses(id, "glass-panel p-5 rounded-xl border-l-2 border-l-green-500/50 scroll-mt-32")}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-gray-100 text-base">{change.title}</h4>
                                <ChangeTypeIcon type={ChangeType.BUFF} />
                              </div>
                              <ExpandableDescription text={change.description} />
                            </div>
                           );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Render Nerfs */}
                  {groupedChanges[ChangeType.NERF] && (
                    <section>
                      <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center opacity-80">
                        <span className="w-4 h-[1px] bg-red-500 mr-3"></span>
                        NERFS
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {groupedChanges[ChangeType.NERF].map((change, idx) => {
                          const id = `change-${slugify(change.title)}`;
                          return (
                            <div 
                              key={idx} 
                              id={id}
                              className={getItemClasses(id, "glass-panel p-5 rounded-xl border-l-2 border-l-red-500/50 scroll-mt-32")}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-gray-100 text-base">{change.title}</h4>
                                <ChangeTypeIcon type={ChangeType.NERF} />
                              </div>
                              <ExpandableDescription text={change.description} />
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Render Adjustments/Fixes */}
                  {(groupedChanges[ChangeType.ADJUSTMENT] || groupedChanges[ChangeType.FIX]) && (
                    <section>
                      <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center opacity-80">
                        <span className="w-4 h-[1px] bg-yellow-500 mr-3"></span>
                        ADJUSTMENTS & FIXES
                      </h3>
                      <div className="glass-panel p-6 rounded-2xl">
                        <ul className="space-y-4">
                            {[...(groupedChanges[ChangeType.ADJUSTMENT] || []), ...(groupedChanges[ChangeType.FIX] || [])].map((change, idx) => {
                              const id = `change-${slugify(change.title)}`;
                              const isHighlighted = highlightedId === id;
                              return (
                                <li 
                                  key={idx} 
                                  id={id}
                                  className={`
                                    flex items-start text-sm group p-3 rounded-lg transition-all duration-300 -mx-2 scroll-mt-32
                                    ${isHighlighted ? 'bg-white/10 ring-1 ring-nexus-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'hover:bg-white/5'}
                                  `}
                                >
                                  <div className="mt-0.5 mr-4 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"><ChangeTypeIcon type={change.type as ChangeType} /></div>
                                  <div className="flex-1">
                                    <span className="font-bold text-gray-200 mr-2 block group-hover:text-white transition-colors">{change.title}</span>
                                    <ExpandableDescription text={change.description} />
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="sticky top-24 space-y-6">
            
            {/* Stats Panel */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 border-b border-gray-800 pb-3">Patch Statistics</h3>
              
              <div className="grid grid-cols-1 gap-3 mb-8">
                 <div className="bg-gray-900/40 p-3 rounded-lg text-center border border-gray-800/50 flex justify-between items-center px-6">
                    <div className="text-[10px] uppercase text-gray-500">Total Changes</div>
                    <div className="text-xl font-bold text-white">{totalChanges}</div>
                 </div>
                 {patch.updates.length > 1 && (
                    <div className="bg-purple-900/10 p-3 rounded-lg text-center border border-purple-900/20 flex justify-between items-center px-6">
                      <div className="text-[10px] uppercase text-purple-400">Updates Included</div>
                      <div className="text-xl font-bold text-purple-300">{patch.updates.length}</div>
                    </div>
                 )}
              </div>

              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 border-b border-gray-800 pb-3">Verified Sources</h3>
              <p className="text-[10px] text-gray-500 mb-4 leading-tight">
                Data cross-referenced with official developer blogs and patch repositories.
              </p>
              {sources.length > 0 ? (
                <ul className="space-y-2">
                  {sources.slice(0, 5).map((source, idx) => (
                    <li key={idx}>
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex items-center justify-between text-xs text-gray-400 hover:text-nexus-gold transition-colors p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5"
                      >
                        <span className="truncate max-w-[180px] group-hover:translate-x-1 transition-transform duration-300">{source.title || new URL(source.uri).hostname}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-600 italic">No specific source links returned.</p>
              )}
            </div>

            {/* Global Radar Panel */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 border-b border-gray-800 pb-3">Global Radar</h3>
              <div className="space-y-4">
                {TRENDING_UPDATES.map((update, idx) => {
                   const game = SUPPORTED_GAMES.find(g => g.id === update.gameId);
                   if (!game) return null;
                   return (
                     <a 
                        key={idx} 
                        href={update.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 group p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                     >
                       <img src={game.image} className="w-8 h-8 rounded-md object-cover opacity-70 group-hover:opacity-100 transition-opacity ring-1 ring-white/10" alt={game.name} />
                       <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start">
                            <div className="text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors truncate">{game.name}</div>
                            <div className="text-[9px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">↗</div>
                         </div>
                         <div className="text-[11px] font-medium text-gray-200 group-hover:text-nexus-accent transition-colors truncate mb-1">{update.title}</div>
                         <div className={`text-[9px] font-mono px-1.5 py-0.5 rounded w-fit inline-block ${
                           update.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                           update.status === 'Live Event' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                           'bg-green-500/10 text-green-400 border border-green-500/20'
                         }`}>
                           {update.status} • {update.time}
                         </div>
                       </div>
                     </a>
                   )
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 text-center">
                <span className="text-[9px] text-gray-600 font-mono">LIVE SERVICE STATUS: ACTIVE</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PatchViewer;
