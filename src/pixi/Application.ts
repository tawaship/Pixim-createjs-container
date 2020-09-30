import { prepareAnimate } from '@tawaship/pixi-animate-core';
import * as _PIXI from 'pixi.js';
import { IPrepareOption, IPrepareTarget, loadAssetAsync } from '../common/core';
import { Container } from './Container';
import { CreatejsMovieClip } from '../createjs/MovieClip';

/**
 * @ignore
 */
declare const window: any;

namespace PIXI {
	export namespace animate {
		/**
		 * @see https://tawaship.github.io/Pixim.js/classes/pixim.application.html
		 */
		export class Application extends _PIXI.Application {
			constructor(options: IPrepareOption = {}, pixiOptions: Object = {}) {
				super(pixiOptions);
				
				prepareAnimate(options);
				
				if (options.useDeltaTime) {
					this.ticker.add((delta: number) => {
						Container.tick(delta);
					});
				} else {
					this.ticker.add((delta: number) => {
						Container.tick(1);
					});
				}
			}
			
			/**
			 * Prepare createjs content published with Adobe Animate.
			 * @see https://tawaship.github.io/pixi-animate-core/globals.html#tanimatelibrary
			 * @async
			 */
			prepareAsync(targets: IPrepareTarget | IPrepareTarget[]) {
				return loadAssetAsync(targets);
			}
		}
	}
}

/**
 * @ignore
 */
export import Application = PIXI.animate.Application;