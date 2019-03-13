/**
 * 计数器
 */
class Counter extends eui.Group
{
	public constructor() 
	{
		super();
	}

	/**
	 * 数字之间的间隔
	 */
	private gap:number = 14; 

	/**
	 * 设置数字
	 */
	public setNumber(num:number):void
	{
		this.clearChildren();

		if(num == null || num < 0)
		{
			return;
		}

		let arr:string[] = num.toString().split('');
		let x:number = 0;
		for(let i:number = 0; i < arr.length; i++)
		{
			let img:eui.Image = new eui.Image(arr[i]);

			img.x = x;
			x += img.width + this.gap;
			this.addChild(img);
		}
	}

	/**
	 * 清除
	 */
	private clearChildren():void
	{
		while(this.numChildren)
		{
			if(this.getChildAt(0).parent)
			{
				this.removeChildAt(0);
			}
		}
	}
}