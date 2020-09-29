import { prepareAnimateAsync, TPlayerOption as _TPlayerOption, TAnimateLibrary } from '@tawaship/pixi-animate-core';
import * as _PIXI from 'pixi.js';
import { Container } from './Container';
import { CreatejsMovieClip } from '../createjs/MovieClip';

/**
 * @ignore
 */
declare const window: any;

namespace PIXI {
	export namespace animate {
		/**
		 * @private
		 */
		type TPrepareOption = {
			/**
			 * Whether to advance the head of the movie clip in delta time.
			 */
			useDeltaTime?: boolean,
			
			/**
			 * Whether to use motion guides.
			 */
			useMotionGuide?: boolean
		};
		
		/**
		 * @see https://tawaship.github.io/pixi-animate-core/globals.html#tplayeroption
		 */
		export type TPlayerOption = _TPlayerOption & TPrepareOption;
		
		/**
		 * @see http://pixijs.download/release/docs/PIXI.Application.html
		 */
		export class Application extends _PIXI.Application {
			/**
			 * Prepare createjs content published with Adobe Animate.
			 * @async
			 * @param id "lib.properties.id" in Animate content.
			 * @param basepath Directory path of Animate content.
			 */
			prepareAsync(id: string, basepath: string, options: TPlayerOption = {}) {
				return prepareAnimateAsync(id, basepath, options)
					.then((lib: TAnimateLibrary) => {
						if (options.useMotionGuide) {
							window.createjs.MotionGuidePlugin.install();
						}
						
						if (options.useDeltaTime) {
							this.ticker.add((delta: number) => {
								Container.tick(delta);
							});
						} else {
							this.ticker.add((delta: number) => {
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
export import Application = PIXI.animate.Application;