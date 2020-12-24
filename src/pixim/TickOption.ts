import { Ticker } from 'pixi.js';

namespace Pixim {
	export namespace animate {
		export interface ITickOption {
			/**
			 * Ticker that synchronizes the processing of createjs.
			 * 
			 * [[http://pixijs.download/v5.3.2/docs/PIXI.Ticker_.html | PIXI.Ticker]]
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
export import ITickOption = Pixim.animate.ITickOption;

/**
 * @ignore
 */
export const tickOption: ITickOption = {
	ticker: null,
	useDeltaTime: false
};