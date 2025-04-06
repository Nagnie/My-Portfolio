"use client"

import * as React from "react"
import { X } from "lucide-react"

interface MapModalProps {
    isOpen: boolean
    onClose: () => void
    address: string
}

export function MapModal({ isOpen, onClose, address }: MapModalProps) {
    if (!isOpen) return null

    // Encode the address for the Google Maps URL
    const encodedAddress = encodeURIComponent(address)
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`

    // For demo purposes, we'll use a placeholder
    const placeholderSrc = `/api/placeholder/600/400`

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-3xl rounded-lg bg-white p-6">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                    aria-label="Close map"
                >
                    <X size={20} />
                </button>

                <h3 className="mb-4 text-lg font-medium">Location</h3>
                <p className="mb-4 text-sm text-muted-foreground">{address}</p>

                <div className="h-[400px] w-full overflow-hidden rounded-md border">
                    {/* In a real implementation, you would use the Google Maps iframe */}
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-center text-sm text-muted-foreground">
                        <div>
                            <p className="mb-2">Map would display here with Google Maps API</p>
                            <p>Address: {address}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}