from app.services.chunking_service import chunking_service
from app.services.embedding_service import embedding_service

text="""
Industrial pumps should be inspected every month.
Bearings must be lubricated regulary.
Leakages must be be reported immediately.
""" * 50

chunks = chunking_service.split_text(text)
embeddings=embedding_service.generate_embeddings(chunks)

print(f"Chunks: {len(chunks)}")
print(f"Embeddings: {len(embeddings)}")
print(f"Embedding Dimension: {len(embeddings[0])}")