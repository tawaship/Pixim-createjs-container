import * as _PIXI from 'pixi.js';
import { CreatejsMovieClip } from '../createjs/MovieClip';

namespace PIXI {
	export namespace animate {	
		/**
		 * @see http://pixijs.download/release/docs/PIXI.Container.html
		 */
		export class Container extends _PIXI.Container {
			private static _id: number = 0;
			private static _targets: { [id: number]: CreatejsMovieClip} = {};
			
			static tick(delta: number) {
				for (let i in this._targets) {
					this._targets[i].updateForPixi({ delta });
				}
			}
			
			private static _addMovieClip(cjs: CreatejsMovieClip) {
				const id: number = this._id++;
				this._targets[id] = cjs;
				
				return id;
			}
			
			private static _removeMovlieClip(id: number) {
				delete(this._targets[id]);
			}
			
			private _addCreatejs(cjs) {
				if (cjs instanceof CreatejsMovieClip) {
					const p = cjs.pixi.parent;
					
					cjs.pixi.once('added', () => {
						if (cjs.pixi.parent !== p) {
							cjs.gotoAndPlay(0);
						}
						
						const id: number = Container._addMovieClip(cjs);
						cjs.pixi.once('removed', () => {
							Container._removeMovlieClip(id);
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
export import Container = PIXI.animate.Container;