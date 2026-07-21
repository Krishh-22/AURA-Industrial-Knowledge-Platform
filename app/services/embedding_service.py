from sentence_transformers import SentenceTransformer

class EmbeddingService:
    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

    def generate_embeddings(self, chunks: list[str]):
        return self.model.encode(chunks).tolist()
    
    def generate_query_embedding(self, query: str):
        return self.model.encode(query).tolist()
    
embedding_service=EmbeddingService()