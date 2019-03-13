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
 * 人物
 */
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        /**
         * 当前帧数
         */
        _this.currFrameIndex = 0;
        _this.maxFrame = 3;
        _this._roleIndex = 0;
        return _this;
    }
    /**
     * 设置状态
     */
    Role.prototype.setStatus = function (state) {
        this._state = state;
        if (state == RoleStaus.blood) {
            this.loop = false;
            // this.anchorOffsetY = this.height * 0;
        }
        else {
            // this.anchorOffsetY = this.height;
        }
        if (state == RoleStaus.down || state == RoleStaus.superme) {
            this.currFrames = [];
            if (Math.random() > 0.5) {
                this.currFrames.push(Role.STATUS_ICONS[state][0]);
            }
            else {
                this.currFrames.push(Role.STATUS_ICONS[state][1]);
            }
        }
        else {
            this.currFrames = Role.STATUS_ICONS[state];
        }
        this.currFrameIndex = 0;
        this.source = this.currFrames[this.currFrameIndex];
    };
    /**
     * 摇摆
     */
    Role.prototype.swing = function () {
        this._swinging++;
        if (this._swinging > this.maxFrame) {
            this._swinging = 0;
        }
        if (this._swinging != 0) {
            return;
        }
        if (this.currFrameIndex < this.currFrames.length - 1) {
            this.currFrameIndex++;
        }
        else if (this.loop) {
            this.currFrameIndex = 0;
        }
        this.source = this.currFrames[this.currFrameIndex];
        return false;
    };
    /**
     * 播放动画
     */
    Role.prototype.play = function (isLoop) {
        if (isLoop === void 0) { isLoop = true; }
        this.loop = isLoop;
        egret.startTick(this.swing, this);
        this._swinging = 0;
    };
    /**
     * 停止动画
     */
    Role.prototype.stop = function () {
        egret.stopTick(this.swing, this);
    };
    Object.defineProperty(Role.prototype, "roleIndex", {
        /**
         * 人物当前所在位置
         */
        get: function () {
            return this._roleIndex;
        },
        set: function (val) {
            if (this._roleIndex == val) {
                return;
            }
            this._roleIndex = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 状态图标
     */
    Role.STATUS_ICONS = [
        ["role_down_1", "role_down_2"],
        ["role_withstand"],
        ["role_superme_1", "role_superme_2"],
        ["role_defualt_1", "role_defualt_2", "role_defualt_3", "role_defualt_4", "role_defualt_5"],
        ["blood_1", "blood_2", "blood_3", "blood_4", "blood_5"]
    ];
    return Role;
}(eui.Image));
__reflect(Role.prototype, "Role");
var RoleStaus;
(function (RoleStaus) {
    /**
     * 蹲下
     */
    RoleStaus[RoleStaus["down"] = 0] = "down";
    /**
     * 顶住
     */
    RoleStaus[RoleStaus["withstand"] = 1] = "withstand";
    RoleStaus[RoleStaus["superme"] = 2] = "superme";
    /**
     * 正常状态
     */
    RoleStaus[RoleStaus["normal"] = 3] = "normal";
    /**
     * 死亡
     */
    RoleStaus[RoleStaus["blood"] = 4] = "blood";
})(RoleStaus || (RoleStaus = {}));
//# sourceMappingURL=Role.js.map