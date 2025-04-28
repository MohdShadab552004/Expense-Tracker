import { useState } from 'react'

export default function TransactionList({ transactions, onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({ amount: '', description: '', date: '' })

  const handleEditClick = (tx) => {
    setEditId(tx._id)
    setEditForm({
      amount: tx.amount,
      description: tx.description,
      date: tx.date.slice(0, 10),
    })
  }

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/transactions/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })

    const updatedTx = await res.json()
    onUpdate(updatedTx)
    setEditId(null)
  }

  // Function to format date as '27 April'
  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate)
    return dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) 
  }

  return (
    <div className='transaction-list min-h-[200px] rounded-lg w-[450px] text-zinc-900'>
      <div className='mb-4 text-2xl font-semibold'>Expense List</div>
      <div className='w-[100%] h-auto overflow-y-auto max-h-[400px]'>
      <ul className='space-y-4 bg-[#FFFFFF] p-2'>
        {transactions.length === 0 ? (
          <li className="text-center text-gray-500">No transactions found.</li>
        ) : (
          transactions.map((t) => (
            <li key={t._id} className="border-b pb-2">
              {editId === t._id ? (
                <form onSubmit={handleEditSubmit} className="flex flex-col space-y-2">
                  <input
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="border p-2 rounded"
                    placeholder="Amount"
                  />
                  <input
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="border p-2 rounded"
                    placeholder="Description"
                  />
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    className="border p-2 rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className='bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600'>
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditId(null)}
                      className='bg-gray-300 text-black py-1 px-4 rounded hover:bg-gray-400'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className='flex justify-between items-center'>
                  <div className="text-sm">
                    <div className="font-medium">{formatDate(t.date)}</div>
                    <div className="text-gray-500">{t.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₹{t.amount}</div>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleEditClick(t)}
                        className='bg-zinc-200 hover:bg-zinc-300 text-black py-1 px-3 rounded'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(t._id)}
                        className='bg-red-100 hover:bg-red-200 text-red-600 py-1 px-3 rounded'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
      </div>
    </div>
  )
}
