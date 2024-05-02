import { HttpError } from 'wasp/server'

export const createPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Post.create({
    data: {
      title: args.title,
      content: args.content,
      author: { connect: { id: context.user.id } }
    }
  });
}

export const editPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const post = await context.entities.Post.findUnique({
    where: { id: args.postId }
  });
  if (post.authorId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Post.update({
    where: { id: args.postId },
    data: { title: args.newTitle, content: args.newContent }
  });
}

export const createComment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Comment.create({
    data: {
      content: args.content,
      author: { connect: { id: context.user.id } },
      post: { connect: { id: args.postId } }
    }
  });
}