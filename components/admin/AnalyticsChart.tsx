"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", listeners: 4000, pageViews: 2400 },
  { name: "Tue", listeners: 3000, pageViews: 1398 },
  { name: "Wed", listeners: 2000, pageViews: 9800 },
  { name: "Thu", listeners: 2780, pageViews: 3908 },
  { name: "Fri", listeners: 1890, pageViews: 4800 },
  { name: "Sat", listeners: 2390, pageViews: 3800 },
  { name: "Sun", listeners: 3490, pageViews: 4300 },
];

export default function AnalyticsChart() {
  return (
    <div className="h-[400px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#ffffff40" 
            tick={{ fill: '#ffffff60', fontSize: 12, fontFamily: 'var(--font-dm-sans)' }}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#ffffff40" 
            tick={{ fill: '#ffffff60', fontSize: 12, fontFamily: 'var(--font-dm-sans)' }}
            tickLine={false}
            axisLine={false}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0a0500', 
              borderColor: '#D4920A40',
              borderRadius: '4px',
              fontFamily: 'var(--font-dm-sans)'
            }} 
            itemStyle={{ color: '#D4920A' }}
          />
          <Line 
            type="monotone" 
            dataKey="listeners" 
            stroke="#D4920A" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#D4920A', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#D4920A', stroke: '#0a0500', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="pageViews" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#0a0500', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
