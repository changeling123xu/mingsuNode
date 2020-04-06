process.stdin.resume()
process.stdin.setEncoding('utf8')

// Receive data from WebSocket - STDIN
process.stdin.on( 'data', function( data ) {

  // Send data to WebSocket client - STDOUT
  process.stdout.write( JSON.stringify({ text: data.trim() }) +'\n' )

})