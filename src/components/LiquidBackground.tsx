import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import THREE, { ShaderMaterial, Vector2 } from 'three'

const LiquidShader = {
    uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2() },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    fragmentShader: `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    float t = uTime * 2.0;
    vec3 color = vec3(0.0);
    
    for(float i = 0.0; i < 3.0; i++) {
        p.x += 0.3 / (i + 1.0) * sin(i * 3.0 * p.y + t + i * 0.5) + 0.5;
        p.y += 0.4 / (i + 1.0) * cos(i * 2.5 * p.x + t + i * 0.5) + 0.5;
    }
    
    color = vec3(0.6 * sin(p.x) + 0.4, 0.3 * sin(p.y) + 0.7, sin(p.x + p.y));
    
    gl_FragColor = vec4(color, 0.2);
        }
    `,
}

const LiquidPlane: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null)
    const shaderRef = useRef<ShaderMaterial>(null)
    const { size } = useThree()

    const shaderArgs = useMemo(
        () => ({
            uniforms: LiquidShader.uniforms,
            vertexShader: LiquidShader.vertexShader,
            fragmentShader: LiquidShader.fragmentShader,
            transparent: true,
        }),
        []
    )

    useEffect(() => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uResolution.value.set(size.width, size.height)
        }
    }, [size])

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 8]} />
            <shaderMaterial ref={shaderRef} args={[shaderArgs]} />
        </mesh>
    )
}

const LiquidBackground: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // or a loading placeholder
    }

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas>
                <LiquidPlane />
            </Canvas>
        </div>
    )
}

export default LiquidBackground;