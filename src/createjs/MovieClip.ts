import { updateDisplayObjectChildren, CreatejsMovieClip as MovieClip } from '@tawaship/pixi-animate-core';

/**
 * @see https://tawaship.github.io/pixi-animate-core/classes/createjsmovieclip.html
 */
namespace Pixim {
	export namespace animate {
		export declare class CreatejsMovieClip extends MovieClip {
			updateForPixi(): boolean;
		}
	}
}

/**
 * @ignore
 */
export import CreatejsMovieClip = Pixim.animate.CreatejsMovieClip;