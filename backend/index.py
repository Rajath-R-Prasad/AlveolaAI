"""
AlveolaAI FastAPI Backend (ONNX Engine)
Run: uvicorn index:app --reload --port 8000
"""
import os
import gc
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import analyze, feedback, health
from utils.inference import load_model

# Optimize memory allocation
os.environ["MALLOC_TRIM_THRESHOLD_"] = "100000"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load ONNX model on startup
    model_path = os.getenv("MODEL_PATH", "models/best_model.onnx")
    load_model(model_path)
    gc.collect()
    yield

app = FastAPI(
    title="AlveolaAI API",
    description="AI-powered chest X-ray pneumonia detection (ONNX Engine)",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router,  prefix="/api", tags=["Analysis"])
app.include_router(feedback.router, prefix="/api", tags=["Feedback"])
app.include_router(health.router,   prefix="/api", tags=["Health"])
