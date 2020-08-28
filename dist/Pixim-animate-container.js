/*!
 * @tawaship/pixim-animate-container.js - v1.0.0
 * 
 * @require pixi.js v5.3.2
 * @require @tawaship/pixim.js v1.6.1
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */
this.Pixim = this.Pixim || {}, function(exports, pixi_js, _Pixim) {
    "use strict";
    /*!
	 * @tawaship/pixi-animate-core.js - v1.0.5
	 * 
	 * @require pixi.js v5.3.2
	 * @author tawaship (makazu.mori@gmail.com)
	 * @license MIT
	 */    function createPixiData(regObj) {
        return {
            regObj: regObj,
            events: {}
        };
    }
    function updateDisplayObjectChildren(self, e) {
        for (var list = self.children.slice(), i = 0, l = list.length; i < l; i++) {
            var child = list[i];
            child.isVisible() && child.updateForPixi(e);
        }
        return !0;
    }
    var CreatejsStageGL = function(superclass) {
        function CreatejsStageGL() {
            superclass.apply(this, arguments);
        }
        return superclass && (CreatejsStageGL.__proto__ = superclass), CreatejsStageGL.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsStageGL.prototype.constructor = CreatejsStageGL, CreatejsStageGL.prototype.updateForPixi = function(props) {
            this.tickOnUpdate && this.tick(props), this.dispatchEvent("drawstart"), updateDisplayObjectChildren(this), 
            this.dispatchEvent("drawend");
        }, CreatejsStageGL;
    }(window.createjs.StageGL), _isDown = !1, EventMap = {
        mousedown: {
            types: [ "pointerdown" ],
            factory: function(self, cb) {
                return function(e) {
                    e.currentTarget = e.currentTarget.createjs, e.target = e.target.createjs;
                    var ev = e.data;
                    e.rawX = ev.global.x, e.rawY = ev.global.y, _isDown = !0, cb(e);
                };
            }
        },
        rollover: {
            types: [ "pointerover" ],
            factory: function(self, cb) {
                return function(e) {
                    e.currentTarget = e.currentTarget.createjs, e.target = e.target.createjs;
                    var ev = e.data;
                    e.rawX = ev.global.x, e.rawY = ev.global.y, _isDown = !0, cb(e);
                };
            }
        },
        rollout: {
            types: [ "pointerout" ],
            factory: function(self, cb) {
                return function(e) {
                    e.currentTarget = e.currentTarget.createjs, e.target = e.currentTarget.createjs;
                    var ev = e.data;
                    e.rawX = ev.global.x, e.rawY = ev.global.y, _isDown = !0, cb(e);
                };
            }
        },
        pressmove: {
            types: [ "pointermove" ],
            factory: function(self, cb) {
                return function(e) {
                    if (_isDown) {
                        e.currentTarget = self, e.target = e.target && e.target.createjs;
                        var ev = e.data;
                        e.rawX = ev.global.x, e.rawY = ev.global.y, cb(e);
                    }
                };
            }
        },
        pressup: {
            types: [ "pointerup", "pointeupoutside" ],
            factory: function(self, cb) {
                return function(e) {
                    if (_isDown) {
                        e.currentTarget = self, _isDown = !1, e.target = e.target && e.target.createjs;
                        var ev = e.data;
                        e.rawX = ev.global.x, e.rawY = ev.global.y, cb(e);
                    }
                };
            }
        }
    }, DEG_TO_RAD$1 = Math.PI / 180, appendixDescriptor = {
        x: {
            get: function() {
                return this._originParams.x;
            },
            set: function(value) {
                return this._pixiData.instance.x = value, this._originParams.x = value;
            }
        },
        y: {
            get: function() {
                return this._originParams.y;
            },
            set: function(value) {
                return this._pixiData.instance.y = value, this._originParams.y = value;
            }
        },
        scaleX: {
            get: function() {
                return this._originParams.scaleX;
            },
            set: function(value) {
                return this._pixiData.instance.scale.x = value, this._originParams.scaleX = value;
            }
        },
        scaleY: {
            get: function() {
                return this._originParams.scaleY;
            },
            set: function(value) {
                return this._pixiData.instance.scale.y = value, this._originParams.scaleY = value;
            }
        },
        skewX: {
            get: function() {
                return this._originParams.skewX;
            },
            set: function(value) {
                return this._pixiData.instance.skew.x = -value * DEG_TO_RAD$1, this._originParams.skewX = value;
            }
        },
        skewY: {
            get: function() {
                return this._originParams.skewY;
            },
            set: function(value) {
                return this._pixiData.instance.skew.y = value * DEG_TO_RAD$1, this._originParams.skewY = value;
            }
        },
        regX: {
            get: function() {
                return this._originParams.regX;
            },
            set: function(value) {
                return this._pixiData.regObj.x = value, this._originParams.regX = value;
            }
        },
        regY: {
            get: function() {
                return this._originParams.regY;
            },
            set: function(value) {
                return this._pixiData.regObj.y = value, this._originParams.regY = value;
            }
        },
        rotation: {
            get: function() {
                return this._originParams.rotation;
            },
            set: function(value) {
                return this._pixiData.instance.rotation = value * DEG_TO_RAD$1, this._originParams.rotation = value;
            }
        },
        visible: {
            get: function() {
                return this._originParams.visible;
            },
            set: function(value) {
                return value = !!value, this._pixiData.instance.visible = value, this._originParams.visible = value;
            }
        },
        alpha: {
            get: function() {
                return this._originParams.alpha;
            },
            set: function(value) {
                return this._pixiData.instance.alpha = value, this._originParams.alpha = value;
            }
        },
        _off: {
            get: function() {
                return this._originParams._off;
            },
            set: function(value) {
                return this._pixiData.instance.renderable = !value, this._originParams._off = value;
            }
        },
        addEventListener: {
            value: function(type, cb) {
                if (cb instanceof Function) {
                    if (type in EventMap) {
                        for (var ev = EventMap[type], func = ev.factory(this, cb), types = ev.types, i = 0; i < types.length; i++) {
                            var t = types[i];
                            this._pixiData.events[t] = this._pixiData.events[t] || [], this._pixiData.events[t].push({
                                func: func,
                                origin: cb
                            }), this._pixiData.instance.on(t, func);
                        }
                        this._pixiData.instance.interactive = !0;
                    }
                    return window.createjs.DisplayObject.prototype.addEventListener.apply(this, arguments);
                }
            }
        },
        removeEventListener: {
            value: function(type, cb) {
                if (type in EventMap) {
                    for (var ev = EventMap[type], types = ev.types, i = 0; i < types.length; i++) {
                        var t = types[i], list = this._pixiData.events[t];
                        if (list) {
                            for (var j = list.length - 1; j >= 0; j--) {
                                if (list[j].origin === cb) {
                                    this._pixiData.instance.off(t, list[j].func), list.splice(j, 1);
                                    break;
                                }
                            }
                            0 === list.length && delete this._pixiData.events[t];
                        }
                    }
                }
                var res = window.createjs.DisplayObject.prototype.removeEventListener.apply(this, arguments), listeners = this._listeners;
                if (!listeners) {
                    return res;
                }
                for (var i$1 in EventMap) {
                    if (listeners[i$1] && listeners[i$1].length > 0) {
                        break;
                    }
                }
                return res;
            }
        },
        removeAllEventListeners: {
            value: function(type) {
                return this._pixiData.instance.removeAllListeners(type), this._pixi.instance.interactive = !1, 
                this._pixiData.events = {}, window.createjs.DisplayObject.prototype.removeAllEventListeners.apply(this, arguments);
            }
        },
        mask: {
            get: function() {
                return this._originParams.mask;
            },
            set: function(value) {
                return value ? (value._pixiData.masked.push(this._pixiData.instance), this._pixiData.instance.mask = value._pixiData.instance, 
                this._pixiData.instance.once("added", (function() {
                    this.parent.addChild(value._pixiData.instance);
                }))) : this._pixiData.instance.mask = null, this._originParams.mask = value;
            }
        },
        filters: {
            get: function() {
                return this._originParams.filters;
            },
            set: function(value) {
                if (this._pixiData.subInstance) {
                    if (value) {
                        for (var list = [], i = 0; i < value.length; i++) {
                            var f = value[i];
                            if (!(f instanceof createjs.ColorMatrixFilter)) {
                                var m = new PIXI.filters.ColorMatrixFilter;
                                m.matrix = [ f.redMultiplier, 0, 0, 0, f.redOffset / 255, 0, f.greenMultiplier, 0, 0, f.greenOffset / 255, 0, 0, f.blueMultiplier, 0, f.blueOffset / 255, 0, 0, 0, f.alphaMultiplier, f.alphaOffset / 255, 0, 0, 0, 0, 1 ], 
                                list.push(m);
                            }
                        }
                        for (var o = this._pixiData.instance, c = o.children, n = new PIXI.Container, nc = this._pixiData.subInstance = n.addChild(new PIXI.Container); c.length; ) {
                            nc.addChild(c[0]);
                        }
                        o.addChild(n), o._filterContainer = nc, nc.updateTransform(), nc.calculateBounds();
                        var b = nc.getLocalBounds(), x = b.x, y = b.y;
                        for (i = 0; i < nc.children.length; i++) {
                            nc.children[i].x -= x, nc.children[i].y -= y, nc.children[i]._filterContainer && (nc.children[i]._filterContainer.cacheAsBitmap = !1);
                        }
                        n.x = x, n.y = y, nc.filters = list, nc.cacheAsBitmap = !0;
                    } else {
                        var o$1 = this._pixiData.instance;
                        if (o$1._filterContainer) {
                            var nc$1 = this._pixiData.subInstance, n$1 = nc$1.parent, c$1 = nc$1.children;
                            for (o$1.removeChildren(), o$1._filterContainer = null; c$1.length; ) {
                                var v = o$1.addChild(c$1[0]);
                                v.x += n$1.x, v.y += n$1.y;
                            }
                            nc$1.filters = null, nc$1.cacheAsBitmap = !1, this._pixiData.subInstance = o$1;
                        }
                    }
                }
                return this._originParams.filters = value;
            }
        }
    };
    function appendDisplayObjectDescriptor(cls) {
        Object.defineProperties(cls.prototype, appendixDescriptor);
    }
    var PixiMovieClip = function(Container) {
        function PixiMovieClip(cjs) {
            Container.call(this), this._createjs = cjs;
        }
        Container && (PixiMovieClip.__proto__ = Container), PixiMovieClip.prototype = Object.create(Container && Container.prototype), 
        PixiMovieClip.prototype.constructor = PixiMovieClip;
        var prototypeAccessors = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiMovieClip.prototype, prototypeAccessors), PixiMovieClip;
    }(pixi_js.Container);
    function createMovieClipPixiData(cjs) {
        var pixi = new PixiMovieClip(cjs);
        return Object.assign(createPixiData(pixi.pivot), {
            instance: pixi,
            subInstance: pixi
        });
    }
    var CreatejsMovieClip = function(superclass) {
        function CreatejsMovieClip() {
            this._originParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regx: 0,
                regy: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null,
                filters: null
            }, this._pixiData = createMovieClipPixiData(this), superclass.apply(this, arguments);
        }
        superclass && (CreatejsMovieClip.__proto__ = superclass), CreatejsMovieClip.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsMovieClip.prototype.constructor = CreatejsMovieClip;
        var prototypeAccessors$1 = {
            pixi: {
                configurable: !0
            }
        };
        return CreatejsMovieClip.prototype.initialize = function() {
            return this._originParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regx: 0,
                regy: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null,
                filters: null
            }, this._pixiData = createMovieClipPixiData(this), superclass.prototype.initialize.apply(this, arguments);
        }, CreatejsMovieClip.prototype.addChild = function(child) {
            return this._pixiData.subInstance.addChild(child._pixiData.instance), superclass.prototype.addChild.call(this, child);
        }, CreatejsMovieClip.prototype.addChildAt = function(child, index) {
            return this._pixiData.subInstance.addChildAt(child._pixiData.instance, index), superclass.prototype.addChildAt.call(this, child, index);
        }, CreatejsMovieClip.prototype.removeChild = function(child) {
            return this._pixiData.subInstance.removeChild(child._pixiData.instance), superclass.prototype.removeChild.call(this, child);
        }, CreatejsMovieClip.prototype.removeChildAt = function(index) {
            return this._pixiData.subInstance.removeChildAt(index), superclass.prototype.removeChildAt.call(this, index);
        }, CreatejsMovieClip.prototype.removeAllChldren = function() {
            return this._pixiData.subInstance.removeChildren(), superclass.prototype.removeAllChldren.call(this);
        }, prototypeAccessors$1.pixi.get = function() {
            return this._pixiData.instance;
        }, CreatejsMovieClip.prototype.updateForPixi = function(e) {
            return this._updateState(), updateDisplayObjectChildren(this, e);
        }, Object.defineProperties(CreatejsMovieClip.prototype, prototypeAccessors$1), CreatejsMovieClip;
    }(window.createjs.MovieClip);
    appendDisplayObjectDescriptor(CreatejsMovieClip);
    var PixiSprite = function(Sprite) {
        function PixiSprite(cjs) {
            Sprite.call(this), this._createjs = cjs;
        }
        Sprite && (PixiSprite.__proto__ = Sprite), PixiSprite.prototype = Object.create(Sprite && Sprite.prototype), 
        PixiSprite.prototype.constructor = PixiSprite;
        var prototypeAccessors$2 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$2.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiSprite.prototype, prototypeAccessors$2), PixiSprite;
    }(pixi_js.Sprite);
    function createSpritePixiData(cjs) {
        var pixi = new PixiSprite(cjs);
        return Object.assign(createPixiData(pixi.anchor), {
            instance: pixi
        });
    }
    var CreatejsSprite = function(superclass) {
        function CreatejsSprite() {
            this._originParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regx: 0,
                regy: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null,
                filters: null
            }, this._pixiData = createSpritePixiData(this), superclass.apply(this, arguments);
        }
        superclass && (CreatejsSprite.__proto__ = superclass), CreatejsSprite.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsSprite.prototype.constructor = CreatejsSprite;
        var prototypeAccessors$3 = {
            pixi: {
                configurable: !0
            }
        };
        return CreatejsSprite.prototype.initialize = function() {
            return this._originParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regx: 0,
                regy: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null,
                filters: null
            }, this._pixiData = createSpritePixiData(this), superclass.prototype.initialize.apply(this, arguments);
        }, CreatejsSprite.prototype.gotoAndStop = function() {
            superclass.prototype.gotoAndStop.apply(this, arguments);
            var frame = this.spriteSheet.getFrame(this.currentFrame), baseTexture = pixi_js.BaseTexture.from(frame.image), texture = new pixi_js.Texture(baseTexture, frame.rect);
            this._pixiData.instance.texture = texture;
        }, prototypeAccessors$3.pixi.get = function() {
            return this._pixiData.instance;
        }, CreatejsSprite.prototype.updateForPixi = function() {
            return !0;
        }, Object.defineProperties(CreatejsSprite.prototype, prototypeAccessors$3), CreatejsSprite;
    }(window.createjs.Sprite);
    appendDisplayObjectDescriptor(CreatejsSprite);
    var PixiShape = function(Container) {
        function PixiShape(cjs) {
            Container.call(this), this._createjs = cjs;
        }
        Container && (PixiShape.__proto__ = Container), PixiShape.prototype = Object.create(Container && Container.prototype), 
        PixiShape.prototype.constructor = PixiShape;
        var prototypeAccessors$4 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$4.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiShape.prototype, prototypeAccessors$4), PixiShape;
    }(pixi_js.Container);
    function createShapePixiData(cjs) {
        var pixi = new PixiShape(cjs);
        return Object.assign(createPixiData(pixi.pivot), {
            instance: pixi,
            masked: []
        });
    }
    var CreatejsShape = function(superclass) {
        function CreatejsShape() {
            this._originParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regx: 0,
                regy: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null,
                filters: null
            }, this._pixiData = createShapePixiData(this), superclass.apply(this, arguments);
        }
        superclass && (CreatejsShape.__proto__ = superclass), CreatejsShape.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsShape.prototype.constructor = CreatejsShape;
        var prototypeAccessors$5 = {
            graphics: {
                configurable: !0
            },
            pixi: {
                configurable: !0
            }
        };
        return prototypeAccessors$5.graphics.get = function() {
            return this._graphics;
        }, prototypeAccessors$5.graphics.set = function(value) {
            if (this._pixiData.masked.length) {
                if (this._pixiData.instance.removeChildren(), value) {
                    for (var i = 0; i < this._pixiData.masked.length; i++) {
                        this._pixiData.masked[i].mask = this._pixiData.instance;
                    }
                } else {
                    for (var i$1 = 0; i$1 < this._pixiData.masked.length; i$1++) {
                        this._pixiData.masked[i$1].mask = null;
                    }
                }
            }
            value && this._pixiData.instance.addChild(value._pixiData.instance), this._graphics = value;
        }, prototypeAccessors$5.pixi.get = function() {
            return this._pixiData.instance;
        }, CreatejsShape.prototype.updateForPixi = function() {
            return !0;
        }, Object.defineProperties(CreatejsShape.prototype, prototypeAccessors$5), CreatejsShape;
    }(window.createjs.Shape);
    appendDisplayObjectDescriptor(CreatejsShape);
    var PixiGraphics = function(Graphics) {
        function PixiGraphics(cjs) {
            Graphics.call(this), this._createjs = cjs;
        }
        Graphics && (PixiGraphics.__proto__ = Graphics), PixiGraphics.prototype = Object.create(Graphics && Graphics.prototype), 
        PixiGraphics.prototype.constructor = PixiGraphics;
        var prototypeAccessors$6 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$6.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiGraphics.prototype, prototypeAccessors$6), PixiGraphics;
    }(pixi_js.Graphics);
    function createGraphicsPixiData(cjs) {
        var pixi = new PixiGraphics(cjs);
        return Object.assign(createPixiData(pixi.pivot), {
            instance: pixi,
            strokeFill: 0,
            strokeAlpha: 1
        });
    }
    var LineCap = {
        0: pixi_js.LINE_CAP.BUTT,
        1: pixi_js.LINE_CAP.ROUND,
        2: pixi_js.LINE_CAP.SQUARE
    }, LineJoin = {
        0: pixi_js.LINE_JOIN.MITER,
        1: pixi_js.LINE_JOIN.ROUND,
        2: pixi_js.LINE_JOIN.BEVEL
    }, CreatejsGraphics = function(superclass) {
        function CreatejsGraphics() {
            this._originParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regx: 0,
                regy: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null,
                filters: null
            }, this._pixiData = createGraphicsPixiData(this), superclass.apply(this, arguments), 
            this._pixiData.instance.beginFill(16772846, 1), this._pixiData.strokeFill = 0, this._pixiData.strokeAlpha = 1;
        }
        superclass && (CreatejsGraphics.__proto__ = superclass), CreatejsGraphics.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsGraphics.prototype.constructor = CreatejsGraphics;
        var prototypeAccessors$7 = {
            pixi: {
                configurable: !0
            }
        };
        return CreatejsGraphics.prototype.moveTo = function(x, y) {
            return this._pixiData.instance.clone().endFill().containsPoint({
                x: x,
                y: y
            }) ? this._pixiData.instance.beginHole() : this._pixiData.instance.endHole(), this._pixiData.instance.moveTo(x, y), 
            superclass.prototype.moveTo.call(this, x, y);
        }, CreatejsGraphics.prototype.lineTo = function(x, y) {
            return this._pixiData.instance.lineTo(x, y), superclass.prototype.lineTo.call(this, x, y);
        }, CreatejsGraphics.prototype.arcTon = function(x1, y1, x2, y2, radius) {
            return this._pixiData.instance.arcTo(x1, y1, x2, y2, radius), superclass.prototype.arcTo.call(this, x1, y1, x2, y2, radius);
        }, CreatejsGraphics.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
            return this._pixiData.instance.arc(x, y, radius, startAngle, endAngle, anticlockwise), 
            superclass.prototype.arc.call(this, x, y, radius, startAngle, endAngle, anticlockwise);
        }, CreatejsGraphics.prototype.quadraticCurveTo = function(cpx, cpy, x, y) {
            return this._pixiData.instance.quadraticCurveTo(cpx, cpy, x, y), superclass.prototype.quadraticCurveTo.call(this, cpx, cpy, x, y);
        }, CreatejsGraphics.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
            return this._pixiData.instance.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y), superclass.prototype.bezierCurveTo.call(this, cp1x, cp1y, cp2x, cp2y, x, y);
        }, CreatejsGraphics.prototype.rect = function(x, y, w, h) {
            return this._pixiData.instance.drawRect(x, y, w, h), superclass.prototype.rect.call(this, x, y, w, h);
        }, CreatejsGraphics.prototype.closePath = function() {
            return this._pixiData.instance.closePath(), superclass.prototype.closePath.call(this);
        }, CreatejsGraphics.prototype.clear = function() {
            return this._pixiData.instance.clear(), superclass.prototype.clear.call(this);
        }, CreatejsGraphics.prototype._parseColor = function(color) {
            var res = {
                color: 0,
                alpha: 1
            };
            if (!color) {
                return res.alpha = 0, res;
            }
            if ("#" === color.charAt(0)) {
                return res.color = parseInt(color.slice(1), 16), res;
            }
            var colors = color.replace(/rgba|\(|\)|\s/g, "").split(",");
            return res.color = 65536 * Number(colors[0]) + 256 * Number(colors[1]) + Number(colors[2]), 
            res.alpha = Number(colors[3]), res;
        }, CreatejsGraphics.prototype.beginFill = function(color) {
            var c = this._parseColor(color);
            return this._pixiData.instance.beginFill(c.color, c.alpha), superclass.prototype.beginFill.call(this, color);
        }, CreatejsGraphics.prototype.endFill = function() {
            return this._pixiData.instance.endFill(), superclass.prototype.endFill.call(this);
        }, CreatejsGraphics.prototype.setStrokeStyle = function(thickness, caps, joints, miterLimit, ignoreScale) {
            return this._pixiData.instance.lineTextureStyle({
                width: thickness,
                color: this._pixiData.strokeFill,
                alpha: this._pixiData.strokeAlpha,
                cap: caps in LineCap ? LineCap[caps] : LineCap[0],
                join: joints in LineJoin ? LineJoin[joints] : LineJoin[0],
                miterLimit: miterLimit
            }), superclass.prototype.setStrokeStyle.call(this, thickness, caps, joints, miterLimit, ignoreScale);
        }, CreatejsGraphics.prototype.beginStroke = function(color) {
            var c = this._parseColor(color);
            return this._pixiData.strokeFill = c.color, this._pixiData.strokeAlpha = c.alpha, 
            superclass.prototype.beginStroke.call(this, color);
        }, CreatejsGraphics.prototype.drawRoundRect = function(x, y, w, h, radius) {
            return this._pixiData.instance.drawRoundedRect(x, y, w, h, radius), superclass.prototype.drawRoundRect.call(this, x, y, w, h, radius);
        }, CreatejsGraphics.prototype.drawCircle = function(x, y, radius) {
            return this._pixiData.instance.drawCircle(x, y, radius), superclass.prototype.drawCircle.call(this, x, y, radius);
        }, CreatejsGraphics.prototype.drawEllipse = function(x, y, w, h) {
            return this._pixiData.instance.drawEllipse(x, y, w, h), superclass.prototype.drawEllipse.call(this, x, y, w, h);
        }, CreatejsGraphics.prototype.drawPolyStar = function(x, y, radius, sides, pointSize, angle) {
            return this._pixiData.instance.drawRegularPolygon(x, y, radius, sides, angle * DEG_TO_RAD), 
            superclass.prototype.drawPolyStar.call(this, x, y, radius, sides, pointSize, angle);
        }, prototypeAccessors$7.pixi.get = function() {
            return this._pixiData.instance;
        }, CreatejsGraphics.prototype.updateForPixi = function() {
            return !0;
        }, Object.defineProperties(CreatejsGraphics.prototype, prototypeAccessors$7), CreatejsGraphics;
    }(window.createjs.Graphics);
    appendDisplayObjectDescriptor(CreatejsGraphics), Object.defineProperties(CreatejsGraphics.prototype, {
        curveTo: {
            value: CreatejsGraphics.prototype.quadraticCurveTo
        },
        drawRect: {
            value: CreatejsGraphics.prototype.rect
        },
        mt: {
            value: CreatejsGraphics.prototype.moveTo
        },
        lt: {
            value: CreatejsGraphics.prototype.lineTo
        },
        at: {
            value: CreatejsGraphics.prototype.arcTo
        },
        bt: {
            value: CreatejsGraphics.prototype.bezierCurveTo
        },
        qt: {
            value: CreatejsGraphics.prototype.quadraticCurveTo
        },
        a: {
            value: CreatejsGraphics.prototype.arc
        },
        r: {
            value: CreatejsGraphics.prototype.rect
        },
        cp: {
            value: CreatejsGraphics.prototype.closePath
        },
        c: {
            value: CreatejsGraphics.prototype.clear
        },
        f: {
            value: CreatejsGraphics.prototype.beginFill
        },
        ef: {
            value: CreatejsGraphics.prototype.endFill
        },
        ss: {
            value: CreatejsGraphics.prototype.setStrokeStyle
        },
        s: {
            value: CreatejsGraphics.prototype.beginStroke
        },
        dr: {
            value: CreatejsGraphics.prototype.drawRect
        },
        rr: {
            value: CreatejsGraphics.prototype.drawRoundRect
        },
        dc: {
            value: CreatejsGraphics.prototype.drawCircle
        },
        de: {
            value: CreatejsGraphics.prototype.drawEllipse
        },
        dp: {
            value: CreatejsGraphics.prototype.drawPolyStar
        }
    });
    var PixiText = function(Text) {
        function PixiText() {
            Text.apply(this, arguments);
        }
        return Text && (PixiText.__proto__ = Text), PixiText.prototype = Object.create(Text && Text.prototype), 
        PixiText.prototype.constructor = PixiText, PixiText;
    }(pixi_js.Text), PixiTextContainer = function(Container) {
        function PixiTextContainer(cjs, text) {
            Container.call(this), this._createjs = cjs, this._text = text;
        }
        Container && (PixiTextContainer.__proto__ = Container), PixiTextContainer.prototype = Object.create(Container && Container.prototype), 
        PixiTextContainer.prototype.constructor = PixiTextContainer;
        var prototypeAccessors$8 = {
            createjs: {
                configurable: !0
            },
            text: {
                configurable: !0
            }
        };
        return prototypeAccessors$8.createjs.get = function() {
            return this._createjs;
        }, prototypeAccessors$8.text.get = function() {
            return this._text;
        }, Object.defineProperties(PixiTextContainer.prototype, prototypeAccessors$8), PixiTextContainer;
    }(pixi_js.Container);
    function createTextOriginParam(text, font, color) {
        return Object.assign({
            x: 0,
            y: 0,
            scaleX: 0,
            scaleY: 0,
            regx: 0,
            regy: 0,
            skewX: 0,
            skewY: 0,
            rotation: 0,
            visible: !0,
            alpha: 1,
            _off: !1,
            mask: null,
            filters: null
        }, {
            text: text,
            font: font,
            color: color,
            textAlign: "left",
            lineHeight: 0,
            lineWidth: 0
        });
    }
    function createTextPixiData(cjs, text) {
        var pixi = new PixiTextContainer(cjs, text);
        return Object.assign(createPixiData(pixi.pivot), {
            instance: pixi
        });
    }
    var CreatejsText = function(superclass) {
        function CreatejsText(text, font, color) {
            this._originParams = createTextOriginParam(text, font, color);
            var _font = this._parseFont(font), t = new PixiText(text, {
                fontSize: _font.fontSize,
                fontFamily: _font.fontFamily,
                fill: this._parseColor(color),
                wordWrap: !0
            });
            this._pixiData = createTextPixiData(this, t), this._pixiData.instance.addChild(t), 
            superclass.apply(this, arguments);
        }
        superclass && (CreatejsText.__proto__ = superclass), CreatejsText.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsText.prototype.constructor = CreatejsText;
        var prototypeAccessors$9 = {
            text: {
                configurable: !0
            },
            font: {
                configurable: !0
            },
            color: {
                configurable: !0
            },
            textAlign: {
                configurable: !0
            },
            lineHeight: {
                configurable: !0
            },
            lineWidth: {
                configurable: !0
            },
            pixi: {
                configurable: !0
            }
        };
        return prototypeAccessors$9.text.get = function() {
            return this._originParams.text;
        }, prototypeAccessors$9.text.set = function(text) {
            this._pixiData.instance.text.text = text, this._align(this.textAlign), this._originParams.text = text;
        }, CreatejsText.prototype._parseFont = function(font) {
            var p = font.split(" ");
            return {
                fontSize: Number((p.shift() || "0px").replace("px", "")),
                fontFamily: p.join(" ").replace(/'/g, "")
            };
        }, prototypeAccessors$9.font.get = function() {
            return this._originParams.font;
        }, prototypeAccessors$9.font.set = function(font) {
            var _font = this._parseFont(font);
            this._pixiData.instance.text.style.fontSize = _font.fontSize, this._pixiData.instance.text.style.fontFamily = _font.fontFamily, 
            this._originParams.font = font;
        }, CreatejsText.prototype._parseColor = function(color) {
            return parseInt(color.slice(1), 16);
        }, prototypeAccessors$9.color.get = function() {
            return this._originParams.color;
        }, prototypeAccessors$9.color.set = function(color) {
            this._pixiData.instance.text.style.fill = this._parseColor(color), this._originParams.color = color;
        }, CreatejsText.prototype._align = function(align) {
            "left" !== align ? "center" !== align ? "right" !== align || (this._pixiData.instance.text.x = -this.lineWidth) : this._pixiData.instance.text.x = -this.lineWidth / 2 : this._pixiData.instance.text.x = 0;
        }, prototypeAccessors$9.textAlign.get = function() {
            return this._originParams.textAlign;
        }, prototypeAccessors$9.textAlign.set = function(align) {
            this._pixiData.instance.text.style.align = align, this._align(align), this._originParams.textAlign = align;
        }, prototypeAccessors$9.lineHeight.get = function() {
            return this._originParams.lineHeight;
        }, prototypeAccessors$9.lineHeight.set = function(height) {
            this._pixiData.instance.text.style.lineHeight = height, this._originParams.lineHeight = height;
        }, prototypeAccessors$9.lineWidth.get = function() {
            return this._originParams.lineWidth;
        }, prototypeAccessors$9.lineWidth.set = function(width) {
            this._pixiData.instance.text.style.wordWrapWidth = width, this._originParams.lineWidth = width;
        }, prototypeAccessors$9.pixi.get = function() {
            return this._pixiData.instance;
        }, CreatejsText.prototype.updateForPixi = function() {
            return !0;
        }, Object.defineProperties(CreatejsText.prototype, prototypeAccessors$9), CreatejsText;
    }(window.createjs.Text);
    appendDisplayObjectDescriptor(CreatejsText);
    var PixiButtonHelper = function(Container) {
        function PixiButtonHelper(cjs) {
            Container.call(this), this._createjs = cjs;
        }
        Container && (PixiButtonHelper.__proto__ = Container), PixiButtonHelper.prototype = Object.create(Container && Container.prototype), 
        PixiButtonHelper.prototype.constructor = PixiButtonHelper;
        var prototypeAccessors$10 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$10.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiButtonHelper.prototype, prototypeAccessors$10), PixiButtonHelper;
    }(pixi_js.Container);
    function createButtonHelperPixiData(cjs) {
        var pixi = new PixiButtonHelper(cjs);
        return Object.assign(createPixiData(pixi.pivot), {
            instance: pixi
        });
    }
    var CreatejsButtonHelper = function(superclass) {
        function CreatejsButtonHelper() {
            this._originParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regx: 0,
                regy: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null,
                filters: null
            }, this._pixiData = createButtonHelperPixiData(this), superclass.apply(this, arguments);
            var createjs = arguments[0], pixi = createjs._pixiData.instance, baseFrame = arguments[1], overFrame = arguments[2], downFrame = arguments[3], hit = arguments[5], hitFrame = arguments[6];
            hit.gotoAndStop(hitFrame);
            var hitPixi = pixi.addChild(hit._pixiData.instance);
            hitPixi.alpha = 1e-5;
            var isOver = !1, isDown = !1;
            hitPixi.on("pointerover", (function() {
                isOver = !0, isDown ? createjs.gotoAndStop(downFrame) : createjs.gotoAndStop(overFrame);
            })), hitPixi.on("pointerout", (function() {
                isOver = !1, isDown ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            })), hitPixi.on("pointerdown", (function() {
                isDown = !0, createjs.gotoAndStop(downFrame);
            })), hitPixi.on("pointerup", (function() {
                isDown = !1, isOver ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            })), hitPixi.on("pointerupoutside", (function() {
                isDown = !1, isOver ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            })), hitPixi.interactive = !0, hitPixi.cursor = "pointer";
        }
        superclass && (CreatejsButtonHelper.__proto__ = superclass), CreatejsButtonHelper.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsButtonHelper.prototype.constructor = CreatejsButtonHelper;
        var prototypeAccessors$11 = {
            pixi: {
                configurable: !0
            }
        };
        return prototypeAccessors$11.pixi.get = function() {
            return this._pixiData.instance;
        }, Object.defineProperties(CreatejsButtonHelper.prototype, prototypeAccessors$11), 
        CreatejsButtonHelper;
    }(window.createjs.ButtonHelper);
    appendDisplayObjectDescriptor(CreatejsButtonHelper);
    var Pixim, CreatejsMovieClip$1 = function(MovieClip) {
        function CreatejsMovieClip() {
            MovieClip.apply(this, arguments);
        }
        return MovieClip && (CreatejsMovieClip.__proto__ = MovieClip), CreatejsMovieClip.prototype = Object.create(MovieClip && MovieClip.prototype), 
        CreatejsMovieClip.prototype.constructor = CreatejsMovieClip, CreatejsMovieClip.prototype.updateForPixi = function(e) {
            return this.advance(e.delta), this._updateState(), updateDisplayObjectChildren(this, e);
        }, CreatejsMovieClip;
    }(CreatejsMovieClip);
    !function(Pixim) {
        !function(animate) {
            animate.prepareAsync = function(id, basepath, options) {
                return void 0 === options && (options = {}), function(id, basepath, options) {
                    void 0 === options && (options = {});
                    var comp = window.AdobeAn.getComposition(id);
                    if (!comp) {
                        throw new Error("no composition");
                    }
                    var lib = comp.getLibrary();
                    return options.useSynchedTimeline || Object.defineProperties(window.createjs.MovieClip.prototype, {
                        updateForPixi: {
                            value: function(e) {
                                return this._tick(e);
                            }
                        }
                    }), new Promise((function(resolve, reject) {
                        0 === lib.properties.manifest.length && resolve({});
                        var loader = new window.createjs.LoadQueue(!1);
                        if (loader.installPlugin(window.createjs.Sound), loader.addEventListener("fileload", (function(evt) {
                            !function(evt, comp) {
                                var images = comp.getImages();
                                evt && "image" == evt.item.type && (images[evt.item.id] = evt.result);
                            }(evt, comp);
                        })), loader.addEventListener("complete", (function(evt) {
                            resolve(evt);
                        })), basepath) {
                            basepath = (basepath + "/").replace(/([^\:])\/\//, "$1/");
                            for (var m = lib.properties.manifest, i = 0; i < m.length; i++) {
                                m[i].src = basepath + m[i].src;
                            }
                        }
                        loader.loadManifest(lib.properties.manifest);
                    })).then((function(evt) {
                        for (var ss = comp.getSpriteSheet(), queue = evt.target, ssMetadata = lib.ssMetadata, i = 0; i < ssMetadata.length; i++) {
                            ss[ssMetadata[i].name] = new window.createjs.SpriteSheet({
                                images: [ queue.getResult(ssMetadata[i].name) ],
                                frames: ssMetadata[i].frames
                            });
                        }
                        return lib;
                    }));
                }(id, basepath, options);
            };
            var Container = function(superclass) {
                function Container() {
                    superclass.apply(this, arguments), this._createjsAnimID = 0, this._lastCreatejsAnimID = 0;
                }
                return superclass && (Container.__proto__ = superclass), Container.prototype = Object.create(superclass && superclass.prototype), 
                Container.prototype.constructor = Container, Container.prototype._addCreatejs = function(cjs) {}, 
                Container.prototype.addCreatejs = function(cjs) {
                    var this$1 = this;
                    if (cjs instanceof window.createjs.MovieClip) {
                        function handler(e) {
                            cjs.updateForPixi(e);
                        }
                        this.task.on("createjsAnim", handler), this.once("removed", (function() {
                            this$1.task.off("createjsAnim", handler);
                        }));
                    }
                    return this.addChild(cjs.pixi), cjs;
                }, Container.prototype.addCreatejsAt = function(cjs, index) {
                    var this$1 = this;
                    if (cjs instanceof window.createjs.MovieClip) {
                        function handler(e) {
                            cjs.updateForPixi(e);
                        }
                        this.task.on("createjsAnim", handler), this.once("removed", (function() {
                            this$1.task.off("createjsAnim", handler);
                        }));
                    }
                    return this.addChildAt(cjs.pixi, index), cjs;
                }, Container.prototype.removeCreatejs = function(cjs) {
                    return this.removeChild(cjs.pixi), cjs;
                }, Container;
            }(_Pixim.Container);
            animate.Container = Container;
        }(Pixim.animate || (Pixim.animate = {}));
    }(Pixim || (Pixim = {}));
    var prepareAsync = Pixim.animate.prepareAsync, Container = Pixim.animate.Container;
    !function(obj) {
        for (var i in void 0 === obj && (obj = {}), window.createjs.StageGL = CreatejsStageGL, 
        window.createjs.MovieClip = CreatejsMovieClip, window.createjs.Sprite = CreatejsSprite, 
        window.createjs.Shape = CreatejsShape, window.createjs.Graphics = CreatejsGraphics, 
        window.createjs.Text = CreatejsText, window.createjs.ButtonHelper = CreatejsButtonHelper, 
        obj) {
            window.createjs[i] = obj[i];
        }
    }({
        MovieClip: CreatejsMovieClip$1
    }), exports.Container = Container, exports.CreatejsMovieClip = CreatejsMovieClip$1, 
    exports.prepareAsync = prepareAsync;
}(this.Pixim.animate = this.Pixim.animate || {}, PIXI, Pixim);
//# sourceMappingURL=Pixim-animate-container.js.map