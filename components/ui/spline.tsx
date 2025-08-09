"use client"

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Temporary fallback to test build without Spline
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-gray-500">3D Scene Placeholder</p>
        <p className="text-xs text-gray-400 mt-2">Scene: {scene}</p>
      </div>
    </div>
  )
} 