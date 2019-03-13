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
 * 游戏开始页面
 */
var HomePanel = (function (_super) {
    __extends(HomePanel, _super);
    function HomePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = 'HomeSkin';
        return _this;
    }
    /**
     * 添加到舞台
     */
    HomePanel.prototype.onAddToStageHandler = function (e) {
    };
    /**
     * 移除舞台
     */
    HomePanel.prototype.onRemoveFromStageHandler = function (e) {
    };
    /**
     * 资源加载完成
     */
    HomePanel.prototype.onUICompleteHandler = function (e) {
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_beginHandler, this);
        this.btn_more.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_moreHandler, this);
    };
    HomePanel.prototype.btn_beginHandler = function (e) {
        GameModel.getInstance().game_type = GameType.normal;
        GamePanel.open([HomePanel]);
    };
    HomePanel.prototype.btn_moreHandler = function (e) {
        // 更多
    };
    HomePanel.open = function (removeClazz) {
        manager.GameManager.getInstance().addPanel(HomePanel, removeClazz);
    };
    HomePanel.close = function () {
        manager.GameManager.getInstance().removePanel(HomePanel);
    };
    return HomePanel;
}(PanelBase));
__reflect(HomePanel.prototype, "HomePanel");
//# sourceMappingURL=HomePanel.js.map