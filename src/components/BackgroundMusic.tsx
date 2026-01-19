import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  
  const TARGET_VOLUME = 0.10; // 10% volume
  const FADE_DURATION = 2000; // 2 seconds fade-in

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    const startTime = Date.now();
    
    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / FADE_DURATION, 1);
      
      // Ease-out curve for smooth fade
      const easeOut = 1 - Math.pow(1 - progress, 3);
      audio.volume = TARGET_VOLUME * easeOut;
      
      if (progress < 1) {
        requestAnimationFrame(fade);
      }
    };
    
    requestAnimationFrame(fade);
  }, []);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = 0;
      await audio.play();
      fadeIn(audio);
      setIsPlaying(true);
      setIsMuted(false);
      setShowPrompt(false);
      sessionStorage.setItem('bgMusicMuted', 'false');
      return true;
    } catch (error) {
      console.log('Autoplay blocked, waiting for user interaction');
      return false;
    }
  }, [fadeIn]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check session storage for user preference
    const savedPreference = sessionStorage.getItem('bgMusicMuted');

    // If user previously muted, respect that
    if (savedPreference === 'true') {
      setIsMuted(true);
      return;
    }

    // Don't autoplay on mobile or if reduced motion preferred
    if (prefersReducedMotion || isMobile) {
      setIsMuted(true);
      return;
    }

    // Try to autoplay on desktop
    const attemptAutoplay = async () => {
      const success = await startPlayback();
      if (!success) {
        // Show prompt to user that they need to click to enable audio
        setShowPrompt(true);
        
        // Listen for any user interaction to try playing
        const handleInteraction = async () => {
          const played = await startPlayback();
          if (played) {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
          }
        };
        
        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
        
        return () => {
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('keydown', handleInteraction);
        };
      }
    };

    // Wait for audio to be loaded
    const handleCanPlay = () => {
      attemptAutoplay();
    };

    if (audio.readyState >= 3) {
      attemptAutoplay();
    } else {
      audio.addEventListener('canplaythrough', handleCanPlay);
      return () => audio.removeEventListener('canplaythrough', handleCanPlay);
    }
  }, [startPlayback]);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted || !isPlaying) {
      // Try to play
      const success = await startPlayback();
      if (!success) {
        setShowPrompt(true);
      }
    } else {
      // Fade out and pause
      const startTime = Date.now();
      const startVolume = audio.volume;
      
      const fadeOut = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 500, 1);
        
        audio.volume = startVolume * (1 - progress);
        
        if (progress < 1) {
          requestAnimationFrame(fadeOut);
        } else {
          audio.pause();
          setIsPlaying(false);
          setIsMuted(true);
          sessionStorage.setItem('bgMusicMuted', 'true');
        }
      };
      
      requestAnimationFrame(fadeOut);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
      />
      
      {/* Initial prompt when autoplay is blocked */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-6 z-50 bg-background/90 backdrop-blur-sm border border-primary/30 rounded-lg p-4 shadow-lg max-w-xs"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Ambient Music</p>
                <p className="text-xs text-muted-foreground">Click anywhere to enable</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mute/Unmute Button - positioned bottom left */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Play ambient music" : "Mute music"}
      >
        <AnimatePresence mode="wait">
          {isMuted || !isPlaying ? (
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
        {isPlaying && !isMuted && (
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
