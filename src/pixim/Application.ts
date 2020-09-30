import { prepareAnimateAsync, IPrepareOption as _IPrepareOption, TAnimateLibrary } from '@tawaship/pixi-animate-core';
import * as _Pixim from '@tawaship/pixim.js';
import { Container } from './Container';
import { CreatejsMovieClip } from '../createjs/MovieClip';

/**
 * @ignore
 */
declare const window: any;

namespace Pixim {
	export namespace animate {
		/**
		 * @see https://tawaship.github.io/pixi-animate-core/interfaces/iprepareoption.html
		 */
		export interface IPrepareOption extends _IPrepareOption {
			/**
			 * Whether to advance the head of the movie clip in delta time.
			 * @since 1.1.3
			 */
			useDeltaTime?: boolean
		};
		
		/**
		 * @deprecated 1.1.3
		 */
		export type TPlayerOption = IPrepareOption;
		
		/**
		 * @see https://tawaship.github.io/Pixim.js/classes/pixim.application.html
		 */
		export class Application extends _Pixim.Application {
			/**
			 * Prepare createjs content published with Adobe Animate.
			 * @async
			 * @param id "lib.properties.id" in Animate content.
			 * @param basepath Directory path of Animate content.
			 */
			prepareAsync(id: string, basepath: string, options: IPrepareOption = {}) {
				return prepareAnimateAsync(id, basepath, options)
					.then((lib: TAnimateLibrary) => {
						if (options.useDeltaTime) {
							this.app.ticker.add((delta: number) => {
								Container.tick(delta);
							});
						} else {
							this.app.ticker.add((delta: number) => {
								Container.tick(1);
							});
						}
						
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