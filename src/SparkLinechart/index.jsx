import React, { useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const sparkData = [
    { name: '1', value: 20 }, { name: '2', value: 40 }, { name: '3', value: 35 },
    { name: '4', value: 50 }, { name: '5', value: 30 }, { name: '6', value: 60 },
    { name: '7', value: 45 }, { name: '8', value: 70 }, { name: '9', value: 50 }
];

const SparkLinechart = () => {
    const [containerSize, setContainerSize] = useState(() => {
        const savedSize = localStorage.getItem("sparkChartSize");
        return savedSize ? JSON.parse(savedSize) : { width: 300, height: 200 };
    });
    const [position, setPosition] = useState(() => {
        const savedPosition = localStorage.getItem("sparkChartPosition");
        return savedPosition ? JSON.parse(savedPosition) : { top: 100, left: 100 };
    });
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        localStorage.setItem("sparkChartSize", JSON.stringify(containerSize));
    }, [containerSize]);

    useEffect(() => {
        localStorage.setItem("sparkChartPosition", JSON.stringify(position));
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

    const handleDragStart = () => {
        setIsDragging(true);
    };

    return (
        <div 
            className="main relative bg-gray-800 p-4 rounded-xl" 
            style={{ width: containerSize.width, height: containerSize.height, position: 'absolute', top: position.top, left: position.left }}
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp} 
            onMouseLeave={handleMouseUp}>
            <button 
                className="drive-btn w-full bg-gray-700 rounded-xl py-1 text-lg mb-2 text-center cursor-move"
                onMouseDown={handleDragStart}>
                Spark Line
            </button>
            <ResponsiveContainer width="100%" height="70%">
                <AreaChart data={sparkData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#4fd1c5" fill="#81e6d9" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
            <button 
                className="control-btn absolute bottom-1 right-0 w-8 h-8 flex items-center justify-center text-white cursor-se-resize"
                onMouseDown={handleMouseDownResize}>
                <div className='w-3 h-1 bg-black mb-[-20px]'></div>
                <div className='w-1 h-4 bg-black mt-2'></div>
            </button>
        </div>
    );
};

export default SparkLinechart;