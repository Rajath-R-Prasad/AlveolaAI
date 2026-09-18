# ==============================================================================
# AlveolaAI Backend - Production Dockerfile (Ultra-Lean ONNX Runtime Engine)
# ==============================================================================
FROM python:3.11-slim-bookworm

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    MALLOC_TRIM_THRESHOLD_=100000 \
    PORT=8000 \
    MODEL_PATH=models/best_model.onnx

WORKDIR /app

# Minimal OS dependencies needed for OpenCV headless & healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Install lightweight dependencies (FastAPI, ONNX Runtime, NumPy, Pillow, OpenCV)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create runtime directories for reports
RUN mkdir -p /tmp/reports

# Copy application source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:${PORT}/api/health || exit 1

# Start Uvicorn
CMD ["uvicorn", "index:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
