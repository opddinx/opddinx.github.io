async function initModules() {
    if (typeof window !== 'undefined') {
        try {
            const [EventBusModule, WebGLModule] = await Promise.all([
                import("./utils/EventBus"),
                import("./modules/WebGL")
            ]);

            if (!window.isDev) window.isDev = false;

            window.EventBus = EventBusModule.default || EventBusModule;

            const WebGL = WebGLModule.default || WebGLModule;
            const webglMng = new WebGL({
                $wrapper: document.body
            });
        } catch (error) {
            console.error("Error importing modules:", error);
        }
    }
}

initModules();