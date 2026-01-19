import { useEffect, useState } from 'react';

// Valid ElevenLabs agent ID pattern
const AGENT_ID_PATTERN = /^agent_[a-z0-9]+$/;
const ELEVENLABS_AGENT_ID = 'agent_9001k36j0yxwfc29wdfss5wv58fa';

/**
 * ElevenLabs ConvAI Widget Component
 * 
 * Security: Validates agent ID format before rendering the widget.
 * This prevents potential XSS from malformed agent IDs.
 */
export function ElevenLabsWidget() {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate agent ID format
    if (!AGENT_ID_PATTERN.test(ELEVENLABS_AGENT_ID)) {
      console.error('Invalid ElevenLabs agent ID format');
      return;
    }
    setIsValid(true);
  }, []);

  if (!isValid) {
    return null;
  }

  // Use a custom element directly in React JSX
  // This is safer than dangerouslySetInnerHTML as React handles escaping
  return (
    <div className="elevenlabs-widget-container">
      {/* @ts-expect-error - elevenlabs-convai is a custom web component */}
      <elevenlabs-convai agent-id={ELEVENLABS_AGENT_ID}></elevenlabs-convai>
    </div>
  );
}

export default ElevenLabsWidget;
