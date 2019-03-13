var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 墙体
 */
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        var _this = _super.call(this) || this;
        /**
         * 上墙体矩形
         */
        _this.top_rects = [];
        /**
         * 下墙体矩形
         */
        _this.bottom_rects = [];
        /**
         * 墙体最小高度
         */
        _this.minWallH = 150;
        /**
         * 预留空间
         */
        _this.space_list = [50, 70, 90, 110];
        _this._count = 8;
        /**
         * 逃生index组
         */
        _this.escapeIndexs = {};
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onUICompleteHandler, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageHandler, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStageHandler, _this);
        return _this;
    }
    /**
     * 添加舞台
     */
    Wall.prototype.onAddToStageHandler = function () {
        this.init();
    };
    /**
     * 移出舞台
     */
    Wall.prototype.onRemoveFromStageHandler = function () {
        this.removeChildren();
    };
    /**
     * 资源加载完成时
     */
    Wall.prototype.onUICompleteHandler = function () {
    };
    /**
     * 添加子项
     */
    Wall.prototype.addItem = function () {
        this.bg = RES.getRes("bg_qiang_png");
        this.group_top = new eui.Group();
        this.group_bottom = new eui.Group();
        this.addChild(this.group_top);
        this.addChild(this.group_bottom);
        this.top_sprite = new egret.Sprite();
        this.group_top.addChild(this.top_sprite);
        this.top_line = new egret.Shape();
        this.group_top.addChild(this.top_line);
        this.bottom_sprite = new egret.Sprite();
        this.group_bottom.addChild(this.bottom_sprite);
        this.bottom_line = new egret.Shape();
        this.group_bottom.addChild(this.bottom_line);
    };
    Object.defineProperty(Wall.prototype, "count", {
        /**
         * 墙体个数
         */
        get: function () {
            return this._count;
        },
        set: function (val) {
            if (this._count == val) {
                return;
            }
            this._count = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 开始动画
     */
    Wall.prototype.start = function () {
        this.shakeWall(this.group_top, 5, this, this.topShakedHandler);
    };
    Wall.prototype.init = function () {
        this.addItem();
        this.updateWall();
        this.dispatchEventWith(eui.UIEvent.CREATION_COMPLETE);
    };
    /**
     * 更新墙体
     */
    Wall.prototype.updateWall = function () {
        this.createWallRect();
        // 绘制墙体
        this.drawWalls(this.top_sprite, this.top_rects);
        this.drawWalls(this.bottom_sprite, this.bottom_rects);
        // 绘制边界线
        this.drawLines(this.top_line, this.top_rects);
        this.drawLines(this.bottom_line, this.bottom_rects, true);
        this.group_top.y = -200;
    };
    /**
     * 上墙体晃动结束时
     */
    Wall.prototype.topShakedHandler = function () {
        this.touchEnabled = false;
        this.touchChildren = false;
        this.tw.to({ y: 0 }, 100);
        this.tw.call(this.bottomShakeHandler, this);
    };
    /**
     * 下墙体晃动
     */
    Wall.prototype.bottomShakeHandler = function () {
        this.shakeWall(this.group_bottom, 3, this, this.showResult);
    };
    /**
     * 显示结果
     */
    Wall.prototype.showResult = function () {
        // 墙体晃动结束
        this.dispatchEventWith(egret.Event.COMPLETE);
    };
    /**
     * 墙体晃动
     */
    Wall.prototype.shakeWall = function (wall, shakeNum, thisObj, overHandler) {
        var count = 0;
        var add = 5;
        this.tw = egret.Tween.get(wall);
        while (shakeNum > count) {
            // 晃动
            this.tw.to({ y: wall.y + add }, 50);
            this.tw.to({ y: wall.y }, 50);
            count++;
        }
        if (overHandler) {
            overHandler.call(thisObj);
        }
    };
    /**
     * 创建墙体rect
     */
    Wall.prototype.createWallRect = function () {
        this.top_rects.length = 0;
        this.bottom_rects.length = 0;
        this.escapeIndexs = {};
        var hasNull = false;
        var wallW = this.width / this._count;
        for (var i = 0; i < this._count; i++) {
            var wallH = this.minWallH + this.random(this._count) * 10;
            this.bottom_rects.push(new egret.Rectangle(i * wallW, this.height - wallH, wallW, wallH));
            wallH = this.height - wallH;
            if (Math.random() < 0.2 || (!hasNull && i == this._count - 1)) {
                var index = this.random(this.space_list.length);
                wallH -= this.space_list[index];
                hasNull = true;
                this.escapeIndexs[i] = index;
            }
            this.top_rects.push(new egret.Rectangle(i * wallW, 0, wallW, wallH));
        }
    };
    /**
     * 随机整数
     * @param scope 0-scope范围
     */
    Wall.prototype.random = function (scope) {
        if (scope === void 0) { scope = 1; }
        return Math.floor(Math.random() * scope);
    };
    /**
     * 绘制墙体
     */
    Wall.prototype.drawWalls = function (sprite, rects) {
        for (var i = 0; i < rects.length; i++) {
            var rect = rects[i];
            var bitmap = sprite.numChildren <= i ? null : sprite.getChildAt(i);
            if (bitmap == null) {
                bitmap = new egret.Bitmap();
                bitmap.texture = this.bg;
                sprite.addChild(bitmap);
            }
            bitmap.scrollRect = rect;
            bitmap.x = rect.x;
            bitmap.y = rect.y;
        }
    };
    /**
     * 绘制线条
     */
    Wall.prototype.drawLines = function (shape, rects, isBottom, line) {
        if (isBottom === void 0) { isBottom = false; }
        if (line === void 0) { line = 10; }
        shape.graphics.clear();
        shape.graphics.lineStyle(line, 0x33E7FE);
        if (!isBottom) {
            for (var i = 0; i < rects.length; i++) {
                var rect = rects[i];
                if (i == 0) {
                    shape.graphics.moveTo(rect.x, rect.height);
                    shape.graphics.lineTo(rect.x + rect.width, rect.height);
                }
                else {
                    shape.graphics.lineTo(rect.x, rect.height);
                    shape.graphics.lineTo(rect.x + rect.width, rect.height);
                }
            }
        }
        else {
            for (var i = 0; i < rects.length; i++) {
                var rect = rects[i];
                var y = rect.y + line / 2;
                if (i == 0) {
                    shape.graphics.moveTo(rect.x, y);
                    shape.graphics.lineTo(rect.x + rect.width, y);
                }
                else {
                    shape.graphics.lineTo(rect.x, y);
                    shape.graphics.lineTo(rect.x + rect.width, y);
                }
            }
        }
        shape.graphics.endFill();
    };
    return Wall;
}(eui.Component));
__reflect(Wall.prototype, "Wall");
//# sourceMappingURL=Wall.js.map