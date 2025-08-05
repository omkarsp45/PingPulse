// utils/ensureUserExists.ts
import { prismaClient } from 'store/client';
import { createClerkClient } from '@clerk/backend';

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function ensureUserExists(clerkUserId: string) {
    const existing = await prismaClient.user.findUnique({
        where: { id: clerkUserId },
    });

    if (!existing) {
        const clerkUser = await clerkClient.users.getUser(clerkUserId);
        await prismaClient.user.create({
            data: {
                id: clerkUserId,
                email: clerkUser.emailAddresses[0]?.emailAddress ?? 'unknown@unknown.com',
            },
        });
    }
}
