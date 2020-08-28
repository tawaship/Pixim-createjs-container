import { updateDisplayObjectChildren, CreatejsMovieClip as MovieClip } from '@tawaship/pixi-animate-core';

/**
 * @ignore
 */
export class CreatejsMovieClip extends MovieClip {
	updateForPixi(e) {
		this.advance(e.delta);
		this._updateState();
		
		return updateDisplayObjectChildren(this, e);
	}
}