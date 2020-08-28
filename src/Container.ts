import { prepareAnimateAsync, TPlayerOption, updateDisplayObjectChildren } from '@tawaship/pixi-animate-core';
import * as _Pixim from '@tawaship/pixim.js';
import { CreatejsMovieClip } from './createjs/MovieClip';

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
				if (cjs instanceof CreatejsMovieClip) {
					function handler(e) {
						cjs.updateForPixi(e);
					}
					
					const p = cjs.pixi.parent;
					
					cjs.pixi.once('added', () => {
						if (cjs.pixi.parent !== p) {
							cjs.gotoAndPlay(0);
						}
						
						this.task.on('createjsAnim', handler);
						cjs.pixi.once('removed', () => {
							this.task.off('createjsAnim', handler);
						});
					});
				}
			}
			
			addCreatejs(cjs) {
				this._addCreatejs(cjs);
				this.addChild(cjs.pixi);
				
				return cjs;
			}
			
			addCreatejsAt(cjs, index) {
				this._addCreatejs(cjs);
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