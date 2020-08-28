# Pixim-animate-container

"Pixim-animate-container" is a plugin for using content published by Adobe Animate with "[Pixim.js](https://github.com/tawaship/Pixim.js)".

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---

## Support version

- A complete set of content published with Adobe Animate version 20.02
- pixi.js 5.3.2
- Pixim.js 1.6.1

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
<script src="/path/to/lib/Pixim.min.js"></script>
<script src="/path/to/dist/Pixim-animate-container.min.js"></script>
```

2. Prepare

```javascript
Pixim.animate.prepareAsync(
	'2FA8E0C7230941478CE2CA3DB82DBEDF', // "lib.properties.id" in Animate content.
	'game/', // Directory path of Animate content.
	{
		useSynchedTimeline: true
	}
).then(function(lib) {
	// your code
}):
```

3. Use

```javascript
const container = this.addChild(new Pixim.animate.Container());

const a = container.addCreatejs(new $.vars.lib.A());
a.y = 100;
```

## Overrides

- createjs.MovieClip = [CreatejsMovieClip](https://tawaship.github.io/Pixim-animate-container/docs/docs/classes/pixim.animate.createjsmovieclip.html)

## Samples

[github](https://tawaship.github.io/Pixim-createjs-container/samples/)