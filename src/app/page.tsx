'use client'

import { useState, useEffect } from 'react'

type List = {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export default function Home() {
  const [lists, setLists] = useState<List[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    const res = await fetch('/api/lists')
    const data = await res.json()
    setLists(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await fetch('/api/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })

    setTitle('')
    fetchLists()
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">TODOアプリ</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="TODOを入力"
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          追加
        </button>
      </form>

      <ul className="space-y-2">
        {lists.map((list) => (
          <li key={list.id} className="border p-2 rounded bg-white flex justify-between items-center">
            <label className='flex items-center gap-2 w-full'>
              <input
                type='checkbox'
                checked={list.completed}
                onChange={async () => {
                  await fetch(`/api/lists/${list.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: !list.completed }),
                  })
                fetchLists()
                }}
              />
              <span className={list.completed ? 'line-through text-gray-500' : ''}>
                {list.title}
              </span>
            </label>
            <button
              onClick={async () => {
                await fetch(`/api/lists/${list.id}`, { method: 'DELETE' })
                fetchLists()
              }}
              className='text-red-500 hover:underline'
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
