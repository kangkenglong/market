import $ from 'jquery'

let request=function(data){
	if(!data)return;
	let init={
		url: "",
		type: "GET",
		data: "",
		dataType: "json",
		// jsonp: 'callback',
		// jsonpCallback: 'callbackfunction',
		contentType: "application/json;utf-8",
		cache: true
	}

	/*合并初始参数*/
	$.extend(init, data);

	return new Promise((resolve, reject)=>{
		$.ajax({
			url: init.url,
			type: init.type,
			data: init.data,
			dataType: init.dataType,
			cache: init.cache,
			success: function(data, status){
				resolve(data);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) 
			{ 
				reject(XMLHttpRequest);
			} 
		})
	})
}
export default request