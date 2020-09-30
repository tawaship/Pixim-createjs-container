import { CreatejsMovieClip as _CreatejsMovieClip, TTickerData } from '@tawaship/pixi-animate-core';

/**
 * @ignore
 */
const P: number = 1000 / 60;

/**
 * @ignore
 */
const Q: number = P / 60;

/**
 * @private
 */
type TFramerate = number | null;

/**
 * @ignore
 */
const DEF_FRAMERATE = 60;

/**
 * @private
 * @see https://tawaship.github.io/pixi-animate-core/classes/createjsmovieclip.html
 */
export class CreatejsMovieClip extends _CreatejsMovieClip {
	declare private _framerateBase: number;
	
	constructor(...args: any[]) {
		super(...arguments);
		
		this.framerate = this._framerateBase;
	}
	
	initialize(...args: any[]) {
		super.initialize(...arguments);
		
		this.framerate = this._framerateBase;
	}
	
	/**
	 * @override
	 */
	protected _updateForPixiSynched(e: TTickerData) {
		this.advance(e.delta * P);
		
		return super._updateForPixiSynched(e);
	}
	
	/**
	 * @override
	 */
	protected _updateForPixiUnsynched(e: TTickerData) {
		return super._updateForPixiUnsynched({
			delta: e.delta * Q * this.framerate
		});
	}
}