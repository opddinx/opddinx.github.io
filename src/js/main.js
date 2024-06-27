/* eslint-disable import/first */
import EventBus from "./utils/EventBus";
import WebGL from "./modules/WebGL";


if(!window.isDev) window.isDev = false;

if (typeof window !== 'undefined') {
    window.EventBus = EventBus;
}

const webglMng = new WebGL({
    $wrapper: document.body
});