'use client'

import { useState, useEffect, useContext } from 'react'
import TransactionForm from '../Components/TransactionForm'
import TransactionList from '../Components/TransactionList'
import ExpenseChart from '../Components/ExpenseChart'
import Budget from '@/Components/Budjet'
import CategoryExpenses from '@/Components/CategoryExpenses'
import { CategoryContext } from '@/context/CategoryContext'

export default function Home() {
  const [transactions, setTransactions] = useState([])
  const {setcategories} = useContext(CategoryContext)

  // Fetch all transactions when page loads
  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
  }, [])

  // Add new transaction
  const addTransaction = (newTx) => {
    setTransactions([newTx, ...transactions])
  }

  // Delete a transaction
  const deleteTransaction = async (id) => {
    const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
    const data = await res.json();
    setTransactions(transactions.filter(t => t._id !== id))
    setcategories(data.categories.expenses);
  }
  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === updatedTx._id ? updatedTx : tx))
    )
  }
  
  // Prepare chart data
  const monthlyTotals = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' })
    acc[month] = (acc[month] || 0) + tx.amount
    return acc
  }, {})

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({ month, total }))
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0)
  return (
    <>
      
      <div className="p-6 mx-auto space-y-4 w-full flex justify-between items-start flex-wrap">
        <TransactionForm onAdd={addTransaction}/>
        <Budget expenses={total}/>
        <ExpenseChart data={chartData} />
      </div>
      <div className='categories-list flex justify-between items-start p-6 mt-4 '>
        <CategoryExpenses/>
        <TransactionList transactions={transactions} onDelete={deleteTransaction} onUpdate={updateTransaction}/>
      </div> 
    </>
  )
}
