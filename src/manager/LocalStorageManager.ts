/**
 * 缓存管理
 */
class LocalStorageManager 
{
	public constructor() 
	{

	}

	private static instance:LocalStorageManager;

	public static getInstance():LocalStorageManager
	{
		if(LocalStorageManager.instance == null)
		{
			LocalStorageManager.instance = new LocalStorageManager();
		}

		return LocalStorageManager.instance;
	}

	/**
	 * 最高纪录
	 */
	private MAX_SCORE:string = "MAX_SCORE";

	/**
	 * 读取缓存
	 */
	private getItem(key:string)
	{
		return egret.localStorage.getItem(key);
	}

	/**
	 * 设置缓存
	 */
	private setItem(key:string, value:string)
	{
		egret.localStorage.setItem(key, value);
	}


	/**
	 * 获得最高纪录
	 */
	public get maxScore():string
	{
		return this.getItem(this.MAX_SCORE);
	}

	/**
	 * 设置最高纪录
	 */
	public set maxScore(val:string)
	{
		this.setItem(this.MAX_SCORE, val);
	}
}