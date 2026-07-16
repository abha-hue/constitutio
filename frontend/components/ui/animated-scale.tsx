"use client"

import React, { useEffect, useRef } from "react"
import anime from "animejs"
import { cn } from "@/lib/utils"

interface AnimatedScaleProps {
  className?: string
}

export default function AnimatedScale({ className }: AnimatedScaleProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.scale-path')
    
    // Set initial stroke-dasharray and dashoffset for drawing effect
    paths.forEach((path: any) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
    })

    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1500
    })

    // 1. Move lines in from different directions
    tl.add({
      targets: '.path-1',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      strokeDashoffset: [anime.setDashoffset, 0],
      delay: 200
    }, 0)
    .add({
      targets: '.path-2',
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      strokeDashoffset: [anime.setDashoffset, 0],
    }, 400)
    .add({
      targets: '.path-3',
      translateX: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      strokeDashoffset: [anime.setDashoffset, 0],
    }, 400)

  }, [])

  return (
    <svg 
      ref={svgRef}
      className={cn("text-primary", className)}
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Pillar & Base - comes from bottom */}
      <path 
        className="scale-path path-1 opacity-0" 
        d="M 50 15 L 50 85 M 30 85 L 70 85" 
      />
      
      {/* Left arm & pan - comes from left */}
      <path 
        className="scale-path path-2 opacity-0" 
        d="M 50 25 L 25 25 L 15 50 C 15 58, 35 58, 35 50 L 25 25" 
      />
      
      {/* Right arm & pan - comes from right */}
      <path 
        className="scale-path path-3 opacity-0" 
        d="M 50 25 L 75 25 L 65 50 C 65 58, 85 58, 85 50 L 75 25" 
      />
    </svg>
  )
}
