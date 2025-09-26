import axios from "axios";
import { xAckBulk, xReadGroup } from "redisstream/client";
import { prismaClient } from "store/client";

const REGION_ID = "e950164a-100f-4650-a032-950f6a0ea2e3";
const WORKER_ID = "india-1";

// Clean up old website ticks (older than 1 hour)
async function cleanupOldTicks() {
    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const deletedCount = await prismaClient.websiteTick.deleteMany({
            where: {
                createdAt: {
                    lt: oneHourAgo
                }
            }
        });
        
        console.log(`🧹 Cleanup completed: Deleted ${deletedCount.count} website ticks older than 1 hour`);
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
}

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
                try {
                    const msg = await prismaClient.websiteTick.create({
                        data: {
                            response_time_ms: endTime - startTime,
                            status: "Up",
                            region_id: REGION_ID,
                            website_id: websiteId
                        }
                    })
                    console.log(msg);
                } catch (error: any) {
                    // Handle foreign key constraint violation (website was deleted)
                    if (error?.code === 'P2003') {
                        console.log(`Website ${websiteId} no longer exists, skipping tick creation`);
                    } else {
                        console.error(`Error creating website tick for ${websiteId}:`, error);
                    }
                }
                resolve()
            })
            .catch(async () => {
                const endTime = Date.now();
                try {
                    const msg = await prismaClient.websiteTick.create({
                        data: {
                            response_time_ms: endTime - startTime,
                            status: "Down",
                            region_id: REGION_ID,
                            website_id: websiteId
                        }
                    })
                    console.log(msg);
                } catch (error: any) {
                    // Handle foreign key constraint violation (website was deleted)
                    if (error?.code === 'P2003') {
                        console.log(`Website ${websiteId} no longer exists, skipping tick creation`);
                    } else {
                        console.error(`Error creating website tick for ${websiteId}:`, error);
                    }
                }
                resolve()
            })
    })
}

// Schedule main monitoring function every minute
setInterval(() => {
    main()
}, 1 * 1000 * 60)   // change this in production (very high value kept for dev)

// Schedule cleanup function every hour
setInterval(() => {
    cleanupOldTicks()
}, 60 * 60 * 1000)  // Run every hour

// Start initial execution
main()
cleanupOldTicks() // Run cleanup once on startup