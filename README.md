# pixi-animate-container

"pixi-animate-container" is a plugin for using content published by Adobe Animate with "[pixi.js](https://github.com/pixijs/pixi.js)".

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---

## Core module
[@tawaship/pixi-animate-core](https://tawaship.github.io/pixi-animate-core/)

## Supported version

- A complete set of content published with Adobe Animate version 20.02 | 20.5.1
- pixi.js 5.3.2

I have not confirmed the operation on other versions.

## How to use

1. Install

```sh
git clone https://github.com/tawaship/pixi-animate-container
```

<br>

```html
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script src="/path/to/lib/pixi.5.3.2.min.js"></script>
<script src="/path/to/dist/pixi-animate-container.min.js"></script>
<script src="[your content]"></script>
```

2. Use

```javascript
const app = new PIXI.Application(
	{
		autoAdjust: true
	} // Options of Pixim.Application
);

PIXI.animate.init({
	useSynchedTimeline: true,
	useDeltaTime: false,
	useMotionGuide: false,
	ticker: app.ticker
});

PIXI.animate.loadAssetAsync([{
	id: "[conposition id]", // "lib.properties.id" in Animate content.
	basepath: "[content directory path]", // Directory path of Animate content.
	options: {
		crossOrigin: false
	}
}]).then(function(lib) {
	// If you load multiple contents, the argument "lib" will be an array and the "lib" of each content will be stored in order.
	class Root extends PIXI.animate.Container {
		constructor() {
			super();
			
			this.addCreatejs(new lib.game()); // The class you want to use.
		}
	}
	
	app.stage.addChild(new Root());
	document.body.appendChild(app.view);
});
```

## Change log

### 1.0.0

- Overrides

	|name|class|
	|:--|:--|
	|createjs.MovieClip|[CreatejsMovieClip](https://tawaship.github.io/pixi-animate-container/docs/pixim/classes/createjsmovieclip.html)|

### 3.0.0

- [remove] PIXI.animate.Application
- [add] [PIXI.animate.init](https://tawaship.github.io/pixi-animate-container/docs/pixi/modules/pixi.animate.html#init)
- [add] [PIXI.animate.loadAssetAsync](https://tawaship.github.io/pixi-animate-container/docs/pixi/modules/pixi.animate.html#loadassetasync)

## Links

[github](https://github.com/tawaship/pixi-animate-container)

[documents](https://tawaship.github.io/pixi-animate-container/docs/)

[samples](https://tawaship.github.io/pixi-animate-container/samples/)