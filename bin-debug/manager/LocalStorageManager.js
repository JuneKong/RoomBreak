var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 缓存管理
 */
var LocalStorageManager = (function () {
    function LocalStorageManager() {
        /**
         * 最高纪录
         */
        this.MAX_SCORE = "MAX_SCORE";
    }
    LocalStorageManager.getInstance = function () {
        if (LocalStorageManager.instance == null) {
            LocalStorageManager.instance = new LocalStorageManager();
        }
        return LocalStorageManager.instance;
    };
    /**
     * 读取缓存
     */
    LocalStorageManager.prototype.getItem = function (key) {
        return egret.localStorage.getItem(key);
    };
    /**
     * 设置缓存
     */
    LocalStorageManager.prototype.setItem = function (key, value) {
        egret.localStorage.setItem(key, value);
    };
    Object.defineProperty(LocalStorageManager.prototype, "maxScore", {
        /**
         * 获得最高纪录
         */
        get: function () {
            return this.getItem(this.MAX_SCORE);
        },
        /**
         * 设置最高纪录
         */
        set: function (val) {
            this.setItem(this.MAX_SCORE, val);
        },
        enumerable: true,
        configurable: true
    });
    return LocalStorageManager;
}());
__reflect(LocalStorageManager.prototype, "LocalStorageManager");
//# sourceMappingURL=LocalStorageManager.js.map