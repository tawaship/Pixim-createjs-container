import { Ticker } from 'pixi.js';

namespace PIXI {
	export namespace animate {
		/**
		 * @since 3.0.0
		 * @private
		 */
		export interface ITickOption {
			/**
			 * Ticker that synchronizes the processing of createjs.
			 * 
			 * @see http://pixijs.download/v5.3.2/docs/PIXI.Ticker_.html
			 * @since 3.0.0
			 */
			ticker?: Ticker,
			
			/**
			 * Whether to advance the head of the movie clip in delta time.
			 */
			useDeltaTime?: boolean
		};
	}
}

/**
 * @ignore
 */
export import ITickOption = PIXI.animate.ITickOption;

/**
 * @ignore
 */
export const tickOption: ITickOption = {
	ticker: null,
	useDeltaTime: false
};