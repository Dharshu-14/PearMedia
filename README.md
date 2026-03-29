Pear Media AI Prototype 
A responsive web application that bridges the gap between simple user inputs and advanced AI outputs. This prototype integrates multiple AI models to perform professional-grade text enhancement, image generation, and visual analysis.

 Key Features
 1. Creative Studio (Text-to-Image Workflow) NLP Enhancement: Automatically transforms simple user ideas into descriptive, 50-word   "masterpiece" prompts using the Cohere Command R7B model.
 
Human-in-the-Loop: Users can review and edit the enhanced prompt before final generation.
 
High-Fidelity Generation: Uses Stable Diffusion XL (via Hugging Face) to generate high-quality images from the approved text.
 
 2. Style Lab (Image Input Workflow) Visual Analysis: Leverages Cohere Command A Vision to reverse-engineer an uploaded image's objects, color palette, and artistic style.Variation Generation: Construct new prompts based on the visual analysis to create unique stylistic variations.
 
 Tech Stack Frontend: React.jsStyling: Tailwind CSS / Custom CSS (Clean Tech Aesthetic)
 
 NLP/Vision APIs: Cohere (Command R7B & Command A Vision) 
 
 Image Generation API: Hugging Face (Stable Diffusion XL) 
 
 Deployment: Vercel / Netlify 
 
Getting StartedPrerequisitesNode.js (v18+)npm or yarnInstallationClone the repository:Bashgit clone https://github.com/Dharshu-14/PearMedia.git

cd PearMedia
Install dependencies:Bashnpm install
Configure Environment Variables:
Create a .env file in the root directory and add your API keys:
Code snippet:
REACT_APP_COHERE_KEY=your_cohere_trial_key
REACT_APP_HF_KEY=your_hugging_face_access_token
Run the application:Bashnpm start

Project Flow Input: User enters text or uploads an image.Process: APIs analyze the input to engineer a better prompt or extract visual metadata.

Approval: (Text Workflow) User edits the descriptive prompt for precision.

Output: The final AI-generated result is displayed in the results section.📸

Deliverables:
Live Demo: [Insert Your Vercel/Netlify Link Here] 
Execution Video: [Insert Your Loom/Drive Link Here] 