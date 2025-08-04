'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Star,
  Phone,
  ExternalLink,
  Filter,
  Shield,
  ArrowLeft,
  Diamond,
  Sparkles,
  Users,
  Award,
  Clock
} from 'lucide-react';
import Image from 'next/image';

interface Contractor {
  id: string;
  companyName: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  specialties: string[];
  rating: number;
  reviewCount: number;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  verified: boolean;
  yearsInBusiness: number | null;
  distance?: number;
}

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Sample data for demonstration
  const sampleContractors: Contractor[] = [
    {
      id: '1',
      companyName: 'Arizona Premier Construction',
      contactName: 'John Smith',
      email: 'john@azpremier.com',
      phone: '+1 (602) 555-0123',
      website: 'https://azpremier.com',
      specialties: ['Kitchen Remodeling', 'Bathroom Renovation', 'Home Additions'],
      rating: 4.9,
      reviewCount: 127,
      description: 'Premier construction services with over 15 years of experience.',
      address: '123 Main St',
      city: 'Phoenix',
      state: 'AZ',
      verified: true,
      yearsInBusiness: 15,
      distance: 2.3
    },
    {
      id: '2',
      companyName: 'Elite Electrical Solutions',
      contactName: 'Sarah Johnson',
      email: 'sarah@eliteelectric.com',
      phone: '+1 (602) 555-0456',
      website: 'https://eliteelectric.com',
      specialties: ['Smart Home Installation', 'Panel Upgrades', 'LED Lighting'],
      rating: 4.8,
      reviewCount: 89,
      description: 'Professional electrical services for residential and commercial properties.',
      address: '456 Oak Ave',
      city: 'Scottsdale',
      state: 'AZ',
      verified: true,
      yearsInBusiness: 12,
      distance: 5.7
    },
    {
      id: '3',
      companyName: 'Desert Flow Plumbing',
      contactName: 'Mike Davis',
      email: 'mike@desertflow.com',
      phone: '+1 (602) 555-0789',
      website: 'https://desertflow.com',
      specialties: ['Pipe Repair', 'Water Heater Installation', 'Drain Cleaning'],
      rating: 4.7,
      reviewCount: 203,
      description: 'Reliable plumbing services throughout the Phoenix metro area.',
      address: '789 Pine St',
      city: 'Tempe',
      state: 'AZ',
      verified: true,
      yearsInBusiness: 8,
      distance: 3.2
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setContractors(sampleContractors);
      setLoading(false);
    }, 1000);
  }, []);

  const specialties = [
    'all',
    'Kitchen Remodeling',
    'Bathroom Renovation',
    'Home Additions',
    'Smart Home Installation',
    'Panel Upgrades',
    'LED Lighting',
    'Pipe Repair',
    'Water Heater Installation',
    'Drain Cleaning'
  ];

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === 'all' ||
      contractor.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading contractors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-indigo-200 mb-6">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Verified Professionals Network</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-6">
              Find Expert Contractors
              <span className="block text-3xl text-indigo-300 mt-2">Licensed & Verified</span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Browse our curated network of licensed contractors.
              All professionals are background-checked, insured, and ready to transform your project.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search Bar */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search contractors or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Specialty Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  <option value="all" className="bg-slate-800">All Specialties</option>
                  {specialties.slice(1).map(specialty => (
                    <option key={specialty} value={specialty} className="bg-slate-800">
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {filteredContractors.length} Contractor{filteredContractors.length !== 1 ? 's' : ''} Found
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContractors.map((contractor) => (
                <div key={contractor.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-16 h-16">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      {contractor.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Shield className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{contractor.companyName}</h3>
                      <p className="text-indigo-300">{contractor.contactName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(contractor.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/70 text-sm">
                      {contractor.rating} ({contractor.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-white/70 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{contractor.city}, {contractor.state}</span>
                    </div>
                    {contractor.distance && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{contractor.distance} mi</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {contractor.specialties.slice(0, 2).map((specialty, index) => (
                      <span key={index} className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                    {contractor.specialties.length > 2 && (
                      <span className="bg-white/10 text-white/60 px-3 py-1 rounded-full text-sm">
                        +{contractor.specialties.length - 2} more
                      </span>
                    )}
                  </div>

                  <p className="text-white/80 text-sm mb-6 line-clamp-2">
                    {contractor.description}
                  </p>

                  <div className="flex space-x-3">
                    <Link
                      href={`/contractors/${contractor.id}`}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
                    >
                      View Profile
                    </Link>
                    {contractor.phone && (
                      <a
                        href={`tel:${contractor.phone}`}
                        className="bg-white/10 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                      </a>
                    )}
                    {contractor.website && (
                      <a
                        href={contractor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredContractors.length === 0 && (
            <div className="text-center py-16">
              <div className="text-white/60 mb-4">
                <Users className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No contractors found</h3>
                <p>Try adjusting your search criteria or browse all professionals.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
