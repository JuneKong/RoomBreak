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
 * 计数器
 */
var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        var _this = _super.call(this) || this;
        /**
         * 数字之间的间隔
         */
        _this.gap = 14;
        return _this;
    }
    /**
     * 设置数字
     */
    Counter.prototype.setNumber = function (num) {
        this.clearChildren();
        if (num == null || num < 0) {
            return;
        }
        var arr = num.toString().split('');
        var x = 0;
        for (var i = 0; i < arr.length; i++) {
            var img = new eui.Image(arr[i]);
            img.x = x;
            x += img.width + this.gap;
            this.addChild(img);
        }
    };
    /**
     * 清除
     */
    Counter.prototype.clearChildren = function () {
        while (this.numChildren) {
            if (this.getChildAt(0).parent) {
                this.removeChildAt(0);
            }
        }
    };
    return Counter;
}(eui.Group));
__reflect(Counter.prototype, "Counter");
//# sourceMappingURL=Counter.js.map