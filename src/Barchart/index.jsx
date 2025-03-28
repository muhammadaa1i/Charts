import React, { useState, useEffect } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const barData = [
    { name: '1', pv: 80, uv: -40 }, { name: '2', pv: -50, uv: 60 }, { name: '3', pv: 40, uv: -80 },
    { name: '4', pv: -60, uv: 50 }, { name: '5', pv: 90, uv: -20 }, { name: '6', pv: -30, uv: 70 },
    { name: '7', pv: 50, uv: -60 }, { name: '8', pv: -80, uv: 40 }, { name: '9', pv: 100, uv: -30 }
];

const Barchart = () => {
    const [containerSize, setContainerSize] = useState(() => {
        const savedSize = localStorage.getItem("barChartSize");
        return savedSize ? JSON.parse(savedSize) : { width: 300, height: 200 };
    });
    const [position, setPosition] = useState(() => {
        const savedPosition = localStorage.getItem("barChartPosition");
        return savedPosition ? JSON.parse(savedPosition) : { top: 100, left: 100 };
    });
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        localStorage.setItem("barChartSize", JSON.stringify(containerSize));
    }, [containerSize]);

    useEffect(() => {
        localStorage.setItem("barChartPosition", JSON.stringify(position));
    }, [position]);

    const handleMouseDownResize = () => {
        setIsResizing(true);
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            setContainerSize((prev) => ({
                width: Math.max(150, prev.width + e.movementX),
                height: Math.max(100, prev.height + e.movementY)
            }));
        } else if (isDragging) {
            setPosition((prev) => ({
                top: prev.top + e.movementY,
                left: prev.left + e.movementX
            }));
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        setIsDragging(false);
    };

    const handleDragStart = (e) => {
        setIsDragging(true);
    };

    return (
        <div 
            className="main relative bg-gray-800 p-4 rounded-xl mt-4" 
            style={{ width: containerSize.width, height: containerSize.height, position: 'absolute', top: position.top, left: position.left }}
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp} 
            onMouseLeave={handleMouseUp}>
            <button 
                className="drive-btn w-full bg-gray-700 py-1 rounded-xl text-lg mb-8 cursor-move"
                onMouseDown={handleDragStart}>
                Bar Chart
            </button>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
            <button 
                className="control-btn absolute bottom-1 right-0 w-8 h-8 flex items-center justify-center text-white cursor-se-resize"
                onMouseDown={handleMouseDownResize}>
                <div className='w-3 h-1 bg-black mb-[-20px]'></div>
                <div className='w-1 h-4 bg-black mt-2'></div>
            </button>
        </div>
    );
}

export default Barchart;