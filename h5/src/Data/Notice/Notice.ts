//请在项目中，将 SyncObject、cMap 注入到 gd3d.__ExcDate__ 对象上。
 import { ExcelDataBase } from "Data/ExcelDataBase";
import { cMap } from "Data/Map";
declare let gd3d;
export class Notice extends ExcelDataBase{
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
	public static getlist:(offset?:number, count?:number) => Promise<Notice>;

	/**配置ID*/
	public id:string;
	/**公告的标题*/
	public noticeTitle:string;
	/**任务实际开始时间*/
	public notice:string;
	/**每次只显示一次，根据上一次登录时间来客户端自行判断是否要去被动获取公告。*/
	public DisplayOnceAday:boolean;
	/**公告开始时间*/
	public StartTime:number;
	/**公告结束时间*/
	public EndTime:number;
	/**任务之前的执行状态，1正在执行，2执行错误，3执行成功，注意写任务的一定要注意可能服务器被中断的情况*/
	public taskPreviousState:number;


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

var baseData:Notice = new Notice ();	
	baseData.id=br.readUTFBytes();
	
	baseData.noticeTitle=br.readUTFBytes();
	
	baseData.notice=br.readUTFBytes();
	
	baseData.DisplayOnceAday=br.readBoolean();
	
	baseData.StartTime=br.readULong();
	
	baseData.EndTime=br.readULong();
	
	baseData.taskPreviousState=br.readInt32();
	
	this.list.set(baseData.id, baseData);

}
}
public static  clone(old:Notice):Notice{
var clone :Notice = new Notice();
	clone.id=old.id;
	
	clone.noticeTitle=old.noticeTitle;
	
	clone.notice=old.notice;
	
	clone.DisplayOnceAday=old.DisplayOnceAday;
	
	clone.StartTime=old.StartTime;
	
	clone.EndTime=old.EndTime;
	
	clone.taskPreviousState=old.taskPreviousState;
	
return clone;
}

public   clone(old:Notice){
	this.id=old.id;
	
	this.noticeTitle=old.noticeTitle;
	
	this.notice=old.notice;
	
	this.DisplayOnceAday=old.DisplayOnceAday;
	
	this.StartTime=old.StartTime;
	
	this.EndTime=old.EndTime;
	
	this.taskPreviousState=old.taskPreviousState;
	
}
	private static params = ["id","noticeTitle","notice","DisplayOnceAday","StartTime","EndTime","taskPreviousState",];
	public static add(a: Notice, b: Notice, start: number = 0, end: number, limit: Notice) {
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

	public static sub(a: Notice, b: Notice, start: number = 0, end: number) {
		if(!a || !b) return null;
		let result = this.clone(a);
		for(let i = Math.max(start, 0), e = Math.min(end, this.params.length); i < e; i++) {
			const par = this.params[i];
			result[par] -= b[par];
		}
		return result;
	}

	public static random(src: Notice, i: number = 0) {
		if(src[this.params[i]] == 0) // NOTE:
			src[this.params[i]] = Math.random();
		return JSON.stringify(src);
	}

	public static large(a: Notice, b: Notice, i: number = 0) {
		return a[this.params[i]] > b[this.params[i]];
	}

	public static max(a: Notice, b: Notice, i: number = 0) {
		if(a[this.params[i]] > b[this.params[i]])
			return a;
		return b;
	}

	public static json(a: Notice, data) {
		data = JSON.parse(data);
		for(let k in data) {
			a[k] = data[k];
		};
		return a;
	}

	public static setProperty(a: Notice, p: number, value) {
		a[this.params[p]] = value;
		return a;
	}

}if(!gd3d.__ExcDate__)gd3d.__ExcDate__= { } ; if(!gd3d.__ExcDate__.__list) gd3d.__ExcDate__.__list = []; gd3d.__ExcDate__.__list.push(Notice);