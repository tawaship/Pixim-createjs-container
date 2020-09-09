import { prepareAnimateAsync, TPlayerOption, TAnimateLibrary } from '@tawaship/pixi-animate-core';
import * as _Pixim from '@tawaship/pixim.js';
import { Container } from './Container';
import { CreatejsMovieClip } from '../createjs/MovieClip';

namespace Pixim {
	export namespace animate {	
		/**
		 * @see https://tawaship.github.io/Pixim.js/classes/pixim.application.html
		 */
		export class Application extends _Pixim.Application {
			/**
			 * Prepare createjs content published with Adobe Animate.
			 * @async
			 * @param id "lib.properties.id" in Animate content.
			 * @param basepath Directory path of Animate content.
			 * @see https://tawaship.github.io/pixi-animate-core/globals.html#tplayeroption
			 */
			prepareAsync(id: string, basepath: string, options: TPlayerOption = {}) {
				return prepareAnimateAsync(id, basepath, options)
					.then((lib: TAnimateLibrary) => {
						this.app.ticker.add((delta: number) => {
							Container.tick(delta);
						});
						
						CreatejsMovieClip.framerate = lib.properties.fps;
						
						return lib;
					});
			}
		}
	}
}

/**
 * @ignore
 */
export import Application = Pixim.animate.Application;