import React,{useContext} from 'react';
import { CategoryContext } from '@/context/CategoryContext'



const categories = [
  {
    name: 'Bills & Utilities',
    icon: '/photos/utility.png',
    spent: 3600,
    budget: 3200,
  },
  {
    name: 'Food',
    icon: '/photos/Food.png',
    spent: 3600,
    budget: 3200,
  },
  {
    name: 'Personal',
    icon: '/photos/personal.webp',
    spent: 3600,
    budget: 3200,
  },
  {
    name: 'Healthcare',
    icon: '/photos/Health.png',
    spent: 3600,
    budget: 3200,
  },
  {
    name: 'Education',
    icon: '/photos/education.png',
    spent: 3600,
    budget: 3200,
  },
  {
    name: 'Investment',
    icon: '/photos/investion.png',
    spent: 3600,
    budget: 3200,
  },
  {
    name: 'Transport',
    icon: '/photos/transport.png',
    spent: 3600,
    budget: 3200,
  },
  {
    name: 'Other',
    icon: '/photos/other.png',
    spent: 3600,
    budget: 3200,
  },
];



const CategoryExpenses = () => {
  const {categoriesdata} = useContext(CategoryContext)
  

  return (
    <div className="flex flex-col gap-5 w-[70%] ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Categories wise Expenses</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((cat, idx) => {
          const percentage = Math.min((cat.spent / cat.budget) * 100, 100);

          return (
            <section
              key={idx}
              className="w-[220px] border  rounded-lg p-4 shadow hover:shadow-md transition-all"
            >
              <div className="w-[88px] h-[88px] rounded-lg flex items-center justify-center overflow-hidden">
                <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="font-semibold mt-2 mb-4 text-zinc-300">{cat.name}</h3>

              <div className="w-full">
                <p className="text-sm text-zinc-300 mb-1">
                  Expense: <span className="font-semibold">₹{categoriesdata?.[idx] || 0}</span>
                </p>
            
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryExpenses;
