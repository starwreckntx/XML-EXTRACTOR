
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { extractXmlAsJson } from './services/geminiService';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>(`Here is some text with an XML block inside it. 
It might be surrounded by other information.

<root>
  <user>
    <id>123</id>
    <name>John Doe</name>
    <email>john.doe@example.com</email>
    <orders>
      <order id="A1">
        <item>Laptop</item>
        <quantity>1</quantity>
      </order>
      <order id="B2">
        <item>Mouse</item>
        <quantity>2</quantity>
      </order>
    </orders>
  </user>
</root>

This is some trailing text after the XML block.`);
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleExtract = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to process.');
      return;
    }
    setIsLoading(true);
    setError('');
    setJsonOutput('');

    try {
      const result = await extractXmlAsJson(inputText);
      // Attempt to parse and re-stringify for consistent formatting
      try {
        const parsedJson = JSON.parse(result);
        setJsonOutput(JSON.stringify(parsedJson, null, 2));
      } catch (parseError) {
        // If parsing fails, it might not be valid JSON. Show the raw result.
        console.error("Could not parse AI response as JSON:", parseError);
        setJsonOutput(result);
        setError("AI returned a non-JSON response. Displaying raw output.");
      }
    } catch (apiError) {
      console.error(apiError);
      setError('Failed to process the text. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setJsonOutput('');
    setError('');
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InputPanel
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onExtract={handleExtract}
          onClear={handleClear}
          isLoading={isLoading}
        />
        <OutputPanel
          jsonOutput={jsonOutput}
          isLoading={isLoading}
          error={error}
        />
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
