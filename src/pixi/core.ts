import { IPrepareOption as _IPrepareOption, loadAssetAsync as _loadAssetAsync, ILoadAssetOption, IAnimateLibrary, prepareAnimate } from '@tawaship/pixi-animate-core';
import { ITickOption, tickOption } from './TickOption';
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
		 * [[https://tawaship.github.io/pixi-animate-core/interfaces/iprepareoption.html | PixiAnimateCore.IPrepareOption]]
		 */
 		export interface IInitOption extends _IPrepareOption, ITickOption {}
		
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
			 * [[https://tawaship.github.io/pixi-animate-core/interfaces/iloadassetoption.html | PixiAnimateCore.ILoadAssetOption]]
			 */
			options?: ILoadAssetOption;
		};
		
		/**
		 * @ignore
		 */
		const _promises: { [name: string]: Promise<IAnimateLibrary> } = {};
		
		export function init(options: IInitOption) {
			if (_isInit) {
				console.warn('[pixi-animate-container] Already initialized.');
				return PIXI.animate;
			}
			
			if (!options.ticker) {
				console.warn('[pixi-animate-container] It may not work because no default ticker is specified.');
			}
			
			prepareAnimate(options);
			tickOption.ticker = options.ticker;
			tickOption.useDeltaTime = options.useDeltaTime;
			
			_isInit = true;
			
			return PIXI.animate;
		}
		/**
		 * Load the assets of createjs content published by Adobe Animate.
		 * If you use multiple contents, each composition ID must be unique.
		 * Please run "PIXI.animate.init" before running.
		 */
		export function loadAssetAsync(targets: IPrepareTarget | IPrepareTarget[]) {
			if (!_isInit) {
				throw new Error('[pixi-animate-container] Please execute "PIXI.animate.init" first.');
			}
			
			if (!Array.isArray(targets)) {
				targets = [targets];
			}
			
			const promises: Promise<IAnimateLibrary>[] = [];
			
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
						.then((lib: IAnimateLibrary) => {
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
				.then((resolvers: IAnimateLibrary[]) => {
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
export { ITickOption };

/**
 * @ignore
 */
export import IInitOption = PIXI.animate.IInitOption;

/**
 * @ignore
 */
export import IPrepareTarget = PIXI.animate.IPrepareTarget;