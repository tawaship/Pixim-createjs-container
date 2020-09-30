import { IPrepareOption as _IPrepareOption, loadAssetAsync as _loadAssetAsync, ILoadAssetOption, TAnimateLibrary } from '@tawaship/pixi-animate-core';
import { CreatejsMovieClip } from '../createjs/MovieClip';

/**
 * @ignore
 */
declare const window: any;

/**
 * @see https://tawaship.github.io/pixi-animate-core/interfaces/iprepareoption.html
 * @private
 * @since 1.2.0
 */
export interface IPrepareOption extends _IPrepareOption {
	/**
	 * Whether to advance the head of the movie clip in delta time.
	 */
	useDeltaTime?: boolean
};

/**
 * @private
 * @since 2.0.0
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
 * Load assets of createjs content published with Adobe Animate.
 * If you use multiple contents, each composition id must be unique.
 * @async
 * @since 2.0.0
 * @ignore
 */
export function loadAssetAsync(targets: IPrepareTarget | IPrepareTarget[]): Promise<TAnimateLibrary | TAnimateLibrary[]> {
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