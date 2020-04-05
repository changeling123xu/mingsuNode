const Client = require("ssh2").Client;

const client = new Client();

client.on("ready", function () {
    console.log('ssh已连接!');
    client.shell(function (err, stream) {
        if (err) throw err;
        process.stdin.setEncoding('utf8');
        let command = false;
        process.stdin.on('readable', () => {
            const chunk = process.stdin.read();
            if (chunk !== null) {
                command = true;
                stream.write(chunk)
            }
        });

        stream.on('close', function () {
            console.log('关闭shell');
            client.end();
        }).on('data', function (data) {
            if (!command) process.stdout.write(data);
            command = false;
        }).on("error", function (data) {
            console.log('err: ' + data);
        }).stderr.on('data', function (data) {
            console.log('STDERR: ' + data);
        });
    });
}).connect({
    host: '101.200.218.230',
    port: 22,
    username: 'root',
    privateKey: require('fs').readFileSync('rootlocalhost.pem')
});
