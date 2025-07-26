import { createClient } from 'redis';
import { prismaClient } from 'store/client'

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

async function xAdd() {
    const website = await prismaClient.website.findMany({
        select: {
            id: true,
            url: true
        }
    })

    console.log(website)
}

xAdd()

client.destroy()