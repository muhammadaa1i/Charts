import React, { useState, useEffect } from 'react';
import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts';

const spiralData = [
    { name: '1-2', value: 10 }, { name: '2-3', value: 20 }, { name: '3-4', value: 30 },
    { name: '4-5', value: 40 }, { name: '5-6', value: 50 }, { name: '6-7', value: 60 },
    { name: '7-8', value: 70 }
];

const Spiralchart = ({ sparklineWidth }) => {
    const [containerSize, setContainerSize] = useState(() => {
        const savedSize = localStorage.getItem("spiralChartSize");
        return savedSize ? JSON.parse(savedSize) : { width: 300, height: 200, left: 320 };
    });
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(() => {
        const savedPosition = localStorage.getItem("spiralChartPosition");
        return savedPosition ? JSON.parse(savedPosition) : { x: 320, y: 0 };
    });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        localStorage.setItem("spiralChartSize", JSON.stringify(containerSize));
    }, [containerSize]);

    useEffect(() => {
        localStorage.setItem("spiralChartPosition", JSON.stringify(position));
    }, [position]);

    useEffect(() => {
        setContainerSize(prev => ({ ...prev, left: Math.max(320, sparklineWidth + 20) }));
    }, [sparklineWidth]);
    
    const handleMouseDownResize = () => {
        setIsResizing(true);
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            setContainerSize((prev) => ({
                width: Math.max(150, prev.width + e.movementX),
                height: Math.max(100, prev.height + e.movementY),
                left: prev.left
            }));
        } else if (isDragging) {
            setPosition({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        setIsDragging(false);
    };

    const handleMouseDownDrag = (e) => {
        setIsDragging(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    return (
        <div 
            className="main relative bg-gray-800 p-4 rounded-xl" 
            style={{ 
                width: containerSize.width, 
                height: containerSize.height, 
                position: 'absolute', 
                left: position.x, 
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'default' 
            }}
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp} 
            onMouseLeave={handleMouseUp}>
            <button 
                className="drive-btn w-full bg-gray-700 rounded-xl py-1 text-lg mb-2 text-center cursor-move"
                onMouseDown={handleMouseDownDrag}
            >
                Spiral Chart
            </button>
            <ResponsiveContainer width="100%" height="80%">
                <RadialBarChart innerRadius="20%" outerRadius="90%" barSize={10} data={spiralData}>
                    <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background dataKey="value" fill="#ffc658" />
                    <Tooltip />
                </RadialBarChart>
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

export default Spiralchart;