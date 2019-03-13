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
 * 游戏页面
 */
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super.call(this) || this;
        _this.currLevel = 1;
        _this.currScore = 0;
        /**
         * 逃生时间
         */
        _this.escapeTime = 2000;
        _this.skinName = 'GameSkin';
        RES.loadGroup('role');
        return _this;
    }
    /**
     * 添加到舞台
     */
    GamePanel.prototype.onAddToStageHandler = function (e) {
        this.init();
    };
    /**
     * 移除舞台
     */
    GamePanel.prototype.onRemoveFromStageHandler = function (e) {
        this.role.stop();
    };
    /**
     * 资源加载完成
     */
    GamePanel.prototype.onUICompleteHandler = function (e) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.wall.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.updateRoleHandler, this);
        this.wall.addEventListener(egret.Event.COMPLETE, this.wallShakeCompleteHandler, this);
    };
    /**
     * 更新分数和关卡
     */
    GamePanel.prototype.updateInfo = function () {
        var gameModel = GameModel.getInstance();
        var type = GameModel.getInstance().game_type;
        switch (type) {
            case GameType.again:
                break;
            case GameType.normal:
                this.currLevel = 1;
                this.currScore = 0;
                break;
        }
        this.score.setNumber(this.currScore);
        this.level.setNumber(this.currLevel);
    };
    /**
     * 点击事件
     */
    GamePanel.prototype.clickHandler = function (e) {
        var stageX = e.stageX;
        var total = this.wall.count;
        if (stageX > this.role.x + this.role.width / 2 && this.role.roleIndex < total) {
            this.role.roleIndex++;
        }
        else if (stageX < this.role.x - this.role.width / 2 && this.role.roleIndex > 0) {
            this.role.roleIndex--;
        }
        else {
            return;
        }
        this.setRolePositionByWall(this.role.roleIndex);
    };
    /**
     * 墙体震动完成
     */
    GamePanel.prototype.wallShakeCompleteHandler = function () {
        this.touchEnabled = false;
        this.touchChildren = false;
        var self = this;
        var status = this.wall.escapeIndexs[this.role.roleIndex];
        if (status !== undefined) {
            this.role.setStatus(status);
            this.role.stop();
            GameModel.getInstance().game_type = GameType.again;
            // 下一关
            setTimeout(function () {
                self.nextLevel();
            }, 1000);
        }
        else {
            this.role.setStatus(RoleStaus.blood);
            this.setRolePositionByWall(this.role.roleIndex, -14);
            GameModel.getInstance().curr_score = this.currScore;
            GameModel.getInstance().curr_level = this.currLevel;
            setTimeout(function () {
                GameOverPanel.open([GamePanel]);
            }, 1000);
        }
    };
    /**
     * 下一关
     */
    GamePanel.prototype.nextLevel = function () {
        var max_score = +LocalStorageManager.getInstance().maxScore;
        this.currScore += 5;
        this.currLevel++;
        if (this.currLevel > 10) {
            this.escapeTime -= 500;
        }
        if (this.currScore > max_score) {
            LocalStorageManager.getInstance().maxScore = this.currScore.toString();
        }
        this.wall.updateWall();
        this.role.setStatus(RoleStaus.normal);
        this.init();
    };
    GamePanel.prototype.init = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
        this.updateInfo();
        this.updateRoleHandler();
        // 两秒后逃生
        var self = this;
        setTimeout(function () {
            self.wall.start();
        }, this.escapeTime);
    };
    GamePanel.prototype.updateRoleHandler = function () {
        this.role.visible = true;
        this.role.setStatus(RoleStaus.normal);
        this.setRolePositionByWall(3);
        this.role.play(true);
    };
    /**
     * 根据下墙体设置人物位置
     */
    GamePanel.prototype.setRolePositionByWall = function (index, offY) {
        if (offY === void 0) { offY = -(this.role.height - 17); }
        var rects = this.wall.bottom_rects;
        if (rects == null || rects.length == 0) {
            return;
        }
        this.role.roleIndex = index;
        var rec = rects[index];
        this.role.x = rec.x + rec.width / 2;
        this.role.y = rec.y + offY;
    };
    GamePanel.open = function (removeClazz) {
        manager.GameManager.getInstance().addPanel(GamePanel, removeClazz);
    };
    GamePanel.close = function () {
        manager.GameManager.getInstance().removePanel(GamePanel);
    };
    return GamePanel;
}(PanelBase));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map