from app.services.embedding_service import embedding_service
from app.services.chroma_service import chroma_service
from app.services.gemini_service import gemini_service


class ChatService:

    def __init__(self):
        self.chat_history = []

    def ask(self, question: str):

        # Vector Search
        query_embedding = embedding_service.generate_query_embedding(question)

        documents = chroma_service.search_documents(query_embedding)

        context = "\n\n".join(documents)

        # Last 6 messages only
        history = "\n".join(self.chat_history[-6:])

        prompt_context = f"""
Previous Conversation:

{history}

Document Context:

{context}
"""

        answer = gemini_service.answer_question(
            context=prompt_context,
            question=question,
        )

        self.chat_history.append(f"User: {question}")
        self.chat_history.append(f"Assistant: {answer}")

        return answer


chat_service = ChatService()