import { updateDisplayObjectChildren, CreatejsMovieClip as MovieClip, TTickerData } from '@tawaship/pixi-animate-core';

export class CreatejsMovieClip extends MovieClip {
	updateForPixi(e: TTickerData) {
		this.advance(e.delta);
		
		return super.updateForPixi(e);
	}
}