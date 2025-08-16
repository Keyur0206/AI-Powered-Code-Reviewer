
import { generateContent } from "../services/ai.service.js"; 

const response = async (req, res) => {
  const prompt = req.body.prompt;
 
  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  const aiResponse = await generateContent(prompt);
  res.send(aiResponse);
}; 

export { response };
