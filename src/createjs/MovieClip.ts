import { CreatejsMovieClip as _CreatejsMovieClip, TMovieClipOriginParam as _TMovieClipOriginParam, TTickerData } from '@tawaship/pixi-animate-core';

/**
 * @ignore
 */
const P: number = 1000 / 60;

/**
 * @private
 */
type TFramerate = number | null;

/**
 * @see https://tawaship.github.io/pixi-animate-core/globals.html#tmoviecliporiginparam
 */
export type TMovieClipOriginParam = _TMovieClipOriginParam & { framerate: TFramerate };

/**
 * @see https://tawaship.github.io/pixi-animate-core/classes/createjsmovieclip.html
 */
export class CreatejsMovieClip extends _CreatejsMovieClip {
	protected _originParams: TMovieClipOriginParam;
	
	/**
	 * @override
	 * @see https://tawaship.github.io/pixi-animate-core/globals.html#ttickerdata
	 */
	updateForPixi(e: TTickerData) {
		this.advance(e.delta * P);
		
		return super.updateForPixi(e);
	}
	
	/**
	 * @override
	 */
	protected _initForPixi() {
		super._initForPixi();
		
		this._originParams.framerate = null;
	}
	
	get framerate() {
		return this._originParams.framerate;
	}
	
	/**
	 * Changes the framerate.
	 * If you enter a value that can be regarded as "false", the current value of CreatejsMovieClip.framerate will be set.
	 */
	set framerate(framerate: TFramerate) {
		this._originParams.framerate = framerate || CreatejsMovieClip._pixiFramerate;
	}
	
	private static _pixiFramerate: number = 60;
	
	static get framerate() {
		return this._pixiFramerate;
	}
	
	/**
	 * Changes the default framerate of movie clips generated after execution.
	 * However, if the framerate is set individually, the individual setting has priority.
	 */
	static set framerate(framerate: number) {
		this._pixiFramerate = Number(framerate) || 60;
	}
}