'use server';

// import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getAuthUserId } from './authActions';

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    try {
        const userId = await getAuthUserId();

        if (isLiked) {
            await prisma.memberLike.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId
                    }
                }
            })
        } else {
            await prisma.memberLike.create({
                data: {
                    sourceUserId: userId,
                    targetUserId
                }
            })
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchCurrentUserLikeIds() {
    try {
        const userId = await getAuthUserId();

        const likeIds = await prisma.memberLike.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        })

        return likeIds.map(memberLike => memberLike.targetUserId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchLikedMembers(type = 'source') {
    try {
        const userId = await getAuthUserId();

        switch (type) {
            case 'source':
                return await fetchSourceLikes(userId);
            case 'target':
                return await fetchTargetLikes(userId);
            case 'mutual':
                return await fetchMutualLikes(userId);
            default:
                return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchSourceLikes(userId: string) {
    const sourceList = await prisma.memberLike.findMany({
        where: {sourceUserId: userId},
        select: {targetMember: true}
    })
    return sourceList.map(x => x.targetMember);
}

async function fetchTargetLikes(userId: string) {
    const targetList = await prisma.memberLike.findMany({
        where: {targetUserId: userId},
        select: {sourceMember: true}
    })
    return targetList.map(x => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
    const likedUsers = await prisma.memberLike.findMany({
        where: {sourceUserId: userId},
        select: {targetUserId: true}
    });
    const likedIds = likedUsers.map(x => x.targetUserId);

    const mutualList = await prisma.memberLike.findMany({
        where: {
            AND: [
                {targetUserId: userId},
                {sourceUserId: {in: likedIds}}
            ]
        },
        select: {sourceMember: true}
    });
    return mutualList.map(x => x.sourceMember);
}
