from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Model import TranslationModel
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="M2M Translation API",
    description="Many-to-Many Translation API for Hindi and English",
    version="1.0.0"
)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for translation
class TextRequest(BaseModel):
    text: str

# Initialize translation model
logger.info("Loading M2M translation model...")
try:
    translation_model = TranslationModel()
    logger.info("Model loaded successfully!")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    raise



@app.get("/")
def read_root():
    """Root endpoint with API information"""
    return {
        "message": "M2M Translation API",
        "version": "1.0.0",
        "supported_languages": ["Hindi", "English"],
        "endpoints": {
            "hindi_to_english": "POST /hindi-to-english",
            "english_to_hindi": "POST /english-to-hindi",
            "health": "GET /health"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/hindi-to-english")
def hindi_to_english(request: TextRequest):
    """Translate text from Hindi to English"""
    try:
        if not request.text or not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        logger.info("Translating from Hindi to English")
        translated = translation_model.hindi_to_english(request.text)
        
        return {
            "original_text": request.text,
            "translated_text": translated,
            "source_language": "Hindi",
            "target_language": "English"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Hindi to English translation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/english-to-hindi")
def english_to_hindi(request: TextRequest):
    """Translate text from English to Hindi"""
    try:
        if not request.text or not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        logger.info("Translating from English to Hindi")
        translated = translation_model.english_to_hindi(request.text)
        
        return {
            "original_text": request.text,
            "translated_text": translated,
            "source_language": "English",
            "target_language": "Hindi"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"English to Hindi translation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)