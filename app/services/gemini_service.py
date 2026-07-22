from google import genai
from app.core.config import settings

class GeminiService:
    def __init__(self):
        self.client = genai.Client(api_key=settings.gemini_api_key)

    def summarize_document(self, text: str) -> str:
        prompt=f"""
        You are an AI assistant for an Industrial Knowledge Platform.
        Summarize the following document in 5-8 bullet points.
        Document:
        {text}
        """
        response=self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )

        return response.text
    
    def answer_question(self, context: str, question: str) -> str:

        prompt = f"""
        You are AURA, an AI assistant for Industrial Knowledge Platform.

        You are given:

        1. Previous conversation
        2. Retrieved document context

        Always use the previous conversation if the user asks follow-up questions.

        If the answer exists in the uploaded document,answer naturally.

        If the document doesn't contain the answer,
        say:

        "I couldn't find that information in the uploaded document."

        Context:

        {context}

        Question:

        {question}
        """

        response = self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )

        return response.text
    
gemini_service=GeminiService()