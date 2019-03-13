/**
 * 游戏结束页面
 */
class GameOverPanel extends PanelBase
{
	public constructor() 
	{
		super();
		this.skinName = 'GameOverSkin';
	}

	public score:Counter;
	public max_number:Counter;
	public btn_again:eui.Button;
	public btn_resume:eui.Button;




	/**
	 * 添加到舞台
	 */
	protected onAddToStageHandler(e:egret.Event):void
	{
		this.updateInfo();
	}

	/**
	 * 移除舞台
	 */
	protected onRemoveFromStageHandler(e:egret.Event):void
	{

	}

	private dict:any = {};

	/**
	 * 资源加载完成
	 */
	protected onUICompleteHandler(e:eui.UIEvent):void
	{
		this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
		this.btn_resume.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
		
		this.dict[this.btn_again.name] = GameType.again;
		this.dict[this.btn_resume.name] = GameType.normal;
	}


	private updateInfo():void
	{
		let localStorage:LocalStorageManager = LocalStorageManager.getInstance();
		this.max_number.setNumber(+localStorage.maxScore);
		this.score.setNumber(GameModel.getInstance().curr_score); 
	}

	private btnClickHandler(e:egret.TouchEvent):void
	{
		let target:eui.Button = e.target;
		
		GameModel.getInstance().game_type = this.dict[target.name];
		
		GamePanel.open([GameOverPanel]);
	}


	public static open(removeClazz?:any[])
	{
		manager.GameManager.getInstance().addPanel(GameOverPanel,removeClazz);
	}

	public static close()
	{
		manager.GameManager.getInstance().removePanel(GameOverPanel);
	}
}