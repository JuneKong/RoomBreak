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
 * 游戏结束页面
 */
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super.call(this) || this;
        _this.dict = {};
        _this.skinName = 'GameOverSkin';
        return _this;
    }
    /**
     * 添加到舞台
     */
    GameOverPanel.prototype.onAddToStageHandler = function (e) {
        this.updateInfo();
    };
    /**
     * 移除舞台
     */
    GameOverPanel.prototype.onRemoveFromStageHandler = function (e) {
    };
    /**
     * 资源加载完成
     */
    GameOverPanel.prototype.onUICompleteHandler = function (e) {
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.btn_resume.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.dict[this.btn_again.name] = GameType.again;
        this.dict[this.btn_resume.name] = GameType.normal;
    };
    GameOverPanel.prototype.updateInfo = function () {
        var localStorage = LocalStorageManager.getInstance();
        this.max_number.setNumber(+localStorage.maxScore);
        this.score.setNumber(GameModel.getInstance().curr_score);
    };
    GameOverPanel.prototype.btnClickHandler = function (e) {
        var target = e.target;
        GameModel.getInstance().game_type = this.dict[target.name];
        GamePanel.open([GameOverPanel]);
    };
    GameOverPanel.open = function (removeClazz) {
        manager.GameManager.getInstance().addPanel(GameOverPanel, removeClazz);
    };
    GameOverPanel.close = function () {
        manager.GameManager.getInstance().removePanel(GameOverPanel);
    };
    return GameOverPanel;
}(PanelBase));
__reflect(GameOverPanel.prototype, "GameOverPanel");
//# sourceMappingURL=GameOverPanel.js.map