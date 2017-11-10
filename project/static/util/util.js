import C from './Common'
/**
* 这里导入Common的原因是因为addEveentListener的callback里的this指向的问题，可以使用.bind(this)解决，但是会引出removeEventListener不能取消监听新的问题
*/
let Util={
	/*监听滚动*/
	addScrollListener: function(callback){
		C.cbFun=callback;
		window.addEventListener('scroll', this.scrollEvent);
	},
	/*滚动事件*/
	scrollEvent: function(){
		console.error("12");
		if(document.body.scrollTop==document.body.scrollHeight-document.documentElement.clientHeight){
			console.error("到底了");
			console.error(typeof C.cbFun);
			if(typeof C.cbFun=="function"){
				C.cbFun();
			}
		}
	},
	/*移出滚动监听*/
	removeScrollListener: function(){
		console.error("移出滚动监听");
		window.removeEventListener('scroll', this.scrollEvent);
	},
	/*保存滚动位置*/
	setScrollY: function(key, value){
		C.scrollY[key]=value;
	},
	/*获取滚动位置*/
	getScrollY: function(key){
		return C.scrollY[key];
	},
	/*保存页数*/
	setPage: function(key, value){
		C.page[key]=value;
	},
	/*获取页数*/
	getPage: function(key){
		return C.page[key];
	}
}
export default Util