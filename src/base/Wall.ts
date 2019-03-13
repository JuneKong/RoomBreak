/**
 * 墙体
 */
class Wall extends eui.Component
{
	public constructor() 
	{
		super();

		this.addEventListener(eui.UIEvent.COMPLETE, this.onUICompleteHandler, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
		
		
	}

	/**
	 * 添加舞台
	 */
	private onAddToStageHandler():void
	{
		this.init();
	}
	
	/**
	 * 移出舞台
	 */
	private onRemoveFromStageHandler():void
	{
		this.removeChildren();
	}

	/**
	 * 资源加载完成时
	 */
	private onUICompleteHandler():void
	{
		
	}

	/**
	 * 添加子项
	 */
	private addItem():void
	{
		this.bg = RES.getRes("bg_qiang_png");

		this.group_top = new eui.Group();
		this.group_bottom = new eui.Group();
		this.addChild(this.group_top);
		this.addChild(this.group_bottom);

		this.top_sprite = new egret.Sprite();
		this.group_top.addChild(this.top_sprite);
		this.top_line = new egret.Shape();
		this.group_top.addChild(this.top_line);

		this.bottom_sprite = new egret.Sprite();
		this.group_bottom.addChild(this.bottom_sprite);
		this.bottom_line = new egret.Shape();
		this.group_bottom.addChild(this.bottom_line);
	}

	/**
	 * 上墙体组
	 */
	public group_top:eui.Group;
	/**
	 * 下墙体组
	 */
	public group_bottom:eui.Group;

	/**
	 * 上墙体矩形
	 */
	private top_rects:egret.Rectangle[] = [];
	/**
	 * 下墙体矩形
	 */
	public bottom_rects:egret.Rectangle[] = [];

	/**
	 * 上墙体图
	 */
	public top_sprite:egret.Sprite;
	/**
	 * 下墙体图
	 */
	public bottom_sprite:egret.Sprite;

	/**
	 * 上界线
	 */
	private top_line:egret.Shape;
	/**
	 * 下界限
	 */
	private bottom_line:egret.Shape;

	/**
	 * 墙体最小高度
	 */
	private minWallH:number = 150;

	/**
	 * 预留空间
	 */
	private space_list:number[] = [50, 70, 90, 110];


	private _count:number = 8;
	/**
	 * 墙体个数
	 */
	public get count():number
	{
		return this._count;
	}

	public set count(val:number)
	{
		if(this._count == val)
		{
			return;
		}

		this._count = val;
	}

	/**
	 * 开始动画
	 */
	public start():void
	{
		this.shakeWall(this.group_top, 5, this, this.topShakedHandler);
	}


	private init():void
	{
		this.addItem();		

		this.updateWall();

		this.dispatchEventWith(eui.UIEvent.CREATION_COMPLETE);
	}

	/**
	 * 更新墙体
	 */
	public updateWall():void
	{
		this.createWallRect();

		// 绘制墙体
		this.drawWalls(this.top_sprite, this.top_rects);
		this.drawWalls(this.bottom_sprite, this.bottom_rects);
		// 绘制边界线
		this.drawLines(this.top_line, this.top_rects);
		this.drawLines(this.bottom_line, this.bottom_rects, true);

		this.group_top.y = -200;
	}

	/**
	 * 上墙体晃动结束时
	 */
	private topShakedHandler():void
	{
		this.touchEnabled = false;
		this.touchChildren = false;

		this.tw.to({y:0},100);

		this.tw.call(this.bottomShakeHandler, this);
	}

	/**
	 * 下墙体晃动
	 */
	private bottomShakeHandler():void
	{
		this.shakeWall(this.group_bottom, 3, this, this.showResult);
	}

	/**
	 * 显示结果
	 */
	private showResult():void
	{
		// 墙体晃动结束
		this.dispatchEventWith(egret.Event.COMPLETE);
	}


	/**
	 * 缓动对象
	 */
	private tw:egret.Tween;

	/**
	 * 墙体晃动
	 */
	private shakeWall(wall:eui.Group, shakeNum:number, thisObj?:any, overHandler?:Function):void
	{
		let count:number = 0;
		let add:number = 5;
		this.tw = egret.Tween.get(wall);
		while(shakeNum > count)
		{
			// 晃动
			this.tw.to({y: wall.y + add},50);
			this.tw.to({y: wall.y},50);

			count++;
		}

		if(overHandler)
		{
			overHandler.call(thisObj);
		}		
	}

	/**
	 * 逃生index组
	 */
	public escapeIndexs:any = {};

	/**
	 * 创建墙体rect
	 */
	private createWallRect():void
	{
		this.top_rects.length = 0;
		this.bottom_rects.length = 0;
		this.escapeIndexs = {};

		let hasNull:boolean = false;
		let wallW:number = this.width / this._count;
		for(let i:number = 0; i < this._count; i++)
		{
			let wallH:number = this.minWallH + this.random(this._count) * 10;
			this.bottom_rects.push(new egret.Rectangle(i * wallW, this.height - wallH, wallW, wallH));
			
			wallH = this.height - wallH;
			if(Math.random() < 0.2 || (!hasNull && i == this._count - 1))
			{
				let index:number = this.random(this.space_list.length);
				wallH -= this.space_list[index];
				hasNull = true;
				
				this.escapeIndexs[i] = index;
			}
			this.top_rects.push(new egret.Rectangle(i * wallW, 0, wallW, wallH));
		}
	}

	/**
	 * 随机整数
	 * @param scope 0-scope范围
	 */
	private random(scope:number = 1):number
	{ 
		return Math.floor(Math.random() * scope);
	}


	/**
	 * 背景
	 */
	private bg:egret.Texture;

	/**
	 * 绘制墙体
	 */
	private drawWalls(sprite:egret.Sprite, rects:egret.Rectangle[]):void
	{
		for(let i:number = 0; i < rects.length; i++)
		{
			let rect:egret.Rectangle = rects[i];

			let bitmap:egret.Bitmap = sprite.numChildren <= i ? null : <egret.Bitmap>sprite.getChildAt(i);
			if(bitmap == null)
			{
				bitmap = new egret.Bitmap();
				bitmap.texture = this.bg;
				sprite.addChild(bitmap);
			}
			bitmap.scrollRect = rect;
			bitmap.x = rect.x;
			bitmap.y = rect.y;
		}
		
	}

	/**
	 * 绘制线条
	 */
	private drawLines(shape:egret.Shape, rects:egret.Rectangle[], isBottom:boolean = false, line:number = 10):void
	{
		shape.graphics.clear();
		shape.graphics.lineStyle(line, 0x33E7FE);

		if(!isBottom)
		{
			for(let i:number = 0; i < rects.length; i++)
			{
				let rect:egret.Rectangle = rects[i];
				if(i == 0)
				{
					shape.graphics.moveTo(rect.x, rect.height);
					shape.graphics.lineTo(rect.x + rect.width, rect.height);
				}
				else
				{
					shape.graphics.lineTo(rect.x, rect.height);
					shape.graphics.lineTo(rect.x + rect.width, rect.height);
				}
			}
		}
		else
		{
			for(let i:number = 0; i < rects.length; i++)
			{
				let rect:egret.Rectangle = rects[i];
				let y:number = rect.y + line / 2;
				if(i == 0)
				{
					shape.graphics.moveTo(rect.x, y);
					shape.graphics.lineTo(rect.x + rect.width, y);
				}
				else
				{
					shape.graphics.lineTo(rect.x, y);
					shape.graphics.lineTo(rect.x + rect.width, y);
				}
			}
		}

		shape.graphics.endFill();
	}
}