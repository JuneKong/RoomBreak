var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var manager;
(function (manager) {
    /**
     * 游戏管理类
     */
    var GameManager = (function () {
        function GameManager() {
            this.classDist = {};
        }
        GameManager.getInstance = function () {
            if (GameManager.instance == null) {
                GameManager.instance = new GameManager();
            }
            return GameManager.instance;
        };
        GameManager.prototype.init = function (parent) {
            this._stage = parent;
        };
        /**
         * 显示页面
         * @param clazz 显示的页面
         * @param removeClazz 关闭的页面
         */
        GameManager.prototype.addPanel = function (clazz, removeClazz) {
            var panelName = egret.getQualifiedClassName(clazz);
            var child = this.classDist[panelName];
            if (child == null) {
                child = new clazz();
                this.classDist[panelName] = child;
            }
            this._stage.addChild(child);
            if (removeClazz) {
                for (var i = 0; i < removeClazz.length; i++) {
                    this.removePanel(removeClazz[i]);
                }
            }
            return child;
        };
        /**
         * 删除页面
         */
        GameManager.prototype.removePanel = function (clazz) {
            var panelName = egret.getQualifiedClassName(clazz);
            var child = this.classDist[panelName];
            if (child == null) {
                return;
            }
            if (child.parent) {
                child.parent.removeChild(child);
            }
        };
        return GameManager;
    }());
    manager.GameManager = GameManager;
    __reflect(GameManager.prototype, "manager.GameManager");
})(manager || (manager = {}));
//# sourceMappingURL=GameManager.js.map