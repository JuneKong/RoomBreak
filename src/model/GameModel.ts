/**
 * 游戏数据模块
 */
class GameModel {
	public constructor() 
	{
	}

	private static instance:GameModel;

	public static getInstance():GameModel
	{
		if(GameModel.instance == null)
		{
			GameModel.instance = new GameModel;
		}
		return GameModel.instance;
	}

	private _game_type:GameType
	/**
	 * 当前游戏类型
	 */
	public get game_type():GameType
	{
		return this._game_type;
	}

	public set game_type(val:GameType)
	{
		if(this._game_type == val)
		{
			return;
		}

		this._game_type = val;
	}

	private _curr_score:number
	/**
	 * 当前分数
	 */
	public get curr_score():GameType
	{
		return this._curr_score;
	}

	public set curr_score(val:GameType)
	{
		if(this._curr_score == val)
		{
			return;
		}

		this._curr_score = val;
	}

	private _curr_level:number
	/**
	 * 当前等级
	 */
	public get curr_level():GameType
	{
		return this._curr_level;
	}

	public set curr_level(val:GameType)
	{
		if(this._curr_level == val)
		{
			return;
		}

		this._curr_level = val;
	}
}


enum GameType 
{
	/**
	 * 正常
	 */
	normal = 0,
	/**
	 * 再玩一次
	 */
	again = 1,
}