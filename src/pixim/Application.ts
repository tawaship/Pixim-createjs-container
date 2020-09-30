import { prepareAnimate } from '@tawaship/pixi-animate-core';
import * as _Pixim from '@tawaship/pixim.js';
import { IPrepareOption, IPrepareTarget, loadAssetAsync } from '../common/core';
import { Container } from './Container';
import { CreatejsMovieClip } from '../createjs/MovieClip';

namespace Pixim {
	export namespace animate {
		/**
		 * @see https://tawaship.github.io/Pixim.js/classes/pixim.application.html
		 */
		export class Application extends _Pixim.Application {
			constructor(options: IPrepareOption = {}, pixiOptions: Object = {}, piximOptions: _Pixim.TApplicationOption = {}) {
				super(pixiOptions, piximOptions);
				
				prepareAnimate(options);
				
				if (options.useDeltaTime) {
					this.app.ticker.add((delta: number) => {
						Container.tick(delta);
					});
				} else {
					this.app.ticker.add((delta: number) => {
						Container.tick(1);
					});
				}
			}
			
			/**
			 * Prepare createjs content published with Adobe Animate.
			 * @async
			 * @param id "lib.properties.id" in Animate content.
			 * @param basepath Directory path of Animate content.
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
export import Application = Pixim.animate.Application;