#!/usr/bin/env bash
# ==============================================================================
# AlveolaAI - EC2 VPS Automated Deployment & Update Script
# ==============================================================================
set -e

echo "=================================================="
echo "🚀 Deploying AlveolaAI on EC2 VPS"
echo "=================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "📦 Docker not found. Installing Docker & Docker Compose..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg lsb-release
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
    echo "✅ Docker installed successfully."
fi

# Set up .env file if missing
if [ ! -f .env ]; then
    echo "📄 Creating .env from .env.example..."
    cp .env.example .env
fi

echo "🔨 Building and starting Docker containers..."
docker compose down --remove-orphans || true
docker compose build --no-cache
docker compose up -d

echo "⏳ Waiting for backend health check..."
sleep 5
for i in {1..12}; do
    if curl -s http://localhost:8000/api/health | grep -q '"status":"ok"'; then
        echo "✅ Backend is healthy and model is loaded!"
        break
    else
        echo "Waiting for model to load in container (attempt $i/12)..."
        sleep 5
    fi
done

echo ""
echo "=================================================="
echo "🎉 AlveolaAI is running successfully!"
echo "🌐 Frontend (Web UI):  http://<EC2-PUBLIC-IP>:80"
echo "🔌 Backend API:        http://<EC2-PUBLIC-IP>:8000/api/health"
echo "=================================================="
