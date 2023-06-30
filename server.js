const amqp = require('amqplib');

const connection = await amqp.connect('amqp://localhost');
const channel = await connection.createChannel();

const queue1 = 'client1';
const queue2 = 'client2';

await channel.assertQueue(queue1);
await channel.assertQueue(queue2);

channel.consume(queue1, (msg) => {
    channel.sendToQueue(queue2, msg.content);
  });
  
  channel.consume(queue2, (msg) => {
    channel.sendToQueue(queue1, msg.content);
  });

