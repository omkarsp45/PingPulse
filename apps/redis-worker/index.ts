import axios from "axios";
import { xAckBulk, xReadGroup } from "redisstream/client";
import { prismaClient } from "store/client";

const REGION_ID = "e950164a-100f-4650-a032-950f6a0ea2e3";
const WORKER_ID = "india-1";

// keeps on pulling websites from queue to check its uptime. 
async function main() {
    const response = await xReadGroup(REGION_ID, WORKER_ID);

    if (!response) {
        return;
    }

    let promises = response.map(({ message }) => { console.log(message.url); fetchWebsite(message.url, message.id) })
    await Promise.all(promises);
    console.log(promises.length);

    xAckBulk(REGION_ID, response.map(({ id }) => id));
}

async function fetchWebsite(url: string, websiteId: string) {
    return new Promise<void>((resolve, reject) => {
        const startTime = Date.now();

        axios.get(url)
            .then(async () => {
                const endTime = Date.now();
                const msg = await prismaClient.websiteTick.create({
                    data: {
                        response_time_ms: endTime - startTime,
                        status: "Up",
                        region_id: REGION_ID,
                        website_id: websiteId
                    }
                })
                console.log(msg);
                resolve()
            })
            .catch(async () => {
                const endTime = Date.now();
                const msg = await prismaClient.websiteTick.create({
                    data: {
                        response_time_ms: endTime - startTime,
                        status: "Down",
                        region_id: REGION_ID,
                        website_id: websiteId
                    }
                })
                console.log(msg);
                resolve()
            })
    })
}

setInterval(() => {
    main()
}, 1 * 1000 * 60)   // change this in production (very high value kept for dev)

main()