import intersectDirective from './intersect-directive';
import Vue, { PluginObject } from 'vue';
declare global {
    interface Window {
        Vue: Vue | undefined;
    }
}
declare const VueIntersect: PluginObject<never>;
export { intersectDirective as IntersectDirective };
export default VueIntersect;
