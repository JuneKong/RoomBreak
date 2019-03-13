module manager {
	/**
	 * 游戏管理类
	 */
	export class GameManager 
	{
		public constructor() 
		{

		}

		private static instance: GameManager;

		public static getInstance():GameManager
		{
			if(GameManager.instance == null)
			{
				GameManager.instance = new GameManager();
			}
			return GameManager.instance;
		}

		private _stage:egret.DisplayObjectContainer;

		public init(parent:egret.DisplayObjectContainer)
		{
			this._stage = parent;
		}

		private classDist:any = {};

		/**
		 * 显示页面
		 * @param clazz 显示的页面
		 * @param removeClazz 关闭的页面
		 */
		public addPanel(clazz:any, removeClazz?:any[]):any
		{
			let panelName:string = egret.getQualifiedClassName(clazz);
			let child:any = this.classDist[panelName];

			if(child == null)
			{
				child = new clazz();
				this.classDist[panelName] = child;
			}

			this._stage.addChild(child);

			if(removeClazz)
			{
				for(let i:number = 0; i < removeClazz.length; i++)
				{
					this.removePanel(removeClazz[i]);
				}

			}

			return child;
		}


		/**
		 * 删除页面
		 */
		public removePanel(clazz:any)
		{
			let panelName:string = egret.getQualifiedClassName(clazz);
			let child:egret.DisplayObject = this.classDist[panelName];

			if(child == null)
			{
				return;
			}

			if(child.parent)
			{
				
				child.parent.removeChild(child);
			}

		}

	}
}