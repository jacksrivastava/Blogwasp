import React, { useState } from 'react';
import { useQuery, useAction, getPost, editPost } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const EditPostPage = () => {
  const { data: post, isLoading, error } = useQuery(getPost, { postId: 123 });
  const editPostFn = useAction(editPost);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleEditPost = () => {
    editPostFn({ postId: post.id, newTitle, newContent });
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='New Title'
        className='px-1 py-2 border rounded text-lg'
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        placeholder='New Content'
        className='px-1 py-2 border rounded text-lg'
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      ></textarea>
      <button
        onClick={handleEditPost}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Edit Post
      </button>
    </div>
  );
}

export default EditPostPage;