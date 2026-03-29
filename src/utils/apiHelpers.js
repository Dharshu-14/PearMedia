// 1. Text Workflow: Enhance Prompt using Cohere Command R7B
export const getEnhancedPrompt = async (input) => {
    try {
      const response = await fetch("https://api.cohere.ai/v1/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_COHERE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-r7b-12-2024",
          message: `You are an expert prompt engineer. Transform this simple request into a highly descriptive 50-word image generation prompt, specifying lighting, camera angle, and artistic style. ONLY output the new prompt. Request: ${input}`,
        }),
      });
  
      if (!response.ok) throw new Error("Cohere Text API failed");
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Enhancement failed:", error);
      return input; // Fallback to original text
    }
  };
  
  // 2. Image Generation: Stable Diffusion XL via Hugging Face
  export const generateImage = async (prompt) => {
    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_HF_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.includes("is currently loading")) {
           throw new Error("Model is waking up! Wait 20 seconds and click again.");
        }
        throw new Error(`Hugging Face Error: ${errorData.error || response.statusText}`);
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Image generation failed:", error);
      throw error; 
    }
  };
  
  // 3. Image Input Workflow: Analyze Image using Cohere Command A Vision
  export const analyzeImage = async (base64Image) => {
    try {
      // Cohere expects the raw base64 string without the prefix
      const base64Data = base64Image.split(',')[1]; 
  
      const response = await fetch("https://api.cohere.ai/v1/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_COHERE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-a-vision-07-2025",
          message: "Analyze this image and provide a highly descriptive text prompt that could be used to recreate its main objects, color palette, and artistic style.",
          images: [{ data: base64Data, media_type: "image/jpeg" }]
        }),
      });
  
      if (!response.ok) throw new Error("Cohere Vision API failed");
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Image analysis failed:", error);
      throw error;
    }
  };