'use client'

import { useState } from 'react'
import { useContext } from 'react'
import { CategoryContext } from '@/context/CategoryContext'

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ amount: '', category: '', description: '', date: '' })
  const {setcategories} = useContext(CategoryContext)

  const categories = [
    'Bills & Utilities',
    'Food',
    'Personal',
    'Healthcare',
    'Education',
    'Investment',
    'Transport',
    'Other',
  ]

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Set current date when form is submitted
    const currentDate = new Date().toISOString().slice(0, 10); // Format as YYYY-MM-DD
    const updatedForm = { ...form, date: currentDate }

    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedForm),
    })
    const data = await res.json()
    onAdd(data.created)
    setcategories(data.categories.expenses);
    setForm({ amount: '', category: '', description: '', date: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 h-[340px] border rounded-lg w-[400px]">
      <h1 className="text-2xl font-bold text-center">📊 Personal Finance Visualizer</h1>

      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        type="number"
        required
        className="border px-2 py-1 rounded w-full"
      />

      {/* Category Dropdown */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="border px-2 py-1 rounded w-full text-zinc-500"
      >
        <option value="">Select Category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat} className='bg-black text-white'>{cat}</option>
        ))}
      </select>

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="border px-2 py-1 rounded w-full"
      />

      {/* Hidden date input that will get automatically set */}
      <input
        name="date"
        value={form.date}
        onChange={handleChange}
        type="hidden"  // Hidden field, automatically filled with the current date
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded w-full">
        Add
      </button>
    </form>
  )
}
