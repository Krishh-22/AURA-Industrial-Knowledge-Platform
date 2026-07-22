import os
import uuid
import shutil
from pathlib import Path
from fastapi import UploadFile, HTTPException
from app.services.pdf_service import pdf_service
from app.services.gemini_service import gemini_service
from app.services.chunking_service import chunking_service
from app.services.embedding_service import embedding_service
from app.services.chroma_service import chroma_service

UPLOAD_DIR=Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

class UploadService:
    async def receive_file(self, file: UploadFile):
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed."
            )
        
        extension = os.path.splitext(file.filename)[1]
        unique_filename=f"{uuid.uuid4()}{extension}"

        file_path=UPLOAD_DIR / unique_filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        text = pdf_service.extract_text(str(file_path))

        chunks=chunking_service.split_text(text)
        embeddings=embedding_service.generate_embeddings(chunks)
        chroma_service.add_document(
            file.filename,
            chunks,
            embeddings,
        )

        summary=gemini_service.summarize_document(text)

        return {
            "filename": file.filename,
            "message": "File uploaded",
            "chunks_created": len(chunks),
            "summary": summary,
        }
    
upload_service = UploadService()