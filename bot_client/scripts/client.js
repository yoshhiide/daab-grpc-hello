// Description:
//   gRPC bot client
'use strict';

const PROTO_PATH = '../hello.proto';
const grpc = require('grpc');
const helloStream = grpc.load(PROTO_PATH).hello;
const client = new helloStream.World('localhost:50051', grpc.credentials.createInsecure());
const call = client.ping();

module.exports = (robot) => {
  robot.respond(/PING$/i, (res) => {
    call.write({ msg: 'Hello, Human!', roomId: res.message.room });
  });

  call.on('data', (res) => {
    robot.send({ room: res.roomId }, { text: res.msg });
  });

  call.on('end', () => call.end());
};
