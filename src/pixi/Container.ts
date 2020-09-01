import { prepareAnimateAsync, TPlayerOption, updateDisplayObjectChildren } from '@tawaship/pixi-animate-core';
import * as _PIXI from 'pixi.js';
import { CreatejsMovieClip } from '../createjs/MovieClip';

/**
 * @ignore
 */
declare const window: any;

namespace PIXI {
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
		 * @see http://pixijs.download/release/docs/PIXI.Container.html
		 */
		export class Container extends _PIXI.Container {
			private _createjsAnimID: number = 0;
			private _lastCreatejsAnimID: number = 0;
			private _ticker: _PIXI.Ticker;
			
			constructor(ticker: _PIXI.Ticker) {
				super();
				
				this._ticker = ticker;
			}
			
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
						
						this._ticker.add(handler);
						cjs.pixi.once('removed', () => {
							this._ticker.remove(handler);
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
export import prepareAsync = PIXI.animate.prepareAsync;

/**
 * @ignore
 */
export import Container = PIXI.animate.Container;