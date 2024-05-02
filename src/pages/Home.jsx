import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getAllPosts } from 'wasp/client/operations';

const HomePage = () => {
  const { data: posts, isLoading, error } = useQuery(getAllPosts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {posts.map((post) => (
        <div key={post.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{post.title} by {post.author.username}</div>
          <Link to={`/post/${post.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'>View Post</Link>
        </div>
      ))}
      <Link to='/new/post' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>New Post</Link>
    </div>
  );
}

export default HomePage;