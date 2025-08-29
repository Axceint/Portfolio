// components/AnimatedGradient.tsx
import React from 'react';

const AnimatedGradient: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-[length:200%_200%] animate-gradient-move">
      {/* Your content goes here */}
    </div>
  );
};

export default AnimatedGradient;