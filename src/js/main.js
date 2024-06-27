if (typeof window !== 'undefined') {
    import("./utils/EventBus")
    import("./modules/WebGL")
    if (!window.isDev) window.isDev = false;

    window.EventBus = EventBus;

    const webglMng = new WebGL({
        $wrapper: document.body
    });
}