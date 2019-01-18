import amqp from 'amqplib';
import faker from 'faker';
import config from './config';
import { NOTIFICATION_QUEUE } from './constants';
import { ChannelData } from 'types';

const run = async () => {
  try {
    const connection = await amqp.connect(config.amqp_url);
    const channel = await connection.createChannel();

    // assert queue into existence
    channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });

    // send 100 messages to the queue
    for (let i = 0; i <= 100; i++) {
      const data: ChannelData = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
      };

      channel.sendToQueue(
        NOTIFICATION_QUEUE,
        Buffer.from(JSON.stringify(data)),
      );
    }
    console.log('👋🏿 Sent all messages to queue');
  } catch (err) {
    console.log(err);
  }
};

run();

process.on('exit', () => console.log('Exiting now'));
