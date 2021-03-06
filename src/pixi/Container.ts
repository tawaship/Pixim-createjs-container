import { Ticker } from 'pixi.js';
import * as _PIXI from 'pixi.js';
import { TCreatejsObject } from '@tawaship/pixi-animate-core';
import { CreatejsMovieClip } from '../createjs/MovieClip';
import { ITickOption, tickOption } from './TickOption';

namespace PIXI {
	export namespace animate {
		export interface ICreatejsMovieClipDictionary {
			[id: number]: CreatejsMovieClip;
		}
		
		export interface ICreatejsData {
			id: number;
			targets: ICreatejsMovieClipDictionary;
			ticker?: Ticker;
		}
		
		/**
		 * [[http://pixijs.download/release/docs/PIXI.Container.html | PIXI.Container]]
		 */
		export class Container extends _PIXI.Container {
			private _createjsData: ICreatejsData;
			
			/**
			 * @param tikcer A ticker that synchronizes the processing of child createjs instances.
			 */
			constructor(ticker?: Ticker) {
				super();
				
				this._createjsData = {
					id: 0,
					targets: {},
					ticker
				};
				
				this.on('added', () => {
					this._createjsData.ticker = this._createjsData.ticker || tickOption.ticker;
					this._createjsData.ticker.add(this._handleTick, this);
				});
				
				this.on('removed', () => {
					this._createjsData.ticker.remove(this._handleTick, this);
				});
			}
			
			private _handleTick(delta: number) {
				const e = !tickOption.useDeltaTime ? { delta: 1 }: { delta };
				for (let i in this._createjsData.targets) {
					this._createjsData.targets[i].updateForPixi(e);
				}
			}
			
			private _addCreatejs(cjs: TCreatejsObject) {
				if (cjs instanceof CreatejsMovieClip) {
					const p = cjs.pixi.parent;
					
					cjs.pixi.once('added', () => {
						if (cjs.pixi.parent !== p) {
							cjs.gotoAndPlay(0);
						}
						
						const id: number = this._createjsData.id++;
						this._createjsData.targets[id] = cjs;
						
						cjs.pixi.once('removed', () => {
							delete(this._createjsData.targets[id]);
						});
					});
				}
			}
			
			/**
			 * [[https://tawaship.github.io/pixi-animate-core/globals.html#tcreatejsobject PixiAnimateCore.TCreatejsObject]]
			 */
			addCreatejs(cjs: TCreatejsObject) {
				this._addCreatejs(cjs);
				this.addChild(cjs.pixi);
				
				return cjs;
			}
			
			/**
			 * [[https://tawaship.github.io/pixi-animate-core/globals.html#tcreatejsobject PixiAnimateCore.TCreatejsObject]]
			 */
			addCreatejsAt(cjs: TCreatejsObject, index: number) {
				this._addCreatejs(cjs);
				this.addChildAt(cjs.pixi, index);
				
				return cjs;
			}
			
			/**
			 * [[https://tawaship.github.io/pixi-animate-core/globals.html#tcreatejsobject PixiAnimateCore.TCreatejsObject]]
			 */
			removeCreatejs(cjs: TCreatejsObject) {
				this.removeChild(cjs.pixi);
				
				return cjs;
			}
		}
	}
}

/**
 * @ignore
 */
export import Container = PIXI.animate.Container;