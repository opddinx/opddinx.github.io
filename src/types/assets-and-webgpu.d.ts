declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.ico' {
    const src: string;
    export default src;
}

interface Navigator {
    gpu?: GPU;
}

type GPUTexture = any;
type GPUTextureView = any;
type GPUDevice = any;
type GPUCanvasContext = any;
type GPUTextureFormat = any;
type GPUBindGroupLayout = any;
type GPUBuffer = any;
type GPUCommandEncoder = any;

declare const GPUTextureUsage: any;
declare const GPUBufferUsage: any;
declare const GPUShaderStage: any;
