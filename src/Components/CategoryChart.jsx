"use client";

import { PieChart, Pie, Cell } from "recharts";
import React,{useState,useContext,useEffect} from 'react';
import { CategoryContext } from '@/context/CategoryContext'

export default function CategoryChart() {
    const chartDatas = [
        { name: "Bills & Utilities", value: 10, color: "#007bff" },
        { name: "Food", value: 12, color: "#80d8ff" },
        { name: "Personal", value: 100, color: "#ffd600" },
        { name: "Healthcare", value: 5, color: "#ff9800" },
        { name: "Education", value: 1550, color: "#4caf50" },
        { name: "Investment", value: 94, color: "#9c27b0" },
        { name: "Transport", value: 84, color: "#ff5722" },
        { name: "Other", value: 150, color: "#f44336" },
      ];
      const {categoriesdata} = useContext(CategoryContext);
      const [chartData, setChartData] = useState(chartDatas);
      const [chartShow, setChartShow] = useState(true);
      console.log(categoriesdata);
      
          
    useEffect(() => {
        console.log("saal ab chal raha hai");
        if(categoriesdata.length > 0) {
            setChartShow(true); 
          const updatedChartData = chartDatas.map((item, index) => ({
            ...item,
            value: categoriesdata[index] || 0, // Use the value from categoriesdata or default to 0
          }));
          console.log(updatedChartData);
          
          setChartData(updatedChartData);
        }else{
            setChartShow(false);
        }

  
    },[categoriesdata])
      
    
  return (
    <div className="category-chart w-[480px] rounded-xl overflow-hidden p-4 h-[340px] shadow-md bg-[#FFFFFF] text-zinc-900">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-gray-800 m-0">Expense Distribution</h1>
        <p className="text-xs text-gray-500">From 1-27 April</p>
      </div>

      <div className="flex justify-between mt-4">
        {/* Legend */}
        <div className="mt-5">
          <ul className="list-none p-0 text-sm">
            {chartData.map((item, idx) => (
              <li key={idx} className="flex items-center mb-2 text-zinc-950">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chart */}
        {(chartShow) ? (
          <div className="relative w-auto h-[200px]">
            <PieChart width={300} height={280}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                isAnimationActive={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>) : (                                               
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No data available</p>
            </div>
          )}
        {/* <div className="relative w-auto h-[200px]">
          <PieChart width={250} height={200}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div> */}
      </div>
    </div>
  );
}
