/**
 * 游戏页面
 */
class GamePanel extends PanelBase
{
	public constructor() 
	{
		super();
		this.skinName = 'GameSkin';
		RES.loadGroup('role');
	}


	/**
	 * 人物
	 */
	public role:Role;
	/**
	 * 墙体
	 */
	public wall:Wall;

	/**
	 * 分数
	 */
	public score:Counter;
	/**
	 * 关卡
	 */
	public level:Counter;


	/**
	 * 添加到舞台
	 */
	protected onAddToStageHandler(e:egret.Event):void
	{
		this.init();
	}

	/**
	 * 移除舞台
	 */
	protected onRemoveFromStageHandler(e:egret.Event):void
	{
		this.role.stop();
	}

	/**
	 * 资源加载完成
	 */
	protected onUICompleteHandler(e:eui.UIEvent):void
	{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

		this.wall.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.updateRoleHandler, this);
		this.wall.addEventListener(egret.Event.COMPLETE, this.wallShakeCompleteHandler, this);

		
	}

	private currLevel:number = 1;

	private currScore:number = 0;

	/**
	 * 更新分数和关卡
	 */
	private updateInfo():void
	{
		let gameModel = GameModel.getInstance();
		let type:GameType = GameModel.getInstance().game_type;
		switch(type)
		{
			case GameType.again:
				break;
			case GameType.normal:
				this.currLevel = 1;
				this.currScore = 0;
				break;
		}


		this.score.setNumber(this.currScore);
		this.level.setNumber(this.currLevel);
	}

	/**
	 * 点击事件
	 */
	private clickHandler(e:egret.TouchEvent):void
	{
		let stageX:number = e.stageX;
		let total:number = this.wall.count;
		
		if(stageX > this.role.x + this.role.width / 2 && this.role.roleIndex < total)
		{
			this.role.roleIndex++;
		}
		else if(stageX < this.role.x - this.role.width / 2 && this.role.roleIndex > 0)
		{
			this.role.roleIndex--;
		}
		else
		{
			return;
		}
		
		this.setRolePositionByWall(this.role.roleIndex);
	}

	/**
	 * 墙体震动完成
	 */
	private wallShakeCompleteHandler():void
	{
		this.touchEnabled = false;
		this.touchChildren = false;

		let self = this;

		let status:number = this.wall.escapeIndexs[this.role.roleIndex];
		if(status !== undefined)
		{
			this.role.setStatus(status);
			this.role.stop();
			GameModel.getInstance().game_type = GameType.again;
			// 下一关
			setTimeout(function() {
				self.nextLevel();
			}, 1000);
		}
		else
		{
			this.role.setStatus(RoleStaus.blood);
			this.setRolePositionByWall(this.role.roleIndex, -14);
			GameModel.getInstance().curr_score = this.currScore;
			GameModel.getInstance().curr_level = this.currLevel;

			setTimeout(function(){
				GameOverPanel.open([GamePanel]);
			}, 1000);
		}
		
	}

	/**
	 * 下一关
	 */
	private nextLevel():void
	{
		let max_score:number = +LocalStorageManager.getInstance().maxScore;
		this.currScore += 5;
		this.currLevel++;

		if(this.currLevel > 10)
		{
			this.escapeTime -= 500;
		}

		if(this.currScore > max_score)
		{
			LocalStorageManager.getInstance().maxScore = this.currScore.toString();
		}

		this.wall.updateWall();
		this.role.setStatus(RoleStaus.normal);
		this.init();
	}

	/**
	 * 逃生时间
	 */
	private escapeTime:number = 2000;

	private init():void
	{
		this.touchEnabled = true;
		this.touchChildren = true;

		this.updateInfo();
		this.updateRoleHandler();

		// 两秒后逃生
		let self = this;
		setTimeout(function(){
			self.wall.start()
		}, this.escapeTime);
	
	}

	private updateRoleHandler():void
	{
		this.role.visible = true;
		this.role.setStatus(RoleStaus.normal);		
		this.setRolePositionByWall(3);
		this.role.play(true);
		
	}


	/**
	 * 根据下墙体设置人物位置
	 */
	private setRolePositionByWall(index:number, offY:number = -(this.role.height -17)):void
	{
		let rects:egret.Rectangle[] = this.wall.bottom_rects;
		if(rects == null || rects.length == 0)
		{
			return;
		}
		
		this.role.roleIndex = index;

		let rec:egret.Rectangle = rects[index];
		this.role.x = rec.x + rec.width / 2;
		this.role.y = rec.y + offY; 
		
	}

	public static open(removeClazz?:any[])
	{
		manager.GameManager.getInstance().addPanel(GamePanel,removeClazz);
	}

	public static close()
	{
		manager.GameManager.getInstance().removePanel(GamePanel);
	}
}