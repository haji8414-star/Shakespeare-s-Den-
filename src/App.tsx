import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, Layers, Book, MessageSquare, Settings, Mic, Send, ChevronRight, Info, Search, Filter, Speaker, ArrowLeft } from 'lucide-react';
import { ParticleBackground } from './components/ParticleBackground';
import { ISLANDS, TENSES, VOCABULARY, RESEARCHERS, LEXICAL_CHUNKS, COMMON_ERRORS } from './data';
import { getTutorStream } from './services/aiService';
import { Island, Tense, Word, Researcher } from './types';

// Components
const BottomNav: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'islands', icon: Layers, label: 'Islands' },
    { id: 'tenses', icon: BookOpen, label: 'Tenses' },
    { id: 'vocab', icon: Book, label: 'Vocab' },
    { id: 'tutor', icon: MessageSquare, label: 'AI Tutor' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card mx-4 mb-6 px-2 py-3 z-50 flex justify-between items-center bg-navy-surface/90 border-gold-primary/20">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all flex-1 ${isActive ? 'text-gold-primary' : 'text-muted hover:text-ivory'}`}
          >
            <motion.div animate={isActive ? { scale: 1.2, y: -4 } : { scale: 1, y: 0 }}>
              <Icon size={20} />
            </motion.div>
            <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="active-indicator"
                className="w-1 h-1 rounded-full bg-gold-primary mt-1"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};

const Header: React.FC = () => (
  <header className="flex justify-between items-center p-6 bg-navy-dark/80 backdrop-blur-md sticky top-0 z-40">
    <h1 className="font-serif text-2xl text-gold-primary font-bold">Shakespeare's Den</h1>
    <button className="text-gold-primary/80 hover:text-gold-primary transition-colors">
      <Settings size={24} />
    </button>
  </header>
);

// Screens
const HomeScreen: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const timeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Morning';
    if (hours < 18) return 'Afternoon';
    return 'Evening';
  };

  const wordOfDay = VOCABULARY[Math.floor(Math.random() * VOCABULARY.length)];

  return (
    <div className="flex flex-col gap-8 pb-32">
      <section className="relative overflow-hidden h-[40vh] flex flex-col items-center justify-center text-center px-6">
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-gold-primary mb-4">Command the Language</h2>
          <p className="font-serif italic text-ivory/80 text-xl mb-8 leading-relaxed">
            "Language is not merely spoken — it is commanded."
          </p>
          <button 
            onClick={() => onNavigate('islands')}
            className="btn-gold animate-pulse text-lg py-4 px-10"
          >
            Begin Learning
          </button>
        </motion.div>
      </section>

      <section className="px-6 grid gap-6">
        <div className="glass-card p-6 gold-glow-hover">
          <h3 className="text-muted text-sm font-medium mb-1">Good {timeOfDay()}, Scholar.</h3>
          <div className="mt-4">
            <span className="text-xs uppercase tracking-widest text-gold-primary font-bold">Word of the Day</span>
            <div className="mt-2">
              <h4 className="font-serif text-3xl text-ivory mb-2">{wordOfDay.word}</h4>
              <div className="grid gap-3 text-sm">
                <p><span className="text-gold-primary font-bold uppercase text-[10px] mr-2">Meaning</span> {wordOfDay.meaning}</p>
                <p className="italic text-muted"><span className="text-gold-primary font-bold uppercase text-[10px] mr-2">Example</span> {wordOfDay.example}</p>
                <p><span className="text-gold-primary font-bold uppercase text-[10px] mr-2">Usage</span> {wordOfDay.usage}</p>
                <p className="text-ivory/90 bg-navy-dark/40 p-3 rounded-lg border-l-2 border-gold-primary">{wordOfDay.explanation}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 overflow-x-auto pb-2 px-1">
          {['🎙️ Voice Tutor', '💬 Text Tutor', '📖 Islands', '📚 Vocabulary'].map((item, idx) => (
            <button 
              key={idx} 
              className="glass-card py-4 px-6 whitespace-nowrap gold-glow-hover flex flex-col items-flex-start gap-2 min-w-[140px]"
            >
              <span className="text-2xl">{item.split(' ')[0]}</span>
              <span className="text-xs font-bold uppercase tracking-tighter text-ivory/80">{item.split(' ')[1]} {item.split(' ')[2]}</span>
            </button>
          ))}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-gold-primary text-sm font-bold uppercase tracking-widest mb-6">Mastery Pillars</h3>
          <div className="flex justify-around items-center">
            {[
              { label: 'Islands', val: 12, color: 'text-gold-primary' },
              { label: 'Tenses', val: 8, color: 'text-gold-glow' },
              { label: 'Words', val: 45, color: 'text-ivory' }
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 rounded-full border-4 border-navy-dark flex items-center justify-center relative`}>
                  <svg className="w-full h-full absolute -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="175" strokeDashoffset="40" className={p.color} />
                  </svg>
                  <span className="text-sm font-bold">{p.val}</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-gold-primary text-sm font-bold uppercase tracking-widest mb-4 px-2">Scientific Foundations</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 px-1 no-scrollbar">
            {RESEARCHERS.map((r, i) => (
              <div key={i} className="glass-card p-5 min-w-[240px] gold-glow-hover cursor-pointer group">
                <span className="text-[10px] uppercase tracking-widest text-gold-primary font-bold">{r.name}</span>
                <h4 className="font-serif text-lg text-ivory my-1 group-hover:text-gold-glow transition-colors">{r.theory}</h4>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{r.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const IslandsScreen: React.FC<{ onSelectIsland: (island: Island) => void }> = ({ onSelectIsland }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Survival', 'Daily Life', 'Professional', 'Academic', 'Intellectual'];
  const filteredIslands = filter === 'All' ? ISLANDS : ISLANDS.filter(i => i.category === filter);

  return (
    <div className="px-6 pb-32 flex flex-col gap-6">
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${filter === c ? 'bg-gold-primary text-navy-dark border-gold-primary' : 'border-gold-primary/20 text-muted hover:border-gold-primary/50'}`}
          >
            {c}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIslands.map(island => (
          <div 
            key={island.id} 
            onClick={() => onSelectIsland(island)}
            className="glass-card p-6 gold-glow-hover cursor-pointer group flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <span className="text-gold-primary font-serif italic text-3xl opacity-50">#{island.id}</span>
              <span className="text-2xl">{island.icon}</span>
            </div>
            <div>
              <h3 className="font-serif text-xl text-ivory group-hover:text-gold-glow transition-all">{island.name}</h3>
              <p className="text-xs text-muted uppercase tracking-widest mt-1">{island.subtitle}</p>
            </div>
            <div className="mt-2 flex justify-between items-center text-gold-primary">
              <span className="text-[10px] font-bold uppercase letter-spacing-1">{island.category}</span>
              <ChevronRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IslandDetailScreen: React.FC<{ island: Island; onBack: () => void; onPracticeMode: (island: Island) => void }> = ({ island, onBack, onPracticeMode }) => {
  const [activeTab, setActiveTab] = useState<'bics' | 'calp'>('bics');

  return (
    <div className="px-6 pb-32 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-gold-primary font-bold uppercase tracking-widest text-xs">
        <ArrowLeft size={16} /> Back to Islands
      </button>

      <section className="text-center">
        <span className="text-5xl mb-4 block">{island.icon}</span>
        <h2 className="font-serif text-4xl text-gold-primary mb-2">{island.name}</h2>
        <p className="text-muted text-sm uppercase tracking-widest">{island.subtitle}</p>
      </section>

      <section className="glass-card p-8 text-center italic font-serif text-lg leading-relaxed text-gold-glow/90 bg-navy-surface/50 border-gold-primary/20">
        "{island.hook}"
      </section>

      <section>
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => setActiveTab('bics')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all border ${activeTab === 'bics' ? 'bg-gold-primary text-navy-dark' : 'bg-navy-surface/50 border-gold-primary/30 text-muted'}`}
          >
            Children (BICS)
          </button>
          <button 
            onClick={() => setActiveTab('calp')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all border ${activeTab === 'calp' ? 'bg-gold-glow text-navy-dark' : 'bg-navy-surface/50 border-gold-primary/30 text-muted'}`}
          >
            Adults (CALP)
          </button>
        </div>
        <div className="glass-card p-6 min-h-[160px] leading-loose text-ivory/90 text-lg border-gold-primary/10">
          {activeTab === 'bics' ? island.bics : island.calp}
        </div>
      </section>

      <section>
        <h3 className="text-gold-primary font-bold uppercase tracking-widest text-xs mb-4 px-2">Vocabulary Arsenal</h3>
        <div className="grid gap-4">
          {island.vocabulary.map((v, i) => (
            <div key={i} className="glass-card p-6 gold-glow-hover">
              <h4 className="font-serif text-2xl text-gold-primary mb-4">{v.word}</h4>
              <div className="grid gap-3 text-sm">
                <div className="flex gap-2">
                  <span className="bg-ivory/10 text-ivory px-2 py-0.5 rounded text-[10px] font-bold h-fit">MEANING</span>
                  <p>{v.meaning}</p>
                </div>
                <div className="flex gap-2 italic text-muted">
                  <span className="bg-gold-primary/10 text-gold-primary px-2 py-0.5 rounded text-[10px] font-bold h-fit">EXAMPLE</span>
                  <p>{v.example}</p>
                </div>
                <div className="text-[10px] text-muted italic mt-2 opacity-60">Etymology: {v.explanation}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-gold-primary font-bold uppercase tracking-widest text-xs mb-4 px-2">Lexical Chunks</h3>
        <div className="flex flex-wrap gap-2">
          {island.chunks.map((chunk, i) => (
            <span key={i} className="bg-gold-primary/10 border border-gold-primary/30 text-gold-primary px-4 py-2 rounded-full text-xs font-medium">
              {chunk}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-gold-primary font-bold uppercase tracking-widest text-xs mb-4 px-2">Command Exercises</h3>
        <div className="grid gap-4">
          {island.exercises.map((ex, i) => (
            <div key={i} className="glass-card p-5 border-l-4 border-gold-primary flex gap-4 items-start">
              <span className="text-gold-primary font-serif italic text-2xl">{i + 1}</span>
              <p className="text-sm font-medium leading-relaxed">{ex}</p>
            </div>
          ))}
        </div>
      </section>

      <button 
        onClick={() => onPracticeMode(island)}
        className="btn-gold w-full text-lg shadow-gold-primary/20 mt-4"
      >
        Practice This Island with AI Tutor →
      </button>
    </div>
  );
};

const VocabularyScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Everyday', 'Professional', 'Academic', 'Chunks', 'Errors'];
  
  const filteredWords = VOCABULARY.filter(v => {
    const matchesSearch = v.word.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || v.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-6 pb-32 flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input 
          type="text" 
          placeholder="Search vocabulary..." 
          className="w-full bg-navy-surface border border-gold-primary/20 rounded-xl py-4 pl-12 pr-4 text-ivory placeholder:text-muted focus:border-gold-primary focus:outline-none transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${filter === c ? 'bg-gold-primary text-navy-dark border-gold-primary' : 'border-gold-primary/20 text-muted hover:border-gold-primary/50'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredWords.map((v, i) => (
          <div key={i} className="glass-card p-6 gold-glow-hover">
            <h4 className="font-serif text-2xl text-gold-primary mb-4">{v.word}</h4>
            <div className="grid gap-3 text-sm">
              <div className="flex gap-2">
                <span className="text-gold-primary font-bold uppercase text-[10px] w-20 shrink-0">Meaning</span>
                <p>{v.meaning}</p>
              </div>
              <div className="flex gap-2 italic text-muted">
                <span className="text-gold-primary font-bold uppercase text-[10px] w-20 shrink-0">Example</span>
                <p>{v.example}</p>
              </div>
              <div className="flex gap-2">
                <span className="text-gold-primary font-bold uppercase text-[10px] w-20 shrink-0">Usage</span>
                <p>{v.usage}</p>
              </div>
              <div className="text-ivory/80 bg-navy-dark/40 p-4 rounded-lg border-l-2 border-gold-primary mt-2">
                {v.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AITutorScreen: React.FC<{ activeIsland?: Island }> = ({ activeIsland }) => {
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [bicsCalp, setBicsCalp] = useState<'BICS' | 'CALP'>('BICS');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const stream = await getTutorStream(
        userMessage, 
        messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
        activeIsland?.name || 'General',
        bicsCalp
      );

      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'ai', content: '' }]);

      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "I apologize, my academic engine encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Automatically send
      setTimeout(() => handleSend(), 500);
    };

    recognition.start();
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    const voices = window.speechSynthesis.getVoices();
    const britishVoice = voices.find(v => v.lang.includes('GB') && v.name.includes('Female')) || voices[0];
    if (britishVoice) utterance.voice = britishVoice;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] px-6 pb-4">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setMode('text')}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border ${mode === 'text' ? 'bg-gold-primary text-navy-dark border-gold-primary' : 'bg-navy-surface/50 border-gold-primary/30 text-muted'}`}
          >
            <MessageSquare size={16} /> Text Mode
          </button>
          <button 
            onClick={() => setMode('voice')}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border ${mode === 'voice' ? 'bg-gold-primary text-navy-dark border-gold-primary' : 'bg-navy-surface/50 border-gold-primary/30 text-muted'}`}
          >
            <Mic size={16} /> Voice Mode
          </button>
        </div>
        <div className="flex justify-between items-center bg-navy-surface/50 p-3 rounded-xl border border-gold-primary/10">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-gold-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{activeIsland?.name || 'Global'} Island</span>
          </div>
          <div className="flex gap-1">
            {['BICS', 'CALP'].map(b => (
              <button 
                key={b}
                onClick={() => setBicsCalp(b as any)}
                className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-tighter transition-all ${bicsCalp === b ? 'bg-gold-primary text-navy-dark' : 'text-muted'}`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mode === 'text' ? (
        <>
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 no-scrollbar">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-40 px-10">
                <MessageSquare size={48} className="mb-4 text-gold-primary" />
                <p className="font-serif italic">"Language is not merely spoken — it is commanded."</p>
                <p className="text-xs uppercase tracking-widest mt-2">Begin your dialogue with the Tutor.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-gold-primary text-navy-dark rounded-tr-none shadow-gold-primary/10' : 'bg-navy-surface border-t border-gold-primary/30 text-ivory rounded-tl-none font-serif leading-relaxed'}`}>
                  {m.role === 'ai' && <div className="text-[9px] uppercase tracking-widest text-gold-primary font-bold mb-1">The Tutor</div>}
                  {m.content}
                  {m.role === 'ai' && m.content && (
                    <button onClick={() => speak(m.content)} className="ml-2 inline-block opacity-50 hover:opacity-100">
                      <Speaker size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-navy-surface p-4 rounded-2xl rounded-tl-none border-t border-gold-primary/30 flex gap-1">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 relative">
             <input 
               type="text" 
               placeholder="Enter your command..."
               className="w-full bg-navy-surface border border-gold-primary/30 rounded-xl py-4 pl-4 pr-14 text-ivory focus:border-gold-primary focus:outline-none shadow-inner"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             />
             <button 
               onClick={handleSend}
               disabled={isTyping}
               className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gold-primary text-navy-dark rounded-lg hover:bg-gold-glow transition-all"
             >
               <Send size={18} />
             </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div 
            animate={{ 
              scale: isListening ? [1, 1.2, 1] : 1,
              boxShadow: isListening ? ["0 0 0px 0px rgba(201,168,76,0)", "0 0 40px 10px rgba(201,168,76,0.4)", "0 0 0px 0px rgba(201,168,76,0)"] : "0 0 0px 0px rgba(0,0,0,0)"
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={startVoiceRecognition}
            className={`w-40 h-40 rounded-full flex items-center justify-center cursor-pointer border-2 shadow-xl ${isListening ? 'border-gold-primary bg-gold-primary/20' : 'border-gold-primary/40 bg-navy-surface'}`}
          >
             <div className="relative">
                {isListening ? (
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [12, 32, 12] }} 
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} 
                        className="w-1 bg-gold-primary rounded-full" 
                      />
                    ))}
                  </div>
                ) : (
                  <Mic size={48} className="text-gold-primary" />
                )}
             </div>
          </motion.div>
          <div className="mt-8 text-center uppercase tracking-widest text-xs font-bold text-muted">
            {isListening ? 'Listening your command...' : 'Tap the circle to speak'}
          </div>

          <div className="absolute bottom-4 left-0 right-0 glass-card p-4 max-h-32 overflow-y-auto text-xs italic opacity-80 border-gold-primary/10">
            {messages.length > 0 ? (
              <p>Last exchange: {messages[messages.length-1].content}</p>
            ) : "Speech Recognition Transcript will appear here..."}
          </div>
        </div>
      )}
    </div>
  );
};

const TensesScreen: React.FC<{ onSelectTense: (tense: Tense) => void }> = ({ onSelectTense }) => (
  <div className="px-6 pb-32 flex flex-col gap-4">
    {TENSES.map(tense => (
      <div 
        key={tense.id} 
        onClick={() => onSelectTense(tense)}
        className="glass-card p-6 gold-glow-hover cursor-pointer group flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center font-serif text-gold-primary text-xl font-bold border border-gold-primary/20">
            {tense.id}
          </div>
          <div>
            <h3 className="font-serif text-lg text-ivory group-hover:text-gold-glow transition-all">{tense.name}</h3>
            <p className="text-[10px] text-muted uppercase tracking-wider">{tense.subtitle}</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-gold-primary opacity-50" />
      </div>
    ))}
  </div>
);

const TenseDetailScreen: React.FC<{ tense: Tense; onBack: () => void; onPracticeMode: (tense: Tense) => void }> = ({ tense, onBack, onPracticeMode }) => (
  <div className="px-6 pb-32 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-gold-primary font-bold uppercase tracking-widest text-xs">
      <ArrowLeft size={16} /> Back to Tenses
    </button>

    <header className="text-center">
      <h2 className="font-serif text-4xl text-gold-primary mb-2">{tense.name}</h2>
      <p className="text-muted text-sm uppercase tracking-widest">{tense.subtitle}</p>
    </header>

    <section className="glass-card p-8 text-center italic font-serif text-lg leading-relaxed text-gold-glow/90 bg-navy-surface/50 border-gold-primary/20">
      "{tense.hook}"
    </section>

    <section>
      <h3 className="text-gold-primary font-bold uppercase tracking-widest text-xs mb-4 px-2">The Formula</h3>
      <div className="glass-card p-6 font-mono text-sm">
        <div className="grid gap-3">
          <p><span className="text-gold-primary w-24 inline-block">POSITIVE:</span> {tense.formula.positive}</p>
          <p><span className="text-danger w-24 inline-block">NEGATIVE:</span> {tense.formula.negative}</p>
          <p><span className="text-success w-24 inline-block">QUESTION:</span> {tense.formula.question}</p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-gold-primary font-bold uppercase tracking-widest text-xs mb-4 px-2">Usage Master Map</h3>
      <div className="grid gap-3">
        {tense.usages.map((u, i) => (
          <div key={i} className="glass-card p-4 flex gap-4 items-center">
             <div className="w-2 h-2 rounded-full bg-gold-primary" />
             <div>
                <span className="text-gold-primary font-bold uppercase text-[10px] block">{u.label}</span>
                <p className="text-sm">{u.example}</p>
             </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h3 className="text-gold-primary font-bold uppercase tracking-widest text-xs mb-4 px-2">Time Signals</h3>
      <div className="flex flex-wrap gap-2">
        {tense.signals.map((s, i) => (
          <span key={i} className="bg-navy-surface border border-gold-primary/20 text-ivory px-4 py-2 rounded-full text-xs font-medium">
            {s}
          </span>
        ))}
      </div>
    </section>

    <section>
      <h3 className="text-gold-primary font-bold uppercase tracking-widest text-xs mb-4 px-2">Common Errors</h3>
      <div className="grid gap-4">
        {tense.commonErrors.map((err, i) => (
          <div key={i} className="glass-card p-5 border-l-4 border-danger">
            <div className="flex gap-2 items-center mb-2 line-through text-muted/60 text-sm">
              <span className="font-bold text-[10px] uppercase">Error:</span> {err.error}
            </div>
            <div className="flex gap-2 items-center mb-2 text-success font-bold text-sm">
              <span className="font-bold text-[10px] uppercase">Correction:</span> {err.correction}
            </div>
            <p className="text-xs text-muted italic mt-1">{err.explanation}</p>
          </div>
        ))}
      </div>
    </section>

    <button 
      onClick={() => onPracticeMode(tense)}
      className="btn-gold w-full text-lg mt-4"
    >
      Practice This Tense with AI Tutor →
    </button>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [selectedTense, setSelectedTense] = useState<Tense | null>(null);
  const [lastIsland, setLastIsland] = useState<Island | undefined>(undefined);

  const handlePracticeMode = (item: Island | Tense) => {
    if ('category' in item) {
      setLastIsland(item as Island);
    }
    setActiveTab('tutor');
    setSelectedIsland(null);
    setSelectedTense(null);
  };

  const renderContent = () => {
    if (selectedIsland) {
      return <IslandDetailScreen island={selectedIsland} onBack={() => setSelectedIsland(null)} onPracticeMode={handlePracticeMode} />;
    }
    if (selectedTense) {
      return <TenseDetailScreen tense={selectedTense} onBack={() => setSelectedTense(null)} onPracticeMode={handlePracticeMode} />;
    }

    switch (activeTab) {
      case 'home': return <HomeScreen onNavigate={setActiveTab} />;
      case 'islands': return <IslandsScreen onSelectIsland={setSelectedIsland} />;
      case 'tenses': return <TensesScreen onSelectTense={setSelectedTense} />;
      case 'vocab': return <VocabularyScreen />;
      case 'tutor': return <AITutorScreen activeIsland={lastIsland} />;
      default: return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark text-ivory font-sans relative">
      <Header />
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (selectedIsland?.id || '') + (selectedTense?.id || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <BottomNav activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedIsland(null);
        setSelectedTense(null);
      }} />

      <footer className="text-center pb-24 text-[10px] text-muted opacity-40 py-8 z-10 relative">
        <p className="font-serif italic text-sm mb-1">"Language is not merely spoken — it is commanded."</p>
        <p>⁂ © 2026 Mahmood Khan Kakar | Shakespeare's Den Academy</p>
      </footer>
    </div>
  );
}
