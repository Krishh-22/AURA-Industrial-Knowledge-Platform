import chromadb

class ChromaService:
    def __init__(self):
        self.client=chromadb.PersistentClient(path="./chroma_db")
        self.collection=self.client.get_or_create_collection(
            name="documents"
        )

    def add_document(self, file_name, chunks, embeddings):
        ids = [f"{file_name}_{i}" for i in range(len(chunks))]
        metadatas = [
            {
                "filename": file_name,
                "chunk_index": i,
            }

            for i in range(len(chunks))
        ]

        self.collection.add(
            ids=ids,
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadatas,
        )

    def search(self, query_embedding, top_k=5):
        results=self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
        )

        return results
    
chroma_service=ChromaService()