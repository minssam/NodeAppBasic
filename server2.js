var http=require("http");
var fs=require("fs");


var server = http.createServer(function(request, response){
	console.log("client request is received..");
	
	fs.readFile("./res/smile.webp",function(error,data){
		response.writeHead(200,{"Content-Type":"image/jpeg"});
		response.end(data);
	});	
});

server.listen(8888, function(){
	console.log("Server is Running at 8888 port...");
});
