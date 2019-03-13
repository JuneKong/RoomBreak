/**
 * 游戏开始页面
 */
class HomePanel extends PanelBase
{
	public constructor() 
	{
		super();
		this.skinName = 'HomeSkin';
	}


	public btn_begin:eui.Button;
	public btn_more:eui.Button;


	/**
	 * 添加到舞台
	 */
	protected onAddToStageHandler(e:egret.Event):void
	{

	}

	/**
	 * 移除舞台
	 */
	protected onRemoveFromStageHandler(e:egret.Event):void
	{

	}

	/**
	 * 资源加载完成
	 */
	protected onUICompleteHandler(e:eui.UIEvent):void
	{
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_beginHandler, this);
		this.btn_more.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_moreHandler, this);
		
	}

	private btn_beginHandler(e:TouchEvent):void
	{
		GameModel.getInstance().game_type = GameType.normal;
		GamePanel.open([HomePanel]);
	}

	private btn_moreHandler(e:TouchEvent):void
	{
		// 更多
	}


	public static open(removeClazz?:any[])
	{
		manager.GameManager.getInstance().addPanel(HomePanel,removeClazz);
	}

	public static close()
	{
		manager.GameManager.getInstance().removePanel(HomePanel);
	}
}