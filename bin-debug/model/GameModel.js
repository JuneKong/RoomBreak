var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏数据模块
 */
var GameModel = (function () {
    function GameModel() {
    }
    GameModel.getInstance = function () {
        if (GameModel.instance == null) {
            GameModel.instance = new GameModel;
        }
        return GameModel.instance;
    };
    Object.defineProperty(GameModel.prototype, "game_type", {
        /**
         * 当前游戏类型
         */
        get: function () {
            return this._game_type;
        },
        set: function (val) {
            if (this._game_type == val) {
                return;
            }
            this._game_type = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameModel.prototype, "curr_score", {
        /**
         * 当前分数
         */
        get: function () {
            return this._curr_score;
        },
        set: function (val) {
            if (this._curr_score == val) {
                return;
            }
            this._curr_score = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameModel.prototype, "curr_level", {
        /**
         * 当前等级
         */
        get: function () {
            return this._curr_level;
        },
        set: function (val) {
            if (this._curr_level == val) {
                return;
            }
            this._curr_level = val;
        },
        enumerable: true,
        configurable: true
    });
    return GameModel;
}());
__reflect(GameModel.prototype, "GameModel");
var GameType;
(function (GameType) {
    /**
     * 正常
     */
    GameType[GameType["normal"] = 0] = "normal";
    /**
     * 再玩一次
     */
    GameType[GameType["again"] = 1] = "again";
})(GameType || (GameType = {}));
//# sourceMappingURL=GameModel.js.map