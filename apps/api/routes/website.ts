import express from 'express';
import { prismaClient } from "store/client"
import { authMiddleware } from "../middleware.ts";
import { ensureUserExists } from '../ensureUserExists.ts';

const router = express.Router();

// Add a new website
router.post("/", authMiddleware, async (req, res) => {
    const { userId } = (req as any).auth;
    await ensureUserExists(userId);
    if (!req.body.url) {
        return res.status(411).json({
            message: "URL not found"
        });
    }
    try {
        const website = await prismaClient.website.create({
            data: {
                url: req.body.url,
                name: req.body.name || req.body.url, // Use provided name or fallback to URL
                timeAdded: new Date(),
                userId: userId
            }
        });
        res.status(200).json({
            message: "Website added successfully",
            id: website.id
        });
    } catch (e) {
        res.status(403).json({
            message: "Database error. Try again!!!",
            Error: e
        });
    }
});

// Get all websites for a user
router.get("/", authMiddleware, async (req, res) => {
    const { userId } = (req as any).auth;
    try {
        const websites = await prismaClient.website.findMany({
            where: {
                userId: userId
            },
            include: {
                ticks: {
                    orderBy: [
                        {
                            createdAt: 'desc'
                        }
                    ],
                    take: 1 // Get only the latest tick for each website
                }
            },
            orderBy: {
                timeAdded: 'desc'
            }
        });

        const websitesWithStatus = websites.map(website => {
            const latestTick = website.ticks[0] || null;
            return {
                id: website.id,
                url: website.url,
                name: website.name,
                timeAdded: website.timeAdded,
                latestStatus: latestTick ? latestTick.status : 'No data',
                latestResponseTime: latestTick ? latestTick.response_time_ms : null,
                latestCheckedAt: latestTick ? latestTick.createdAt : null
            };
        });

        res.status(200).json({
            websites: websitesWithStatus
        });
    } catch (e) {
        res.status(500).json({
            message: "Error fetching websites",
            Error: e
        });
    }
});

// Get status of a website by ID
router.get("/status/:websiteId", authMiddleware, async (req, res) => {
    const websiteId = req.params.websiteId;
    const { userId } = (req as any).auth;

    const website = await prismaClient.website.findMany({
        where: {
            id: websiteId,
            userId: userId
        },
        include: {
            ticks: {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
                take: 1 // Get only the latest tick
            }
        }
    });

    if (website.length === 0) {
        return res.status(404).json({
            message: "Website not found"
        });
    }

    if (!website[0]) {
        return res.status(404).json({
            message: "Website not found"
        });
    }

    const latestTick = website[0].ticks[0] || null;

    res.status(200).json({
        website: {
            id: website[0].id,
            url: website[0].url,
            name: website[0].name,
            timeAdded: website[0].timeAdded,
            latestStatus: latestTick ? latestTick.status : 'No data',
            latestResponseTime: latestTick ? latestTick.response_time_ms : null,
            latestCheckedAt: latestTick ? latestTick.createdAt : null
        }
    });
});

// Get response times of a website by ID
router.get("/response-times/:websiteId", authMiddleware, async (req, res) => {
    const websiteId = req.params.websiteId;
    const { userId } = (req as any).auth;

    const website = await prismaClient.website.findMany({
        where: {
            id: websiteId,
            userId: userId
        },
        include: {
            ticks: {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
                take: 10
            }
        }
    });

    if (website.length === 0 || !website[0]) {
        return res.status(404).json({
            message: "Website not found"
        });
    }

    // Transform ticks to response time data format
    const responseData = website[0]?.ticks?.map((tick: any) => ({
        timestamp: tick.createdAt,
        responseTime: tick.response_time_ms,
        status: tick.status
    })) || [];

    res.status(200).json({
        websiteId: website[0].id,
        url: website[0].url,
        responseTimes: responseData
    });
});

// Delete a website by ID
router.delete("/:websiteId", authMiddleware, async (req, res) => {
    const websiteId = req.params.websiteId;
    const { userId } = (req as any).auth;

    try {
        // First, ensure the website belongs to the user
        const website = await prismaClient.website.findUnique({
            where: {
                id: websiteId
            }
        });

        if (!website || website.userId !== userId) {
            return res.status(404).json({
                message: "Website not found or you do not have permission to delete it"
            });
        }

        // Delete associated ticks first due to foreign key constraint
        await prismaClient.websiteTick.deleteMany({
            where: {
                website_id: websiteId
            }
        });

        // Now delete the website
        await prismaClient.website.delete({
            where: {
                id: websiteId
            }
        });

        res.status(200).json({
            message: "Website deleted successfully"
        });
    } catch (e) {
        res.status(500).json({
            message: "Error deleting website",
            Error: e
        });
    }
});

export default router;