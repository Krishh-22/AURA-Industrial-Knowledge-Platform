from google import genai
from app.core.config import settings


class GeminiService:
    def __init__(self):
        self.client = genai.Client(api_key=settings.gemini_api_key)

    def summarize_document(self, text: str) -> str:
        prompt = f"""
        You are an AI assistant for an Industrial Knowledge Platform.
        Summarize the following document in 5-8 bullet points.

        Document:
        {text}
        """

        try:
            response = self.client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt,
            )
            return response.text

        except Exception as e:
            print(f"Gemini Summary Error: {e}")
            return (
                "Summary is temporarily unavailable because the AI service is "
                "experiencing high demand. Please try again in a few moments."
            )

    def answer_question(self, context: str, question: str) -> str:
        prompt = f"""
        You are AURA, an AI assistant for Industrial Knowledge Platform.

        Context:
        {context}

        Question:
        {question}
        """

        try:
            response = self.client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt,
            )
            return response.text

        except Exception as e:
            print(f"Gemini Chat Error: {e}")
            return (
                "We're having trouble reaching the AI service right now. "
                "Please try again in a few moments."
            )


gemini_service = GeminiService()