# pixi-animate-container

"pixi-animate-container" is a plugin for using content published by Adobe Animate with "[pixi.js](https://github.com/pixijs/pixi.js)".

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---

## Core module
[pixi-animate-core](https://tawaship.github.io/pixi-animate-core/)

## Support version

- A complete set of content published with Adobe Animate version 20.02 / 20.5.1
- pixi.js 5.3.2

I have not confirmed the operation on other versions.

## How to use

1. Install

```sh
git clone https://github.com/tawaship/Pixim-animate-container
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
const app = new PIXI.animate.Application();

app.prepareAsync(
	"[conposition id]", // "lib.properties.id" in Animate content.
	"[content directory path]", // Directory path of Animate content.
	{
		useSynchedTimeline: true,
		crossOrigin: false,
		useDeltaTime: false,
		useMotionGuide: false
	}
).then(function(lib) {
	class Root extends PIXI.Container {
		constructor() {
			super();
			
			const container = this.addChild(new PIXI.animate.Container(app.ticker));
			
			const cls = lib.game; // The class you want to use.
			container.addCreatejs(new cls());
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
|createjs.MovieClip|[CreatejsMovieClip](https://tawaship.github.io/Pixim-animate-container/docs/pixim/classes/createjsmovieclip.html)|

## Links

[github](https://github.com/tawaship/Pixim-animate-container)

[documents](https://tawaship.github.io/Pixim-animate-container/docs/)

[samples](https://tawaship.github.io/Pixim-animate-container/samples/)