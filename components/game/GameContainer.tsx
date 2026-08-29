'use client';

import { useState, useRef, useEffect } from 'react';
import { TitleScreen } from './TitleScreen';
import { ReadyScreen } from './ReadyScreen';
import { LevelSelectScreen } from './LevelSelectScreen';
import { StoryCard } from './cards/StoryCard';
import { JourneyCard } from './cards/JourneyCard';
import { BigDayCard } from './cards/BigDayCard';

// Using types that match the Supabase response
type GameScreen = 'title' | 'ready' | 'levelSelect' | 'storyCard' | 'journeyCard' | 'bigDayCard';

interface GameContainerProps {
  guestName: string;
  couple: any;
  events: any[];
  galleries: any[];
  wishes: any[];
}

export function GameContainer({ guestName, couple, events, galleries, wishes }: GameContainerProps) {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('title');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleStart = () => setCurrentScreen('ready');
  const handleReady = () => setCurrentScreen('levelSelect');
  const handleBackToLevels = () => setCurrentScreen('levelSelect');

  return (
    <div 
      className="w-full h-[100dvh] overflow-hidden relative font-pixel bg-[#73B5E5] text-[#3e2723]"
    >
      <audio ref={audioRef} src="/music/8 Bit Love.mp3" loop />
      
      <div className="w-full h-full relative z-10 flex items-center justify-center">
        {currentScreen === 'title' && <TitleScreen onStart={handleStart} guestName={guestName} />}
        {currentScreen === 'ready' && <ReadyScreen onReady={handleReady} />}
        {currentScreen === 'levelSelect' && (
          <LevelSelectScreen onSelectCard={(card) => setCurrentScreen(card)} />
        )}
        
        {/* Card Modals / Overlays */}
        {currentScreen === 'storyCard' && (
          <StoryCard onBack={handleBackToLevels} couple={couple} />
        )}
        {currentScreen === 'journeyCard' && (
          <JourneyCard onBack={handleBackToLevels} galleries={galleries} />
        )}
        {currentScreen === 'bigDayCard' && (
          <BigDayCard onBack={handleBackToLevels} events={events} wishes={wishes} />
        )}
      </div>

      {/* Vinyl Music Player */}
      <div 
        className="absolute bottom-[40px] md:bottom-8 right-4 md:right-8 z-[90] cursor-pointer"
        onClick={toggleAudio}
      >
        <img 
          src="https://ik.imagekit.io/udvvrj1o2/fia&sepri/Pixel%20Dash/vinyl.png" 
          alt="Music" 
          className={`w-12 h-12 md:w-16 md:h-16 drop-shadow-lg ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
