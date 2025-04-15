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

  return (
    <div className='min-h-[200px] mt-[45px] p-4 border rounded-lg w-[400px] '>
    <div className='mt-6 mb-2 text-xl'>Expense List</div>
    <ul>
      {(transactions.length) === 0 ? <li>No transactions found.</li> :
        (transactions.map((t) => (
          <li key={t._id}>
            {editId === t._id ? (
              <form onSubmit={handleEditSubmit}>
                <input name="amount" value={editForm.amount} onChange={handleEditChange} />
                <input name="description" value={editForm.description} onChange={handleEditChange} />
                <input type="date" name="date" value={editForm.date} onChange={handleEditChange} />
                <button type="submit" className='mr-2 bg-zinc-300 text-black py-2 px-4 rounded-2xl mt-3'>Save</button>
                <button type="button" onClick={() => setEditId(null)} className='py-2 px-4 rounded-2xl hover:bg-zinc-300 mb-3 hover:text-black'>Cancel</button>
              </form>
            ) : (
              <div className='flex justify-between items-center'>
                {t.date.slice(0, 10)} - {t.description}: ₹{t.amount}
                <div>
                  <button onClick={() => handleEditClick(t)} className='mr-2 bg-zinc-300 text-black py-2 px-4 rounded-2xl'>Edit</button>
                  <button onClick={() => onDelete(t._id)} className='hover:bg-zinc-300 mb-3 hover:text-black py-2 px-4 rounded-2xl'>Delete</button>
                </div>
              </div>
            )}
          </li>
        )))
      }
    </ul>
    </div>
  )
}
