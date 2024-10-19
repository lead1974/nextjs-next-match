'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { MemberPhoto } from '@prisma/client';

export async function getMembers() {
    const session = await auth();
    if (!session?.user) return null;

    try {
        // throw new Error('testing error.tsx implementation');
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id
                }
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({where: {userId}})
    } catch (error) {
        console.log(error);
    }
}

export async function getMemberPhotosByUserId(userId: string) {
    const member = await prisma.member.findUnique({
        where: {userId},
        select: {photos: true}
    });

    if (!member) return null;

    return member.photos.map(p => p) as MemberPhoto[]; //to return just an array of photos
}