import { IPrepareOption as _IPrepareOption, loadAssetAsync as _loadAssetAsync, ILoadAssetOption, TAnimateLibrary, prepareAnimate } from '@tawaship/pixi-animate-core';
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

namespace Pixim {
	export namespace animate {
		/**
		 * @see https://tawaship.github.io/pixi-animate-core/interfaces/iprepareoption.html
		 * @since 3.0.0
		 */
 		export interface IInitOption extends _IPrepareOption, ITickOption {}
		
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
		 * @since 3.0.0
		 * @return Returns itself for the method chaining.
		 */
		export function init(options: IInitOption) {
			if (_isInit) {
				console.warn('[Pixim-animate-container] Already initialized.');
				return Pixim.animate;
			}
			
			if (!options.ticker) {
				console.warn('[Pixim-animate-container] It may not work because no default ticker is specified.');
			}
			
			prepareAnimate(options);
			tickOption.ticker = options.ticker;
			tickOption.useDeltaTime = options.useDeltaTime;
			
			_isInit = true;
			
			return Pixim.animate;
		}
		/**
		 * Load the assets of createjs content published by Adobe Animate.
		 * If you use multiple contents, each composition ID must be unique.
		 * Please run "Pixim.animate.init" before running.
		 * @async
		 * @since 3.0.0
		 */
		export function loadAssetAsync(targets: IPrepareTarget | IPrepareTarget[]) {
			if (!_isInit) {
				throw new Error('[Pixim-animate-container] Please execute "Pixim.animate.init" first.');
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
export import init = Pixim.animate.init;

/**
 * @ignore
 */
export import loadAssetAsync = Pixim.animate.loadAssetAsync;

/**
 * @ignore
 */
export { ITickOption } from './TickOption';

/**
 * @ignore
 */
export import IInitOption = Pixim.animate.IInitOption;

/**
 * @ignore
 */
export import IPrepareTarget = Pixim.animate.IPrepareTarget;