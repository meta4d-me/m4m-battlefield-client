//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class ResultBase extends ExcelDataBase{
	public static versition:number = 0;

	/** 
	* 从服务器同步数据到本地
	* @param fields 指定需要同步的字段 例如["name","desc"]
	*/
	public sync:(fields?:string[]) => Promise<void>;

	/** 
	* 保存数据到服务器
	* @param fields 指定需要保存的字段 例如["name","desc"]
	*/
	public save:(fields?:string[]) => Promise<void>;

	/** 
	* 获取数据数量
	*/
	public static getlistCount:() => Promise<number>;

	/** 
	* 获取列表数据
	* @param offset 从什么位置获取 默认值:0
	* @param count 指定需要保存的字段 例如["name","desc"]
	*/
	public static getlist:(offset?:number, count?:number) => Promise<ResultBase>;

	/**配置ID*/
	public id:string;
	/**游戏ID*/
	public gameId:string;
	/**胜利用户列表*/
	public winers:string;
	/**失败用户列表*/
	public losers:string;
	/**结算时间*/
	public resultTime:number;


static get list(){ if(!this._list ){this._list = new cMap()}; return this._list;};
static set list(v){ this._list=v;};		
public static  parseData(br):void {
 var length:number = br.readInt32();

for (var i = 0; i < length; i++)
{var b:string = br.readUTFBytes();
var bb:string = br.readUTFBytes();
	
}	
var row:number = br.readInt32();
var length2:number = br.readInt32();
 for (var i = 0; i < row; i++)
{ 

var baseData:ResultBase = new ResultBase ();	
	baseData.id=br.readUTFBytes();
	
	baseData.gameId=br.readUTFBytes();
	
	baseData.winers=br.readUTFBytes();
	
	baseData.losers=br.readUTFBytes();
	
	baseData.resultTime=br.readDouble();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:ResultBase):ResultBase{
var clone :ResultBase = new ResultBase();
	clone.id=old.id;
	
	clone.gameId=old.gameId;
	
	clone.winers=old.winers;
	
	clone.losers=old.losers;
	
	clone.resultTime=old.resultTime;
	
return clone;
}

public   clone(old:ResultBase){
	this.id=old.id;
	
	this.gameId=old.gameId;
	
	this.winers=old.winers;
	
	this.losers=old.losers;
	
	this.resultTime=old.resultTime;
	
}
	private static params = ["id","gameId","winers","losers","resultTime",];
	public static add(a: ResultBase, b: ResultBase, start: number = 0, end: number, limit: ResultBase) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] += b[par];
			if(limit && result[par] > limit[par])
				result[par] = limit[par];
		}
		return result;
	}

	public static sub(a: ResultBase, b: ResultBase, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: ResultBase, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: ResultBase, b: ResultBase, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: ResultBase, b: ResultBase, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: ResultBase, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: ResultBase, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(ResultBase);