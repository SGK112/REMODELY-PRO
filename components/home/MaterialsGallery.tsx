'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface MaterialImage {
  id: string
  src: string
  alt: string
  title: string
  category: 'granite' | 'quartz' | 'marble' | 'butcher-block' | 'concrete' | 'kitchen-scene'
  color: string
  description: string
}

const materialImages: MaterialImage[] = [
  // Granite Options
  {
    id: 'granite-1',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Black Galaxy Granite Countertop',
    title: 'Black Galaxy Granite',
    category: 'granite',
    color: 'Black',
    description: 'Deep black granite with golden speckles, perfect for luxury kitchens'
  },
  {
    id: 'granite-2',
    src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'White Ice Granite Kitchen',
    title: 'White Ice Granite',
    category: 'granite',
    color: 'White',
    description: 'Clean white granite with subtle gray veining for modern spaces'
  },
  {
    id: 'granite-3',
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Giallo Ornamental Granite',
    title: 'Giallo Ornamental',
    category: 'granite',
    color: 'Beige',
    description: 'Warm beige granite with brown and burgundy patterns'
  },

  // Quartz Options
  {
    id: 'quartz-1',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Calacatta Quartz Countertop',
    title: 'Calacatta Quartz',
    category: 'quartz',
    color: 'White',
    description: 'Engineered quartz with dramatic white and gold veining'
  },
  {
    id: 'quartz-2',
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0b?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Charcoal Quartz Kitchen',
    title: 'Charcoal Quartz',
    category: 'quartz',
    color: 'Gray',
    description: 'Contemporary charcoal quartz with subtle texture'
  },
  {
    id: 'quartz-3',
    src: 'https://images.unsplash.com/photo-1605371924599-2d0365da1283?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Pure White Quartz',
    title: 'Pure White Quartz',
    category: 'quartz',
    color: 'White',
    description: 'Clean, minimalist white quartz perfect for modern kitchens'
  },

  // Marble Options
  {
    id: 'marble-1',
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0c?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Carrara Marble Countertop',
    title: 'Carrara Marble',
    category: 'marble',
    color: 'White',
    description: 'Classic Italian Carrara marble with distinctive gray veining'
  },
  {
    id: 'marble-2',
    src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Calacatta Gold Marble',
    title: 'Calacatta Gold',
    category: 'marble',
    color: 'White',
    description: 'Luxury marble with bold gold and gray veining'
  },

  // Kitchen Scenes - Real kitchen photos with countertops
  {
    id: 'kitchen-1',
    src: 'https://images.unsplash.com/photo-1556909114-25c8d58e4c6a?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Modern Kitchen with Granite Island',
    title: 'Modern Granite Kitchen',
    category: 'kitchen-scene',
    color: 'Multi',
    description: 'Spacious modern kitchen featuring granite countertops and island'
  },
  {
    id: 'kitchen-2',
    src: 'https://images.unsplash.com/photo-1556908114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Traditional Kitchen with Marble Counters',
    title: 'Classic Marble Kitchen',
    category: 'kitchen-scene',
    color: 'White',
    description: 'Traditional kitchen design with elegant marble countertops'
  },
  {
    id: 'kitchen-3',
    src: 'https://images.unsplash.com/photo-1556909195-2e0ba4e0b9b4?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Contemporary Quartz Kitchen',
    title: 'Contemporary Quartz',
    category: 'kitchen-scene',
    color: 'Gray',
    description: 'Sleek contemporary kitchen with waterfall quartz island'
  },

  // Butcher Block
  {
    id: 'wood-1',
    src: 'https://images.unsplash.com/photo-1585540083814-ea6ee8f76f95?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Walnut Butcher Block Countertop',
    title: 'Walnut Butcher Block',
    category: 'butcher-block',
    color: 'Brown',
    description: 'Rich walnut wood countertops for warmth and natural beauty'
  },
  {
    id: 'wood-2',
    src: 'https://images.unsplash.com/photo-1571247957316-9f223fdf0465?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Maple Butcher Block Kitchen',
    title: 'Maple Butcher Block',
    category: 'butcher-block',
    color: 'Light',
    description: 'Light maple wood counters bringing warmth to modern spaces'
  },

  // Concrete
  {
    id: 'concrete-1',
    src: 'https://images.unsplash.com/photo-1571247957316-9f223fdf0466?q=80&w=800&h=600&fit=crop&ixlib=rb-4.0.3',
    alt: 'Polished Concrete Countertop',
    title: 'Polished Concrete',
    category: 'concrete',
    color: 'Gray',
    description: 'Industrial-chic polished concrete for modern spaces'
  }
]

const categories = [
  { id: 'all', name: 'All Materials', icon: '🏠' },
  { id: 'granite', name: 'Granite', icon: '⚫' },
  { id: 'quartz', name: 'Quartz', icon: '⚪' },
  { id: 'marble', name: 'Marble', icon: '🤍' },
  { id: 'butcher-block', name: 'Wood', icon: '🟤' },
  { id: 'concrete', name: 'Concrete', icon: '🔘' },
  { id: 'kitchen-scene', name: 'Kitchens', icon: '👨‍🍳' }
]

export function MaterialsGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<MaterialImage | null>(null)

  const filteredImages = selectedCategory === 'all'
    ? materialImages
    : materialImages.filter(img => img.category === selectedCategory)

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Popular Countertop Materials
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore our curated collection of the most popular countertop materials and colors.
            Find inspiration for your next kitchen renovation project.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all border-2 ${selectedCategory === category.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                    {image.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${image.category === 'granite' ? 'bg-gray-100 text-gray-800' :
                      image.category === 'quartz' ? 'bg-blue-100 text-blue-800' :
                        image.category === 'marble' ? 'bg-purple-100 text-purple-800' :
                          image.category === 'butcher-block' ? 'bg-amber-100 text-amber-800' :
                            image.category === 'concrete' ? 'bg-slate-100 text-slate-800' :
                              'bg-green-100 text-green-800'
                    }`}>
                    {image.color}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Transform Your Kitchen?
            </h3>
            <p className="text-slate-600 mb-6">
              Connect with professional contractors who specialize in countertop installation and renovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contractors"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Find Contractors
              </Link>
              <Link
                href="/quote"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3 rounded-lg font-semibold transition-colors border border-slate-300"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged image view */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
                sizes="90vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedImage.title}
                </h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
