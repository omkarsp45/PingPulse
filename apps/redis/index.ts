import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

async function xAdd() {
    const res1 = await client.xAdd(
        'uptime:website', '*', {
        'url': 'https://facebook.com',
        'websiteId': '2'
    }
    );
    console.log(res1);
}

xAdd()

client.destroy()