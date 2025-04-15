'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export default function ExpenseChart({ data }) {
  return (
    <div className=" p-4 h-[340px] border rounded-lg w-[400px]">
      <h2 className="text-xl mb-2">Monthly Expenses</h2>
      {(data.length) === 0 ? <p>No transactions found.</p> : 
        <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      
      }
      
    </div>
  )
}
