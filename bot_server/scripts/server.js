// Description:
//   gRPC bot server
'use strict';

const PROTO_PATH = '../hello.proto';
const grpc = require('grpc');
const helloStream = grpc.load(PROTO_PATH).hello;
const cache = {};

module.exports = (robot) => {
  robot.respond(/CACHE$/i, (res) => {
    cache.room = res.message.room;
    res.send('cache.');
  });

  const ping = (call) => {
    call.on('data', (req) => {
      if (!cache.room) {
        call.write({ msg: 'not found room.' });
        return;
      }

      const text = `receive message: ${ req.msg }`;

      robot.send(cache, {
        text,
        onsend: () => call.write({ msg: 'done.', roomId: req.roomId }),
      });
    });

    call.on('end', () => call.end());
  };

  const server = new grpc.Server();
  server.addService(helloStream.World.service, { ping });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
};
