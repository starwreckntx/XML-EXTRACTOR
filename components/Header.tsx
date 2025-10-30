
import React from 'react';
import { WandIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-6 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4">
          <WandIcon className="w-10 h-10 text-cyan-400" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            XML to JSON Extractor
          </h1>
        </div>
        <p className="mt-2 text-lg text-gray-400">
          Paste any text containing XML, and let AI extract and convert it to clean JSON.
        </p>
      </div>
    </header>
  );
};
