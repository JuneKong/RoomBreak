/**
 * 页面基础类
 */
class PanelBase extends eui.Component
{
	public constructor() 
	{
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
		this.addEventListener(eui.UIEvent.COMPLETE, this.onUICompleteHandler, this);
		
	}

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
		
	}
}