import { CreatejsMovieClip as _CreatejsMovieClip, TTickerData } from '@tawaship/pixi-animate-core';

/**
 * @ignore
 */
const P: number = 1000 / 60;

/**
 * @private
 */
type TFramerate = number | null;

/**
 * @see https://tawaship.github.io/pixi-animate-core/classes/createjsmovieclip.html
 */
export class CreatejsMovieClip extends _CreatejsMovieClip {
	/**
	 * @override
	 * @see https://tawaship.github.io/pixi-animate-core/globals.html#ttickerdata
	 */
	updateForPixi(e: TTickerData) {
		const f = this.framerate;
		
		this.framerate = f || CreatejsMovieClip._pixiFramerate;
		this.advance(e.delta * P);
		this.framerate = f;
		
		return super.updateForPixi(e);
	}
	
	/**
	 * Current framerate.
	 * If you enter a value that be falsy, the current value of CreatejsMovieClip.framerate will be set.
	 */
	declare framerate: TFramerate;
	
	private static _pixiFramerate: number = 60;
	
	static get framerate() {
		return this._pixiFramerate;
	}
	
	/**
	 * Change the default frame rate for all movie clips.
	 * However, if the framerate is set individually, the individual setting has priority.
	 */
	static set framerate(framerate: number) {
		this._pixiFramerate = Number(framerate) || 60;
	}
}