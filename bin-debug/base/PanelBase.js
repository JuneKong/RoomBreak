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
 * 页面基础类
 */
var PanelBase = (function (_super) {
    __extends(PanelBase, _super);
    function PanelBase() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageHandler, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStageHandler, _this);
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onUICompleteHandler, _this);
        return _this;
    }
    /**
     * 添加到舞台
     */
    PanelBase.prototype.onAddToStageHandler = function (e) {
    };
    /**
     * 移除舞台
     */
    PanelBase.prototype.onRemoveFromStageHandler = function (e) {
    };
    /**
     * 资源加载完成
     */
    PanelBase.prototype.onUICompleteHandler = function (e) {
    };
    return PanelBase;
}(eui.Component));
__reflect(PanelBase.prototype, "PanelBase");
//# sourceMappingURL=PanelBase.js.map