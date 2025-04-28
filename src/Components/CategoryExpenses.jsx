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
    <div className="category-expenses flex flex-col gap-3 w-[65%] text-zinc-900 rounded-lg p-2"> 
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Categories wise Expenses</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((cat, idx) => {

          return (
            <section
              key={idx}
              className="category-cart w-[220px] rounded-lg p-4 shadow hover:shadow-md transition-all bg-[#FFFFFF]"
            >
              <div className="category-cart-img w-[88px] h-[88px] rounded-lg flex items-center justify-center overflow-hidden">
                <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain bg-[#ECF4F7]" />
              </div>
              <h3 className="font-semibold mt-2 mb-4 text-zinc-900">{cat.name}</h3>

              <div className="w-full">
                <p className="text-sm text-zinc-500 mb-1">
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
