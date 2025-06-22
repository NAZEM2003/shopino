"use client"
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const GrowthRate = () => {
    const data = [
        {
            date: "12/01/2023",
            current: 4050,
            prev: 3200
        },
        {
            date: "01/01/2023",
            current: 5200,
            prev: 4050
        },
        {
            date: "02/01/2023",
            current: 2100,
            prev: 5200
        },
        {
            date: "03/01/2023",
            current: 2500,
            prev: 2100
        },
        {
            date: "04/01/2023",
            current: 2050,
            prev: 2500
        },
        {
            date: "05/01/2023",
            current: 1160,
            prev: 2050
        },
        {
            date: "06/01/2023",
            current: 2800,
            prev: 1160
        },
        {
            date: "07/01/2023",
            current: 3520,
            prev: 2800
        },
    ]
    return (
        <div className='my-32 w-full max-w-[750px] h-56 '>
            <h2 className='text-zinc-800 text-2xl font-semibold text-center'>Growth Rate</h2>
            <div className='mt-10  w-full h-full'>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />

                        <Line type="monotone" dataKey="current" stroke='#0891b2' />
                        <Line type="monotone" dataKey="prev" stroke='#ea580c' />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default GrowthRate;
