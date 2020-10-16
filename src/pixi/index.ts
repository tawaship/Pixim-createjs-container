import { initializeAnimate } from '@tawaship/pixi-animate-core';
import { CreatejsMovieClip } from '../createjs/MovieClip';

initializeAnimate({
	MovieClip: CreatejsMovieClip
});

export * from './Container';
export * from './core';