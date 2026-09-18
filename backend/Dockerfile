# ==============================================================================
# AlveolaAI Backend - Production Dockerfile (Optimized for EC2 CPU VPS)
# ==============================================================================
FROM python:3.11-slim-bookworm

# Set environment variables for minimal memory usage & optimal Python execution
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    MALLOC_TRIM_THRESHOLD_=100000 \
    OMP_NUM_THREADS=1 \
    MKL_NUM_THREADS=1 \
    PORT=8000 \
    MODEL_PATH=models/best_model.pt

WORKDIR /app

# Install minimal OS dependencies needed for OpenCV headless & container healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install CPU-only PyTorch + trimmed dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create runtime directories for reports and logs
RUN mkdir -p /tmp/reports

# Copy application source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
    CMD curl -f http://localhost:${PORT}/api/health || exit 1

# Start Uvicorn with single worker to conserve RAM on EC2 VPS
CMD ["uvicorn", "index:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
