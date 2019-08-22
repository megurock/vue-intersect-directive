import IntersectDirective from './intersect-directive';
import Vue, { PluginObject } from 'vue';
declare global {
    interface Window {
        Vue: Vue | undefined;
    }
}
declare const VueIntersect: PluginObject<never>;
export { IntersectDirective };
export default VueIntersect;
