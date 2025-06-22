"use client"
import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SaleChart = () => {
    const data = [
        {
            date: "12/01/2023",
            sale: 3200
        },
        {
            date: "01/01/2023",
            sale: 5060
        },
        {
            date: "02/01/2023",
            sale: 2500
        },
        {
            date: "03/01/2023",
            sale: 2345
        },
        {
            date: "04/01/2023",
            sale: 4120
        },
        {
            date: "05/01/2023",
            sale: 2345
        },
        {
            date: "06/01/2023",
            sale: 5660
        },
        {
            date: "07/01/2023",
            sale: 1150
        },
    ];

    return (
        <div className='w-full max-w-[750px] h-56 mt-20'>
            <h2 className='text-zinc-800 text-2xl font-semibold text-center'>Sale Statistics</h2>
            <div className='mt-10 w-full h-full'>
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="sale" stroke='#0d9488' fill='#2dd4bf' />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default SaleChart;
