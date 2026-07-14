import React, { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import BirthdayHero from './components/BirthdayHero';
import HighlightQuote from './components/HighlightQuote';
import SecretLetter from './components/SecretLetter';
import MemoryStories from './components/MemoryStories';
import MessageCards from './components/MessageCards';
import InteractiveCake from './components/InteractiveCake';
import PhotoGallery from './components/PhotoGallery';
import BirthdayEnding from './components/BirthdayEnding';
import MusicPlayer from './components/MusicPlayer';
import FloatingDecor from './components/FloatingDecor';
import AutoScroll from './components/AutoScroll';
import { birthdayData } from './config/birthdayData';

function App() {
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <div className="relative w-full min-h-[100dvh] bg-warm-cream flex flex-col items-center overflow-x-hidden font-body text-text-brown selection:bg-rose-pink selection:text-white">
      
      {!hasOpened ? (
        <OpeningScreen onOpen={() => setHasOpened(true)} />
      ) : (
        <>
          <FloatingDecor />
          <AutoScroll />
          {/* Main Content Container constrained to mobile width */}
          <div className="relative w-full max-w-[430px] bg-soft-white shadow-[0_0_50px_rgba(246,184,200,0.3)] min-h-screen bg-grain z-10 border-x border-powder-pink/20">
            
            <BirthdayHero />
            
            <HighlightQuote />
            
            <MessageCards quote={birthdayData.shortQuotes[0]} align="left" rotate={-2} />
            
            <SecretLetter />
            
            <MessageCards quote={birthdayData.shortQuotes[1]} align="right" rotate={3} />
            
            <MemoryStories />
            
            <MessageCards quote={birthdayData.shortQuotes[2]} align="center" rotate={-1} />
            
            <div id="cake-section" className="w-full">
              <InteractiveCake />
            </div>
            
            <PhotoGallery />
            
            <BirthdayEnding />

          </div>
          
          <MusicPlayer />
        </>
      )}
    </div>
  );
}

export default App;
