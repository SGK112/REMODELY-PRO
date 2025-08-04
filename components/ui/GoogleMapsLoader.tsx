'use client';

import { useState, useEffect, ReactNode } from 'react';
import { loadGoogleMapsAsync } from '@/lib/maps';

interface GoogleMapsLoaderProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function GoogleMapsLoader({ children, fallback }: GoogleMapsLoaderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadGoogleMapsAsync()
            .then(() => setIsLoaded(true))
            .catch((err) => {
                console.error('Google Maps loading error:', err);
                setError(err.message);
            });
    }, []);

    if (error) {
        return (
            <div className="p-4 text-center text-gray-500">
                Failed to load Google Maps. Please refresh the page.
            </div>
        );
    }

    if (!isLoaded) {
        return fallback || (
            <div className="p-4 text-center text-gray-500">
                Loading Maps...
            </div>
        );
    }

    return <>{children}</>;
}
