import React, { useState, useEffect } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const lineData = [
    { name: '1', value: 60 }, { name: '2', value: 90 }, { name: '3', value: 80 },
    { name: '4', value: 40 }, { name: '5', value: 100 }, { name: '6', value: 30 },
    { name: '7', value: 90 }, { name: '8', value: 70 }, { name: '9', value: 100 }
];

const Linechart = () => {
    const [containerSize, setContainerSize] = useState(() => {
        const savedSize = localStorage.getItem("lineChartSize");
        return savedSize ? JSON.parse(savedSize) : { width: 300, height: 200 };
    });
    const [position, setPosition] = useState(() => {
        const savedPosition = localStorage.getItem("lineChartPosition");
        return savedPosition ? JSON.parse(savedPosition) : { top: 100, left: 100 };
    });
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        localStorage.setItem("lineChartSize", JSON.stringify(containerSize));
    }, [containerSize]);

    useEffect(() => {
        localStorage.setItem("lineChartPosition", JSON.stringify(position));
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
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            className="main relative bg-gray-800 p-4 rounded-xl md:col-span-2"
            style={{ width: containerSize.width, height: containerSize.height, position: 'absolute', top: position.top, left: position.left }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}>
            <button
                className="drive-btn w-full bg-gray-700 text-center py-1 rounded-xl text-lg mb-8 cursor-move"
                onMouseDown={handleDragStart}>
                Line Chart
            </button>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={lineData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
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

export default Linechart;
