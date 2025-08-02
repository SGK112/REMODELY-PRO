#!/bin/bash

# Create directory for countertop images
mkdir -p public/images/countertops

echo "Downloading high-quality countertop images from Unsplash..."

# Granite images
curl -o public/images/countertops/granite-black-galaxy.jpg "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"
curl -o public/images/countertops/granite-white-ice.jpg "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"
curl -o public/images/countertops/granite-santa-cecilia.jpg "https://images.unsplash.com/photo-1556909114-25c8d58e4c6b?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"

# Quartz images
curl -o public/images/countertops/quartz-calacatta.jpg "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"
curl -o public/images/countertops/quartz-charcoal.jpg "https://images.unsplash.com/photo-1556909114-2d4d4d6e4f6f?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"

# Marble images
curl -o public/images/countertops/marble-carrara.jpg "https://images.unsplash.com/photo-1556909114-f6e7ad7d3137?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"
curl -o public/images/countertops/marble-nero-marquina.jpg "https://images.unsplash.com/photo-1556909195-4e5d4d6e4f6e?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"

# Kitchen scenes
curl -o public/images/countertops/kitchen-modern-granite.jpg "https://images.unsplash.com/photo-1556909114-25c8d58e4c6a?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"
curl -o public/images/countertops/kitchen-marble-traditional.jpg "https://images.unsplash.com/photo-1556909195-4e5d4d6e4f6d?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"

# Wood and concrete
curl -o public/images/countertops/wood-walnut-butcher-block.jpg "https://images.unsplash.com/photo-1556909114-f6e7ad7d3138?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"
curl -o public/images/countertops/concrete-polished.jpg "https://images.unsplash.com/photo-1556909195-4e5d4d6e4f6c?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3"

echo "Images downloaded successfully!"
echo "Gallery is ready to use with local images."
