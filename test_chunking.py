from app.services.chunking_service import chunking_service

text="""
Industrial pupms should be  inspected every month.
Bearings must be lubricated regurarly.
Leakages must be reported immediately.
""" * 100


chunks = chunking_service.split_text(text)
print(f"Number of chunks: {len(chunks)}")
print()
print(chunks[0])