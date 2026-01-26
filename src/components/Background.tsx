import React from 'react';
import WebGPUBackground from './WebGPUBackground';
import WebGLBackground from './WebGLBackground';

const Background: React.FC = () => {
    const [mode, setMode] = React.useState<'webgpu' | 'webgl' | null>(null);

    React.useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const supportsWebGPU = 'gpu' in navigator && !isIOS;
        setMode(supportsWebGPU ? 'webgpu' : 'webgl');
    }, []);

    if (!mode) {
        return null;
    }

    return mode === 'webgpu' ? <WebGPUBackground /> : <WebGLBackground />;
};

export default Background;
