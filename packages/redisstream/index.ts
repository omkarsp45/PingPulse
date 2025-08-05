require('dotenv').config({ path: __dirname + '/.env' });
import { createClient } from 'redis';

console.log(process.env.REDIS_URL)
const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

const STREAM_NAME = 'pingpulse:website'

type WebsiteEvent = {
    url: string,
    id: string
}

type MessageType = {
    id: string,
    message: {
        url: string,
        id: string
    }
}

async function xAdd({ url, id }: WebsiteEvent) {
    await client.xAdd(
        STREAM_NAME, '*', {
        url,
        id
    }
    );
}

export async function xAddBulk(websites: WebsiteEvent[]) {
    for (let i = 0; i < websites.length; i++) {
        await xAdd({
            url: websites[i]!.url,
            id: websites[i]!.id
        })
    }
}

export async function xReadGroup(consumerGroup: string, workerId: string): Promise<MessageType[] | undefined> {
    const res = await client.xReadGroup(
        consumerGroup,
        workerId,
        [{ key: 'pingpulse:website', id: '>' }], // '>' means new messages
        { COUNT: 3 } // Read 1 message
    );
    if (res == null) return;
    // @ts-ignore
    let messages: MessageType[] = res[0].messages;
    console.log(messages);
    return messages;
}

async function xAck(consumerGroup: string, eventId: string) {
    await client.xAck(STREAM_NAME, consumerGroup, eventId)
}

export async function xAckBulk(consumerGroup: string, eventIds: string[]) {
    eventIds.map(eventId => xAck(consumerGroup, eventId));
}

process.on('SIGINT', async () => {
    await client.quit();
    process.exit();
});