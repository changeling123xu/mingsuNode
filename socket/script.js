process.stdin.resume()
process.stdin.setEncoding('utf8')

// Receive data from WebSocket - STDIN
process.stdin.on( 'data', function( data ) {
  
  // Send data to WebSocket client - STDOUT
  
  process.stdout.write( JSON.stringify({ da: data,name:'lisi'}) +'\n' )

  // process.stdout.write( JSON.stringify({ text: '123123' }) +'\n' )

})
process.stdin.on('login',function(data){
  process.stdout.write(data)
})
// process.stdin.on('readable', function() {
//   var chunk = process.stdin.read();
//   console.log(chunk);
  
//   if (chunk !== null) {
//     process.stdout.write('data: ' + chunk);
//   }
// });
// process.stdin.on('readable', function() {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write('data: ' + chunk);
//   }
// });
// (function(){
// 	var counter = 0;
// 	var echo = function(){
// 		if (counter === 10){
// 			return;
// 		}

// 		setTimeout(function(){ sVV 
// 			counter++;
// 			echo();
// 			process.stdout.write(counter.toString() + "\n");
// 		}, 500);
// 	}

// 	echo();
// })();