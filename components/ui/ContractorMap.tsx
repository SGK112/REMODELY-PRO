'use client';

import { GoogleMapsLoader } from './GoogleMapsLoader';

interface ContractorMapProps {
    contractors?: any[];
    // ...existing props...
}

function ContractorMapContent({ contractors = [], ...props }: ContractorMapProps) {
    // Ensure contractors is always an array
    const safeContractors = Array.isArray(contractors) ? contractors : [];

    return (
        <div className="map-container">
            {/* Map implementation */}
            {safeContractors.map((contractor, index) => (
                <div key={contractor.id || index} className="contractor-marker">
                    {/* Contractor marker content */}
                    <span>{contractor.companyName}</span>
                </div>
            ))}
        </div>
    );
}

export function ContractorMap(props: ContractorMapProps) {
    return (
        <GoogleMapsLoader>
            <ContractorMapContent {...props} />
        </GoogleMapsLoader>
    );
}