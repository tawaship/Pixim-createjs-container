import { prepareAnimateAsync, TPlayerOption, updateDisplayObjectChildren } from '@tawaship/pixi-animate-core';
import * as _Pixim from '@tawaship/pixim.js';

/**
 * @ignore
 */
declare const window: any;

namespace Pixim {
	export namespace animate {	
		/**
		 * Prepare createjs content published with Adobe Animate.
		 * @async
		 * @param id "lib.properties.id" in Animate content.
		 * @param basepath Directory path of Animate content.
		 */
		export function prepareAsync(id: string, basepath: string, options: TPlayerOption = {}) {
			return prepareAnimateAsync(id, basepath, options);
		}
		
		/**
		 * @see https://tawaship.github.io/Pixim.js/classes/pixim.container.html
		 */
		export class Container extends _Pixim.Container {
			private _createjsAnimID: number = 0;
			private _lastCreatejsAnimID: number = 0;
			
			_addCreatejs(cjs) {
				
			}
			
			addCreatejs(cjs) {
				if (cjs instanceof window.createjs.MovieClip) {
					function handler(e) {
						cjs.updateForPixi(e);
					}
					
//					this.removeChild(cj);
					
					this.task.on('createjsAnim', handler);
					
					this.once('removed', () => {
						this.task.off('createjsAnim', handler);
					});
				}
				
				this.addChild(cjs.pixi);
				
				return cjs;
			}
			
			addCreatejsAt(cjs, index) {
				if (cjs instanceof window.createjs.MovieClip) {
					function handler(e) {
						cjs.updateForPixi(e);
					}
					
					this.task.on('createjsAnim' ,handler);
					
					this.once('removed', () => {
						this.task.off('createjsAnim', handler);
					});
				}
				
				this.addChildAt(cjs.pixi, index);
				
				return cjs;
			}
			
			removeCreatejs(cjs) {
				this.removeChild(cjs.pixi);
				
				return cjs;
			}
		}
	}
}

/**
 * @ignore
 */
export import prepareAsync = Pixim.animate.prepareAsync;

/**
 * @ignore
 */
export import Container = Pixim.animate.Container;