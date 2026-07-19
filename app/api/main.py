from fastapi import FastAPI, UploadFile, File
from app.core.config import settings
from app.core.logger import logger
from app.services.upload_service import upload_service

app = FastAPI(
    title=settings.app_name,
    version = settings.app_version,
)

@app.on_event("startup")
async def startup_event():
    logger.info(f"{settings.app_name} has started successfully.")

@app.get("/")
def root():
    logger.info("Root endpoint was accessed.")

    return {
        "message": f"Welcome to {settings.app_name}",
        "version": settings.app_version,
        "status": "Running"
    }

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    logger.info(f"Received file: {file.filename}")

    return await upload_service.receive_file(file)