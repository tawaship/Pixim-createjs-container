import { initializeAnimate } from '@tawaship/pixi-animate-core';
import { CreatejsMovieClip } from '../createjs/MovieClip';

initializeAnimate({
	MovieClip: CreatejsMovieClip
});

export * from './core';
export * from './Container';
