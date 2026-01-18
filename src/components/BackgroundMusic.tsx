import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const TARGET_VOLUME = 0.10; // 10% volume
  const FADE_DURATION = 2000; // 2 seconds fade-in

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check session storage for user preference
    const savedPreference = sessionStorage.getItem('bgMusicMuted');
    
    if (savedPreference !== null) {
      setIsMuted(savedPreference === 'true');
    } else if (prefersReducedMotion || isMobile) {
      // Keep muted on mobile or if user prefers reduced motion
      setIsMuted(true);
    } else {
      // Desktop: try to autoplay
      setIsMuted(false);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (!isMuted) {
      // Start with volume at 0 for fade-in
      audio.volume = 0;
      
      // Try to play
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Fade in smoothly
            fadeIn(audio);
            setHasInteracted(true);
          })
          .catch(() => {
            // Autoplay blocked - wait for user interaction
            setIsMuted(true);
            
            const handleFirstInteraction = () => {
              setHasInteracted(true);
              document.removeEventListener('click', handleFirstInteraction);
              document.removeEventListener('touchstart', handleFirstInteraction);
            };
            
            document.addEventListener('click', handleFirstInteraction);
            document.addEventListener('touchstart', handleFirstInteraction);
          });
      }
    } else {
      audio.pause();
    }
  }, [isMuted, isLoaded]);

  const fadeIn = (audio: HTMLAudioElement) => {
    const startTime = Date.now();
    const startVolume = 0;
    
    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / FADE_DURATION, 1);
      
      // Ease-out curve for smooth fade
      const easeOut = 1 - Math.pow(1 - progress, 3);
      audio.volume = startVolume + (TARGET_VOLUME - startVolume) * easeOut;
      
      if (progress < 1) {
        requestAnimationFrame(fade);
      }
    };
    
    requestAnimationFrame(fade);
  };

  const fadeOut = (audio: HTMLAudioElement, callback?: () => void) => {
    const startTime = Date.now();
    const startVolume = audio.volume;
    
    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (FADE_DURATION / 2), 1);
      
      audio.volume = startVolume * (1 - progress);
      
      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        audio.pause();
        callback?.();
      }
    };
    
    requestAnimationFrame(fade);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    sessionStorage.setItem('bgMusicMuted', String(newMutedState));

    if (newMutedState) {
      fadeOut(audio);
    }
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
        onCanPlayThrough={handleCanPlay}
      />
      
      {/* Mute/Unmute Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Play ambient music" : "Mute music"}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 className="w-5 h-5 text-primary transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle pulse animation when playing */}
        {!isMuted && (
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;
