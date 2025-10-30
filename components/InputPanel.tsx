
import React from 'react';
import { SparklesIcon, TrashIcon, LoaderIcon } from './icons';

interface InputPanelProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onExtract: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ value, onChange, onExtract, onClear, isLoading }) => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Input Text</h2>
        <p className="text-sm text-gray-400">Paste your text containing XML below.</p>
      </div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste your text here..."
        className="flex-grow p-4 bg-gray-900 text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
        disabled={isLoading}
      />
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center justify-between gap-4">
        <button
          onClick={onClear}
          disabled={isLoading || !value}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <TrashIcon className="w-4 h-4" />
          Clear
        </button>
        <button
          onClick={onExtract}
          disabled={isLoading || !value}
          className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-500 disabled:bg-cyan-800 disabled:cursor-wait transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
        >
          {isLoading ? (
            <>
              <LoaderIcon className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Extract & Convert
            </>
          )}
        </button>
      </div>
    </div>
  );
};
