import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const BudgetVsExpense = ({ expenses }) => {
  const [budget, setBudget] = useState(12000); // default budget

  const data = [
    { name: 'Expense', value: expenses },
    { name: 'Remaining', value: Math.max(budget - expenses, 0) },
  ];

  const COLORS = ['#F87171', '#E5E7EB']; // red for expense, gray for remaining

  return (
    <div className="rounded-xl border shadow-md w-[476px] h-[340px] p-4 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-medium">Budget Vs Expense</h1>
        <i className="text-sm text-gray-500">Monthly Overview</i>
      </div>
      
      <div className="mb-4">
        <label htmlFor="budget" className="text-sm text-gray-600 mr-2">Enter Monthly Budget:</label>
        <input
          id="budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="border px-2 py-1 rounded w-40"
        />
      </div>

      {/* Donut Chart */}
      <div className="w-full h-[200px] flex items-center justify-center">
        <ResponsiveContainer width="80%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Center Text */}
      <div className="absolute top-[55%] left-[50%] transform -translate-x-1/2 -translate-y-[30%] text-center">
        <p className="text-2xl font-semibold text-gray-800">₹{expenses}</p>
        <p className="text-base text-gray-500">of ₹{budget.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default BudgetVsExpense;
