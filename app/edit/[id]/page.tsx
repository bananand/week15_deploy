'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPost() {
    const { id } = useParams()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    router.push('/');
  };

  useEffect(() => {

      const getDetailPost = async() => {
        await fetch(`/api/posts/${id}`)
        .then(async (data) => {
            const res = await data.json()
            console.log(res)
            setTitle(res.title)
            setContent(res.content)
        })
      }
    
      getDetailPost();
  }, [])

  return (
    <main className="container mt-4">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success">Save</button>
      </form>
    </main>
  );
}