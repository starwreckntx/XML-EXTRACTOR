
import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon, AlertTriangleIcon } from './icons';

interface OutputPanelProps {
  jsonOutput: string;
  isLoading: boolean;
  error: string;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ jsonOutput, isLoading, error }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    if (jsonOutput) {
      navigator.clipboard.writeText(jsonOutput);
      setIsCopied(true);
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
           <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg">AI is processing...</p>
        </div>
      );
    }
    if (error) {
      return (
         <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
            <AlertTriangleIcon className="w-12 h-12 mb-4"/>
            <p className="text-lg font-semibold">An Error Occurred</p>
            <p className="text-center">{error}</p>
        </div>
      );
    }
    if (jsonOutput) {
      return (
        <pre className="p-4 text-sm text-cyan-300 font-mono overflow-auto h-full">
          <code>{jsonOutput}</code>
        </pre>
      );
    }
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>JSON output will appear here</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">JSON Output</h2>
          <p className="text-sm text-gray-400">Formatted result from AI extraction.</p>
        </div>
        {jsonOutput && !isLoading && !error && (
            <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
            {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
            {isCopied ? 'Copied!' : 'Copy'}
            </button>
        )}
      </div>
      <div className="flex-grow bg-gray-900 min-h-[200px] lg:min-h-0">
        {renderContent()}
      </div>
    </div>
  );
};
