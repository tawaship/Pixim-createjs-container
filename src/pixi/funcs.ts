import { IPrepareOption as _IPrepareOption, loadAssetAsync as _loadAssetAsync, ILoadAssetOption, TAnimateLibrary, prepareAnimate } from '@tawaship/pixi-animate-core';
import * as _PIXI from 'pixi.js';
import { Container, TTickHandler } from './Container';
import { CreatejsMovieClip } from '../createjs/MovieClip';

/**
 * @ignore
 */
declare const window: any;

/**
 * @ignore
 */
let _isInit = false;

namespace PIXI {
	export namespace animate {
		/**
		 * @see https://tawaship.github.io/pixi-animate-core/interfaces/iprepareoption.html
		 * @ignore
		 * @since 3.0.0
		 */
		export interface IPrepareOption extends _IPrepareOption {
			/**
			 * Whether to advance the head of the movie clip in delta time.
			 */
			useDeltaTime?: boolean
		};
		
		/**
		 * @since 3.0.0
		 */
		export interface IPrepareTarget {
			/**
			 * "lib.properties.id" in Animate content.
			 */
			id: string;
			
			/**
			 * Directory path of Animate content.
			 */
			basepath: string;
			
			/**
			 * @see https://tawaship.github.io/pixi-animate-core/interfaces/iloadassetoption.html
			 */
			options?: ILoadAssetOption;
		};
		
		/**
		 * @ignore
		 */
		const _promises: { [name: string]: Promise<TAnimateLibrary> } = {};
		
		/**
		 * @ignore
		 */
		const _handleContainer: TTickHandler = (delta: number) => {
			Container.tick(delta);
		};
		
		_PIXI.Application.registerPlugin({
			init() {
				this.ticker.add(_handleContainer);
			},
			
			destroy() {
				this.ticker.remove(_handleContainer);
			}
		});
		
		/**
		 * @since 3.0.0
		 * @return Returns itself for the method chaining.
		 */
		export function init(options: IPrepareOption = {}) {
			if (_isInit) {
				console.warn('[pixi-animate-container] Already initialized.');
				return PIXI.animate;
			}
			
			_isInit = true;
			prepareAnimate(options);
			Container.setTickHandler(!!options.useDeltaTime);
			
			return PIXI.animate;
		}
		/**
		 * Load assets of createjs content published with Adobe Animate.
		 * If you use multiple contents, each composition id must be unique.
		 * @async
		 * @since 3.0.0
		 */
		export function loadAssetAsync(targets: IPrepareTarget | IPrepareTarget[]) {
			if (!_isInit) {
				throw new Error('[pixi-animate-container] Please execute "PIXI.animate.init" first.');
			}
			
			if (!Array.isArray(targets)) {
				targets = [targets];
			}
			
			const promises: Promise<TAnimateLibrary>[] = [];
			
			for (let i = 0; i < targets.length; i++) {
				const comp = window.AdobeAn.getComposition(targets[i].id);
				if (!comp) {
					throw new Error(`no composition: ${targets[i].id}`);
				}
			}
			
			for (let i = 0; i < targets.length; i++) {
				const target: IPrepareTarget = targets[i];
				const name = `${target.id}@${target.basepath}`;
				
				const p = _promises[name];
				if (p) {
					promises.push(p);
					continue;
				}
				
				const b = _promises[name] = 
					_loadAssetAsync(target.id, target.basepath, target.options)
						.then((lib: TAnimateLibrary) => {
							for (let i  in lib) {
								if (lib[i].prototype instanceof CreatejsMovieClip) {
									lib[i].prototype._framerateBase = lib.properties.fps;
								}
							}
							
							return lib;
						});
				
				promises.push(b);
			}
			
			return Promise.all(promises)
				.then((resolvers: TAnimateLibrary[]) => {
					if (resolvers.length === 1) {
						return resolvers[0];
					}
					
					return resolvers;
				});
		}
	}
}

/**
 * @ignore
 */
export import init = PIXI.animate.init;

/**
 * @ignore
 */
export import loadAssetAsync = PIXI.animate.loadAssetAsync;

/**
 * @ignore
 */
export import IPrepareOption = PIXI.animate.IPrepareOption;

/**
 * @ignore
 */
export import IPrepareTarget = PIXI.animate.IPrepareTarget;