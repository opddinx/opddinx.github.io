import React from 'react';
import WebGPUBackground from './WebGPUBackground';
import WebGLBackground from './WebGLBackground';
import LensFlareOverlay from './LensFlareOverlay';

const Background: React.FC = () => {
    const [mode, setMode] = React.useState<'webgpu' | 'webgl' | null>(null);

    React.useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const supportsWebGPU = 'gpu' in navigator && !isIOS;
        setMode(supportsWebGPU ? 'webgpu' : 'webgl');
    }, []);

    React.useEffect(() => {
        const root = document.documentElement;
        let rafId = 0;
        let start = 0;
        let lastFrame = 0;

        const animate = (time: number) => {
            if (!start) {
                start = time;
            }
            if (time - lastFrame < 33) {
                rafId = window.requestAnimationFrame(animate);
                return;
            }
            lastFrame = time;
            const t = (time - start) * 0.00012;
            const x = 35 + Math.sin(t * 3.1) * 24;
            const y = 60 + Math.cos(t * 2.6) * 18;
            root.style.setProperty('--leak-x', `${x.toFixed(2)}%`);
            root.style.setProperty('--leak-y', `${y.toFixed(2)}%`);
            rafId = window.requestAnimationFrame(animate);
        };

        rafId = window.requestAnimationFrame(animate);

        return () => {
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    if (!mode) {
        return null;
    }

    return (
        <>
            {mode === 'webgpu' ? <WebGPUBackground /> : <WebGLBackground />}
            <LensFlareOverlay />
        </>
    );
};

export default Background;
