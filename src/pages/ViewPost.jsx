import React, { useState } from 'react';
import { useQuery, useAction, getPost, createComment } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const ViewPostPage = () => {
  const { data: post, isLoading, error } = useQuery(getPost, { postId: window.location.pathname.split('/').pop() });
  const createCommentFn = useAction(createComment);
  const [newCommentContent, setNewCommentContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    createCommentFn({ content: newCommentContent, postId: post.id });
    setNewCommentContent('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
      <p className='text-lg mb-4'>Author: {post.author}</p>
      <p className='mb-4'>{post.content}</p>

      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>Comments</h2>
        {post.comments.map((comment) => (
          <div key={comment.id} className='bg-gray-100 p-2 mb-2 rounded-lg'>
            <p>{comment.content}</p>
            <p className='text-sm italic'>By: {comment.author}</p>
          </div>
        ))}
      </div>

      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>Add a Comment</h2>
        <textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          className='w-full p-2 border rounded-lg mb-2'
          placeholder='Write your comment here...'
        ></textarea>
        <button
          onClick={handleCreateComment}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default ViewPostPage;