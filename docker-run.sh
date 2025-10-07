#!/bin/bash

echo "🐳 Starting BijouxKart with Docker..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.docker .env
    echo "📝 Please edit .env file with your actual credentials before running again."
    exit 1
fi

# Build and start containers
if docker-compose up --build -d; then
    echo "✅ BijouxKart is running!"
    echo "📋 Services:"
    echo "   - Application: http://localhost"
    echo "   - MongoDB: localhost:27017"
    echo ""
    echo "🔧 Management commands:"
    echo "   - View logs: docker-compose logs -f"
    echo "   - Stop: docker-compose down"
    echo "   - Restart: docker-compose restart"
else
    echo "❌ Failed to start BijouxKart containers"
    echo "Check Docker is running and try again"
    exit 1
fi

