import { prepareCreatejsAsync } from '@tawaship/pixi-createjs-core';
import * as _Pixim from '@tawaship/pixim.js';

/**
 * @ignore
 */
declare const window: any;

namespace Pixim {
	export namespace createjs {	
		/**
		 * @async
		 * @param id "lib.properties.id" in Animate content.
		 * @param basepath Directory path of Animate content.
		 */
		export function prepareAsync(id: string, basepath: string) {
			return prepareCreatejsAsync(id, basepath);
		}
		
		/**
		 * @see https://tawaship.github.io/Pixim.js/classes/pixim.container.html
		 */
		export class Container extends _Pixim.Container {
			private _createjsAnimID: number = 0;
			private _lastCreatejsAnimID: number = 0;
			
			addCreatejs(cjs) {
				if (cjs instanceof window.createjs.MovieClip) {
					var createjsAnimID = this._createjsAnimID++;
					
					cjs._childInstanceID = createjsAnimID;
					
					this.task.on('createjsAnim_' + createjsAnimID, function(e) {
						cjs._tick(e);
					});
				}
				
				this.addChild(cjs.getPixi());
				
				return cjs;
			}
			
			addCreatejsAt(cjs, index) {
				if (cjs instanceof window.createjs.MovieClip) {
					var createjsAnimID = this._createjsAnimID++;
					
					cjs._childInstanceID = createjsAnimID;
					
					this.task.on('createjsAnim_' + createjsAnimID, function(e) {
						cjs._tick(e);
					});
				}
				
				this.addChildAt(cjs.getPixi(), index);
				
				return cjs;
			}
			
			removeCreatejs(cjs) {
				if (cjs instanceof window.createjs.MovieClip) {
					var createjsAnimID = cjs._childInstanceID;
					
					this.task.clear('createjsAnim_' + createjsAnimID);
				}
				
				this.removeChild(cjs.getPixi());
				
				return cjs;
			}
			
			removeChildren() {
				for (var i = this._lastCreatejsAnimID; i < this._createjsAnimID; i++) {
					this.task.clear('createjsAnim_' + i);
				}
				
				this._lastCreatejsAnimID = this._createjsAnimID;
				
				return super.removeChildren.call(this);
			}
		}
	}
}

/**
 * @ignore
 */
export import prepareAsync = Pixim.createjs.prepareAsync;

/**
 * @ignore
 */
export import Container = Pixim.createjs.Container;