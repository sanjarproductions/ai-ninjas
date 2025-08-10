"use client"

import { Suspense, lazy } from "react"

const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          {/* <p className="text-sm text-gray-500">Loading 3D Scene...</p>  */}
          {/* <p className="text-xs text-gray-400 mt-2">Scene: {scene}</p>  */}
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center ${className}`}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
            {/* <p className="text-sm text-gray-500">Loading 3D Scene...</p> */}
            {/* <p className="text-xs text-gray-400 mt-2">Scene: {scene}</p> */}
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
} 