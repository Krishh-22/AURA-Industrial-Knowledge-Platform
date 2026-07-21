from app.services.embedding_service import embedding_service
from app.services.chroma_service import chroma_service
from app.services.gemini_service import gemini_service


class ChatService:

    def ask(self, question: str):

        query_embedding = embedding_service.generate_query_embedding(question)

        documents = chroma_service.search_documents(query_embedding)

        context = "\n\n".join(documents)

        answer = gemini_service.answer_question(
            context=context,
            question=question,
        )

        return answer


chat_service = ChatService()