let PROTO_PATH = __dirname + '/protos/ping.proto';

let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');
let packageDefinition = protoLoader.loadSync(
	PROTO_PATH,
	{
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true
	});
var ping = grpc.loadPackageDefinition(packageDefinition).ping;

function Shoot(call, callback) {
	callback(null, { message: 'Hello ' + call.request.name });

	console.log(`${call.request.name} is connected.`)
}

function main() {
	var server = new grpc.Server();
	server.addService(ping.Player.service, { Shoot: Shoot });
	server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
	server.start();
}

main();
