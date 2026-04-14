
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { RADIO_CONFIG } from '../../constants';

const ASCII_TURNTABLE = `
     __________________________
    |  ______________________  |
    | |                      | |
    | |      .::::::::.      | |
    | |    .::::::::::::.    | |
    | |   ::::::::::::::    | |
    | |    '::::::::::'      | |
    | |      '::::::'        | |
    | |______________________| |
    |__________________________|
       ||                  ||
    `;

const TerminalHome: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [streamUrl, setStreamUrl] = useState(RADIO_CONFIG.streamUrl);
  const [stationName, setStationName] = useState(RADIO_CONFIG.stationName);
  const [username, setUsername] = useState("Guest");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loginStep, setLoginStep] = useState<'email' | 'password'>('email');
  const [tempEmail, setTempEmail] = useState("");
  
  const [history, setHistory] = useState<string[]>([
    "ROOZ OS [Version 1.0.42]",
    "(c) 2026 Rooz Radio. All rights reserved.",
    "",
    "Initializing audio drivers...",
    "Connecting to stream: " + RADIO_CONFIG.streamUrl,
    "Ready. Type 'help' for commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText: string) => {
    if (isLoginMode) {
      handleLogin(cmdText);
      return;
    }

    const cmd = cmdText.trim().toLowerCase();
    const newHistory = [...history, `C:\\ROOZ RADIO> ${cmdText}`];

    if (cmd === 'login') {
      setIsLoginMode(true);
      setLoginStep('email');
      newHistory.push("Starting administrative login...", "Please enter administrator email:");
      setHistory(newHistory);
      return;
    }

    if (cmd === 'logout') {
      if (isAdmin) {
        setIsAdmin(false);
        newHistory.push("Administrator logged out.");
      } else {
        newHistory.push("No active administrator session.");
      }
      setHistory(newHistory);
      return;
    }

    switch (cmd) {
      case 'play':
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            setHistory(prev => [...prev, "ERROR: Could not start stream. " + err.message]);
          });
          setIsPlaying(true);
          newHistory.push("Starting audio stream...");
        }
        break;
      case 'stop':
      case 'pause':
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
          newHistory.push("Audio stream paused.");
        }
        break;
      case 'help':
        newHistory.push(
          "Available commands:", 
          "  PLAY   - Start the radio stream", 
          "  STOP   - Pause the radio stream", 
          "  VOL    - Set volume (0-100)", 
          "  NAME   - Set your display name",
          "  MSG    - Send a chat message",
          "  LOGIN  - Access administrative panel",
          "  CLEAR  - Clear terminal history", 
          "  HELP   - Show this message"
        );
        if (isAdmin) {
          newHistory.push(
            "Admin commands:",
            "  SETLINK [url]  - Change the radio stream URL",
            "  SETNAME [name] - Change the station name",
            "  SAY [message]  - Broadcast a message",
            "  LOGOUT         - End admin session"
          );
        }
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      default:
        if (cmd.startsWith('vol ')) {
          const v = parseInt(cmd.split(' ')[1]);
          if (!isNaN(v) && v >= 0 && v <= 100) {
            setVolume(v / 100);
            newHistory.push(`Volume set to ${v}%`);
          } else {
            newHistory.push("ERROR: Invalid volume level. Use 0-100.");
          }
        } else if (cmd.startsWith('name ')) {
          const newName = cmdText.substring(5).trim();
          if (newName) {
            setUsername(newName);
            newHistory.push(`Username updated to: ${newName}`);
          } else {
            newHistory.push("ERROR: Missing name. Usage: NAME [username]");
          }
        } else if (cmd.startsWith('msg ')) {
          const msg = cmdText.substring(4).trim();
          if (msg) {
            newHistory.push(`[${username}]: ${msg}`);
          } else {
            newHistory.push("ERROR: Missing message. Usage: MSG [text]");
          }
        } else if (isAdmin && cmd.startsWith('setlink ')) {
          const newUrl = cmdText.split(' ')[1];
          if (newUrl) {
            setStreamUrl(newUrl);
            newHistory.push(`SUCCESS: Stream link updated to ${newUrl}`, "Re-initializing audio drivers...");
            if (isPlaying && audioRef.current) {
              audioRef.current.load();
              audioRef.current.play().catch(console.error);
            }
          } else {
            newHistory.push("ERROR: Missing URL. Usage: SETLINK [url]");
          }
        } else if (isAdmin && cmd.startsWith('setname ')) {
          const newName = cmdText.substring(8).trim();
          if (newName) {
            setStationName(newName);
            newHistory.push(`SUCCESS: Station name updated to '${newName}'`);
          } else {
            newHistory.push("ERROR: Missing name. Usage: SETNAME [name]");
          }
        } else if (isAdmin && cmd.startsWith('say ')) {
          const msg = cmdText.substring(4).trim();
          if (msg) {
            newHistory.push(`[ADMIN BROADCAST]: ${msg}`);
          } else {
            newHistory.push("ERROR: Missing message. Usage: SAY [message]");
          }
        } else if (cmd !== "") {
          // Default to chat if not a recognized command
          newHistory.push(`[${username}]: ${cmdText}`);
        }
    }

    setHistory(newHistory);
  };

  const handleLogin = (val: string) => {
    if (loginStep === 'email') {
      setTempEmail(val);
      setLoginStep('password');
      setHistory(prev => [...prev, `C:\\ROOZ RADIO> ${val}`, "Please enter password:"]);
    } else {
      const maskedPass = "*".repeat(val.length);
      const newHistory = [...history, `C:\\ROOZ RADIO> ${maskedPass}`];
      
      if (tempEmail === 'mail@roozradio.it' && val === 'difadifadifa') {
        setIsAdmin(true);
        newHistory.push("ACCESS GRANTED.", "Welcome, Administrator.", "Type 'help' to see administrative commands.");
      } else {
        newHistory.push("ACCESS DENIED: Invalid credentials.");
      }
      setIsLoginMode(false);
      setLoginStep('email');
      setTempEmail("");
      setHistory(newHistory);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className={`w-full h-screen bg-terminal-bg p-4 md:p-6 flex flex-col crt-effect relative transition-all duration-500 ${isPlaying ? 'pt-16 md:pt-20' : ''}`}>
      <div className="scanline" />
      
      {/* Fixed Top Player */}
      {isPlaying && (
        <motion.div 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 w-full bg-terminal-green text-terminal-bg px-4 md:px-6 py-2 z-50 flex items-center justify-between font-mono text-[10px] md:text-xs font-bold border-b border-terminal-bg"
        >
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <span className="animate-pulse">● LIVE</span>
            <span className="uppercase tracking-widest hidden sm:inline">{stationName}</span>
          </div>
          <div className="flex-1 mx-4 md:mx-12 overflow-hidden whitespace-nowrap">
            <motion.div 
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              NOW STREAMING: roozradio.it
            </motion.div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <span className="hidden sm:inline">VOL: {Math.round(volume * 100)}%</span>
            <button onClick={() => executeCommand('STOP')} className="bg-terminal-bg text-terminal-green px-2 py-0.5 hover:bg-terminal-white transition-colors text-[10px]">
              [ STOP ]
            </button>
          </div>
        </motion.div>
      )}

      {/* Control Box Top Right */}
      <div className={`absolute right-4 md:right-6 z-10 w-32 md:w-48 border border-terminal-white p-2 bg-terminal-bg shadow-[4px_4px_0px_#767676] transition-all duration-500 ${isPlaying ? 'top-16 md:top-20' : 'top-4 md:top-6'}`}>
        <div className="text-[8px] md:text-[10px] text-terminal-gray mb-2 border-b border-terminal-gray pb-1 uppercase tracking-widest truncate">
          {isAdmin ? "ADMIN" : "ACTIONS"}
        </div>
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => executeCommand('PLAY')}
            className="text-left px-2 py-1 hover:bg-terminal-green hover:text-terminal-bg transition-colors text-[10px] md:text-xs font-mono"
          >
            [ PLAY ]
          </button>
          <button 
            onClick={() => executeCommand('STOP')}
            className="text-left px-2 py-1 hover:bg-terminal-green hover:text-terminal-bg transition-colors text-[10px] md:text-xs font-mono"
          >
            [ STOP ]
          </button>
          {!isAdmin ? (
            <button 
              onClick={() => executeCommand('LOGIN')}
              className="text-left px-2 py-1 hover:bg-terminal-green hover:text-terminal-bg transition-colors text-[10px] md:text-xs font-mono"
            >
              [ LOGIN ]
            </button>
          ) : (
            <button 
              onClick={() => executeCommand('LOGOUT')}
              className="text-left px-2 py-1 hover:bg-terminal-green hover:text-terminal-bg transition-colors text-[10px] md:text-xs font-mono text-red-500 hover:text-terminal-bg"
            >
              [ LOGOUT ]
            </button>
          )}
          <button 
            onClick={() => executeCommand('HELP')}
            className="text-left px-2 py-1 hover:bg-terminal-green hover:text-terminal-bg transition-colors text-[10px] md:text-xs font-mono"
          >
            [ HELP ]
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-4 scrollbar-hide font-mono text-sm leading-relaxed"
      >
        {history.map((line, i) => (
          <div key={i} className={
            line.startsWith('ERROR') ? 'text-red-500' : 
            line.startsWith('C:\\') ? 'text-terminal-white' : 
            line.startsWith('ACCESS GRANTED') ? 'text-terminal-green font-bold' : 
            line.startsWith('[ADMIN BROADCAST]') ? 'text-yellow-400 font-bold' :
            line.startsWith('[') && !line.startsWith('[ADMIN') ? 'text-terminal-white italic' :
            'text-terminal-green'
          }>
            {line}
          </div>
        ))}
        
        {/* ASCII Art for Turntable */}
        <div className="mt-8 text-terminal-green opacity-80 whitespace-pre font-mono leading-none overflow-x-hidden scale-75 origin-left sm:scale-100">
          {ASCII_TURNTABLE}
          <div className="mt-4 flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-terminal-green animate-pulse' : 'bg-terminal-gray'}`} />
            <span className="text-[10px] md:text-xs uppercase tracking-widest">
              {isPlaying ? "STREAMING: " + stationName : "IDLE"}
            </span>
            {isAdmin && <span className="text-[8px] md:text-[10px] bg-terminal-green text-terminal-bg px-1 font-bold">ADMIN MODE</span>}
          </div>
        </div>
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleCommand} className="flex items-center gap-2 font-mono text-xs md:text-sm">
        <span className="text-terminal-white shrink-0">C:\ROOZ RADIO&gt;</span>
        <input 
          autoFocus
          type={isLoginMode && loginStep === 'password' ? 'password' : 'text'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-terminal-white caret-terminal-green min-w-0"
          spellCheck={false}
        />
        <span className="w-2 h-5 bg-terminal-green cursor-blink shrink-0" />
      </form>

      <audio ref={audioRef} src={streamUrl} />
    </div>
  );
};

export default TerminalHome;
