// utils/ensureUserExists.ts
import { prismaClient } from 'store/client';

export async function ensureUserExists(userId: string) {
    const existing = await prismaClient.user.findUnique({
        where: { id: userId },
    });

    if (!existing) {
        // If user doesn't exist, this means there's an issue with the JWT token
        // since users should be created during signup
        throw new Error('User not found in database');
    }

    return existing;
}
