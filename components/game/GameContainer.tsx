'use client';

import { useState } from 'react';
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

  const handleStart = () => setCurrentScreen('ready');
  const handleReady = () => setCurrentScreen('levelSelect');
  const handleBackToLevels = () => setCurrentScreen('levelSelect');

  return (
    <div 
      className="w-full h-screen overflow-hidden relative font-pixel bg-[#F7F2E6] text-[#3e2723]"
      style={{
        backgroundImage: "linear-gradient(to right, #e8dcc8 1px, transparent 1px), linear-gradient(to bottom, #e8dcc8 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        backgroundPosition: "center center"
      }}
    >
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
    </div>
  );
}
