import Vue, { PluginObject } from 'vue';
declare global {
    interface Window {
        Vue: Vue | undefined;
    }
}
declare const VueIntersectDirective: PluginObject<never>;
export default VueIntersectDirective;
