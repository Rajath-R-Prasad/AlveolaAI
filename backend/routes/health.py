"""GET /api/health — service status check."""
from fastapi import APIRouter
from schemas.models import HealthResponse
from utils import inference

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health():
    return HealthResponse(
        status="ok" if inference.MODEL_LOADED else "degraded",
        model_loaded=inference.MODEL_LOADED,
        gpu_available=False,
        version="1.0.0",
    )
