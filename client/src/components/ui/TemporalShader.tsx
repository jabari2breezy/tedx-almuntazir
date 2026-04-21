/**
 * TemporalShader — "Borrowed Time" Signature Background
 * Implementation by EngineeringSeniorDeveloper
 * 
 * Features:
 * - Voronoi-based temporal erosion (time as a destructive force)
 * - TEDx Brand Color Integrity (#EB0028)
 * - Performance optimized vanilla WebGL via Three.js
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface TemporalShaderProps {
  className?: string;
  intensity?: number;
  speed?: number;
}

export function TemporalShader({
  className = "",
  intensity = 1.0,
  speed = 0.4,
}: TemporalShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uIntensity;
      uniform vec3 uColorRed;
      uniform vec3 uColorBlack;

      // Voronoi Noise Function
      vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return fract(sin(p) * 43758.5453);
      }

      float voronoi(vec2 x) {
        vec2 n = floor(x);
        vec2 f = fract(x);
        float m = 8.0;
        for (int j = -1; j <= 1; j++) {
          for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash(n + g);
            vec2 r = g + o - f;
            float d = dot(r, r);
            if (d < m) m = d;
          }
        }
        return sqrt(m);
      }

      void main() {
        vec2 uv = vUv;
        
        // Dynamic time-based scales
        float t = uTime * 0.2;
        float v1 = voronoi(uv * 3.0 + vec2(t * 0.5, t * 0.3));
        float v2 = voronoi(uv * 6.0 - vec2(t * 0.2, t * 1.1));
        
        // Erosion logic
        float combined = v1 * 0.7 + v2 * 0.3;
        float mask = smoothstep(0.3, 0.7, combined + sin(t) * 0.1);
        
        // Radial vignette for editorial feel
        float d = length(uv - 0.5) * 1.5;
        float vignette = smoothstep(1.0, 0.2, d);
        
        // Color mapping
        vec3 finalColor = mix(uColorBlack, uColorRed, mask * 0.15);
        
        // Add "glitch" highlights
        float pulse = step(0.98, fract(t * 5.0 + uv.y * 10.0));
        finalColor += uColorRed * pulse * 0.05;

        gl_FragColor = vec4(finalColor * vignette, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uColorRed: { value: new THREE.Color("#EB0028") },
      uColorBlack: { value: new THREE.Color("#000000") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const { clientWidth, clientHeight } = containerRef.current!;
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let animationFrameId: number;
    const animate = (time: number) => {
      uniforms.uTime.value = time * 0.001 * speed;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [intensity, speed]);

  return (
    <div ref={containerRef} className={`w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
