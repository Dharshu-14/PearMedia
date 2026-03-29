import React, { useState } from 'react';
import { getEnhancedPrompt, generateImage, analyzeImage } from './utils/apiHelpers';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Text Workflow State
  const [userPrompt, setUserPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [textResultImage, setTextResultImage] = useState(null);

  // Image Workflow State
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState('');
  const [variationImage, setVariationImage] = useState(null);

  // --- TEXT WORKFLOW HANDLERS ---
  const handleEnhanceText = async () => {
    setIsLoading(true);
    setStatusMessage('Analyzing and enhancing prompt...');
    const enhanced = await getEnhancedPrompt(userPrompt);
    setEnhancedPrompt(enhanced);
    setIsLoading(false);
  };

  const handleGenerateFromText = async () => {
    setIsLoading(true);
    setStatusMessage('Generating image from approved prompt...');
    try {
      const url = await generateImage(enhancedPrompt);
      setTextResultImage(url);
    } catch (err) {
      // Displays the specific error (like the 20-second wait timer)
      alert(err.message); 
    }
    setIsLoading(false);
  };

  // --- IMAGE WORKFLOW HANDLERS ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeAndGenerate = async () => {
    setIsLoading(true);
    try {
      setStatusMessage('Analyzing image metadata and style...');
      const analysisDetails = await analyzeImage(uploadedImage);
      setImageAnalysis(analysisDetails);
      
      setStatusMessage('Generating stylistic variation...');
      const newImageUrl = await generateImage(`Create a variation of this concept: ${analysisDetails}`);
      setVariationImage(newImageUrl);
    } catch (err) {
      // Displays the specific error
      alert(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Pear Media AI Prototype</h1>
        <div className="tabs">
          <button className={activeTab === 'text' ? 'active' : ''} onClick={() => setActiveTab('text')}>Creative Studio (Text)</button>
          <button className={activeTab === 'image' ? 'active' : ''} onClick={() => setActiveTab('image')}>Style Lab (Image)</button>
        </div>
      </header>

      <main>
        {isLoading && <div className="loading-banner">{statusMessage}</div>}

        {activeTab === 'text' && (
          <div className="workflow-section">
            <h2>Text-to-Image Workflow</h2>
            <div className="input-group">
              <label>1. Enter your basic concept:</label>
              <textarea 
                value={userPrompt} 
                onChange={(e) => setUserPrompt(e.target.value)} 
                placeholder="A dog on the moon..."
              />
              <button onClick={handleEnhanceText} disabled={!userPrompt || isLoading}>Enhance Prompt</button>
            </div>

            {enhancedPrompt && (
              <div className="input-group approval-section">
                <label>2. Review & Edit Enhanced Prompt (Approval Phase):</label>
                <textarea 
                  value={enhancedPrompt} 
                  onChange={(e) => setEnhancedPrompt(e.target.value)} 
                  rows="4"
                />
                <button onClick={handleGenerateFromText} disabled={isLoading}>Approve & Generate Image</button>
              </div>
            )}

            {textResultImage && (
              <div className="results-section">
                <h3>Generated Result:</h3>
                <img src={textResultImage} alt="Generated from text" className="result-img"/>
              </div>
            )}
          </div>
        )}

        {activeTab === 'image' && (
          <div className="workflow-section">
            <h2>Image Variation Workflow</h2>
            <div className="input-group">
              <label>1. Upload a reference image:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploadedImage && <img src={uploadedImage} alt="Upload preview" className="preview-img" />}
              <button onClick={handleAnalyzeAndGenerate} disabled={!uploadedImage || isLoading}>Analyze & Generate Variation</button>
            </div>

            {variationImage && (
              <div className="results-section">
                <h3>Visual Analysis:</h3>
                <p className="analysis-text">{imageAnalysis}</p>
                <h3>Generated Variation:</h3>
                <img src={variationImage} alt="Generated variation" className="result-img"/>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;