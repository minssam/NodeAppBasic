var http=require("http");
var fs=require("fs");
var url=require("url");
var qs=require("querystring");

var server = http.createServer(function(request, response){
	//console.log(request.url);
	
	//we cannot use request.url because we want to use only url without query stirng parameter
	//so, we must parse url with URL module 
	
	var uri = url.parse(request.url).pathname;
	console.log("uri is ", uri);
	
	switch(uri){
		case "/board/registform":
			fs.readFile("./content/regist.html", "utf-8", function(error, data){
				response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
				response.end(data);					
			});
		
		;break;
		
		case "/board/regist":
			regist(request, response);	
			response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
			response.end("insert result");					
											
		;break;
		
		case "/board/list":
			filepath="./content/regist.html";
		;break;
		
		case "/board/content":
			var parseResult = url.parse(request.url, true);
			console.log("id is ", parseResult.query.id);
						
			
			response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
			response.end("content result  ");					
		;break;
		
	}
	
	
});

function regist(request, response){
	var postData="";
	var count=0;
	
	request.on("data", function(param){
		//postData+=param;
		postData = param.toString("utf-8");
		
		count++;
		console.log("request.on param ", param);
		console.log("request.on postData ", postData);
	});
	
	request.on("end", function(){
		console.log("count is ", count);
		console.log("post param is  ", postData);
		console.log("post param is using query string module is ", qs.parse(postData));
		var board = qs.parse(postData);
		
		console.log("title is ",board.title );
		console.log("writer is ",board.writer );
		console.log("content is ",board.content );
	});	
	
}



server.listen(7979, function(){
	console.log("the server is running at 7979 port...");
});

