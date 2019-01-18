import amqp from 'amqplib';
import config from './config';
import { NOTIFICATION_QUEUE } from './constants';
import { ChannelData } from 'types';

const run = async () => {
  try {
    const connection = await amqp.connect(config.amqp_url);
    const channel = await connection.createChannel();

    // assert that the queue exists
    channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });

    // limit number of concurrent jobs to 3
    channel.prefetch(3);

    console.log(`[Worker]: Waiting to consume messages`);

    await channel.consume(NOTIFICATION_QUEUE, message => {
      // simulate delay for 1 second.
      setTimeout(() => {
        const data: ChannelData = JSON.parse(message.content.toString());

        const displayMessage = `Successfully sent notification to ${
          data.name
        }, at email address <${data.email}>`;

        console.log(displayMessage);
        channel.ack(message);
      }, 1000);
    });
  } catch (err) {
    console.log(err);
  }
};

run();
