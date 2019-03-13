/**
 * 人物
 */
class Role extends eui.Image
{
	public constructor() 
	{
		super();

	}

	/**
	 * 状态图标
	 */
	private static STATUS_ICONS:string[][] = [
		["role_down_1", "role_down_2"],
		["role_withstand"],
		["role_superme_1", "role_superme_2"],
		["role_defualt_1", "role_defualt_2", "role_defualt_3", "role_defualt_4", "role_defualt_5"],
		["blood_1", "blood_2", "blood_3", "blood_4", "blood_5"]		
	];

	

	private _state:RoleStaus;


	/**
	 * 设置状态
	 */
	public setStatus(state:RoleStaus):void
	{
		this._state = state;

		if(state == RoleStaus.blood)
		{
			this.loop = false;

			// this.anchorOffsetY = this.height * 0;
		}
		else
		{
			// this.anchorOffsetY = this.height;
		}

		if(state == RoleStaus.down || state == RoleStaus.superme)
		{
			this.currFrames = [];
			if(Math.random() > 0.5)
			{
				this.currFrames.push(Role.STATUS_ICONS[state][0]);
			}
			else
			{

				this.currFrames.push(Role.STATUS_ICONS[state][1]);				
			}
		}
		else
		{
			this.currFrames = Role.STATUS_ICONS[state];
		}

		this.currFrameIndex = 0;

		this.source = this.currFrames[this.currFrameIndex];
	}

	/**
	 * 当前图标
	 */
	private currFrames:string[];

	/**
	 * 当前帧数
	 */
	private currFrameIndex:number = 0;

	private maxFrame:number = 3;
	/**
	 * 正在摇摆中
	 */
	private _swinging:number;

	/**
	 * 摇摆
	 */
	private swing():boolean
	{
		this._swinging++;

		if(this._swinging > this.maxFrame)
		{
			this._swinging = 0;
		}
		if(this._swinging != 0)
		{
			return;
		}

		if(this.currFrameIndex < this.currFrames.length - 1)
		{
			this.currFrameIndex++;
		}
		else if(this.loop)
		{
			this.currFrameIndex = 0;
		}

		this.source = this.currFrames[this.currFrameIndex];
		return false;
	}


	private loop:boolean;

	/**
	 * 播放动画
	 */
	public play(isLoop:boolean = true):void
	{
		this.loop = isLoop;

		egret.startTick(this.swing, this);
		this._swinging = 0;
	}

	/**
	 * 停止动画
	 */
	public stop():void
	{
		egret.stopTick(this.swing, this);
	}

	private _roleIndex:number = 0;
	/**
	 * 人物当前所在位置
	 */
	public get roleIndex():number
	{
		return this._roleIndex;
	}

	public set roleIndex(val:number)
	{
		if(this._roleIndex == val)
		{
			return;
		}

		this._roleIndex = val;
	}

}

enum RoleStaus 
{
	/**
	 * 蹲下
	 */
	down = 0,
	/**
	 * 顶住
	 */
	withstand = 1,
	superme = 2,
	
	/**
	 * 正常状态
	 */
	normal = 3,
	/**
	 * 死亡
	 */
	blood = 4,
}