import { HttpError } from 'wasp/server';
export const getAllPosts = async (args, context) => {
    if (!context.user) { throw new HttpError(401); }
    return context.entities.Post.findMany();
}

export const getPost = async ({ postId }, context) => {
    if (!context.user) { throw new HttpError(401); }

    const post = await context.entities.Post.findUnique({
        where: { id: Number(postId) },
        include: { comments: true }
    });
    if (!post) { throw new HttpError(404, 'Post not found'); }
    return post;
}