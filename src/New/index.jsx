import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Button from "./button/index.jsx";

const initialLayout = [
  { i: "lineChart", x: 0, y: 0, w: 6, h: 3, minW: 3, minH: 2 },
  { i: "barChart", x: 6, y: 0, w: 6, h: 3, minW: 3, minH: 2 },
];

const New = () => {
  const [layout, setLayout] = useState(initialLayout);
  const [blocks, setBlocks] = useState([
    { id: "lineChart", type: "line" },
    { id: "barChart", type: "bar" },
  ]);
  const [gridWidth, setGridWidth] = useState(window.innerWidth);
  const [blockSizes, setBlockSizes] = useState({});

  // Update grid width on window resize
  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate initial block sizes based on layout
  useEffect(() => {
    const initialSizes = {};
    layout.forEach((item) => {
      const width = (item.w / 12) * (gridWidth - 32);
      const height = item.h * 100;
      initialSizes[item.i] = { width, height };
    });
    setBlockSizes(initialSizes);
  }, [layout, gridWidth]);

  const addBlock = (type) => {
    const newId = `block-${blocks.length + 1}`;
    setBlocks([...blocks, { id: "spark", type: "spark" }, { id: "spiral", type: "spiral" }, { id: newId, type }]);
    setLayout([...layout, { i: "spark", x: 0, y: 0, w: 6, h: 3, minW: 3, minH: 2 }, { i: "spiral", x: 0, y: 0, w: 6, h: 3, minW: 3, minH: 2 }, { i: newId, x: 0, y: Infinity, w: 6, h: 3, minW: 3, minH: 2 }]);
  };

  const removeBlock = (id) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== id));
    setBlockSizes((prevSizes) => {
      const newSizes = { ...prevSizes };
      delete newSizes[id];
      return newSizes;
    });
  };

  const handleResize = (layout, oldItem, newItem) => {
    const width = (newItem.w / 12) * (gridWidth - 32);
    const height = newItem.h * 100;
    setBlockSizes((prevSizes) => ({
      ...prevSizes,
      [newItem.i]: { width, height },
    }));
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
        <div>
          <Button onClick={() => addBlock("line")} className="mr-2 bg-gray-700 text-white hover:bg-gray-600">
            Add Line Chart
          </Button>
          <Button onClick={() => addBlock("bar")} className="mr-2 bg-gray-700 text-white hover:bg-gray-600">
            Add Bar Chart
          </Button>
          <Button onClick={() => addBlock("spark")} className="mr-2 bg-gray-700 text-white hover:bg-gray-600">
            Add Spark Line
          </Button>
          <Button onClick={() => addBlock("spiral")} className="mr-2 bg-gray-700 text-white hover:bg-gray-600">
            Add Spiral Chart
          </Button>
        </div>
      </div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={gridWidth - 32}
        draggableHandle=".drag-handle"
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        onResize={handleResize}
      >
        {blocks.map((block) => {
          const blockSize = blockSizes[block.id] || { width: 400, height: 200 };
          const headerHeight = 40;
          const chartWidth = blockSize.width - 32;
          const chartHeight = blockSize.height - headerHeight - 32;

          return (
            <div key={block.id} className="border border-gray-600 rounded bg-[#1A2526] flex flex-col">
              <div className="drag-handle h-auto relative cursor-move bg-[#2E3A3B] text-white p-2 rounded flex justify-between">
                <span className="text-sm font-semibold">
                  {block.type === "line"
                    ? "LINE CHART"
                    : block.type === "bar"
                    ? "BAR CHART"
                    : block.type === "spark"
                    ? "SPARK LINE"
                    : "SPIRAL CHART"}
                </span>
                <button onClick={() => removeBlock(block.id)} className="text-red-500 absolute right-3 top-1 ml-2 text-xl z-50">
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                {block.type === "line" ? (
                  <LineChart
                    width={chartWidth}
                    height={chartHeight}
                    data={[
                      { name: "0", value: 28 },
                      { name: "1", value: 58 },
                      { name: "2", value: 109 },
                      { name: "3", value: 80 },
                      { name: "4", value: 28 },
                      { name: "5", value: 58 },
                      { name: "6", value: 109 },
                      { name: "7", value: 80 },
                      { name: "8", value: 28 },
                      { name: "9", value: 58 },
                      { name: "10", value: 109 },
                      { name: "11", value: 80 },
                      { name: "12", value: 28 },
                      { name: "13", value: 58 },
                      { name: "14", value: 109 },
                      { name: "15", value: 80 },
                      { name: "16", value: 28 },
                      { name: "17", value: 58 },
                      { name: "18", value: 109 },
                      { name: "19", value: 80 },
                    ]}
                  >
                    <CartesianGrid stroke="#4A5A5B" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#FFFFFF" tick={{ fill: "#FFFFFF", fontSize: 12 }} />
                    <YAxis stroke="#FFFFFF" tick={{ fill: "#FFFFFF", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#2E3A3B", border: "none", color: "#FFFFFF" }}
                      cursor={{ stroke: "#4A5A5B", strokeWidth: 1 }}
                    />
                    <Legend
                      wrapperStyle={{ color: "#FFFFFF", fontSize: 12 }}
                      iconType="circle"
                      iconSize={10}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#FF7300"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#FF7300", stroke: "#FFFFFF", strokeWidth: 2 }}
                    />
                  </LineChart>
                ) : block.type === "bar" ? (
                  <BarChart
                    width={chartWidth}
                    height={chartHeight}
                    data={[
                      { name: "0", pv: -50, uv: 100 },
                      { name: "1", pv: 50, uv: -50 },
                      { name: "2", pv: -50, uv: 50 },
                      { name: "3", pv: 50, uv: -50 },
                      { name: "4", pv: -50, uv: 50 },
                      { name: "5", pv: 50, uv: -50 },
                      { name: "6", pv: -50, uv: 50 },
                      { name: "7", pv: 50, uv: -50 },
                      { name: "8", pv: -50, uv: 50 },
                      { name: "9", pv: 50, uv: -50 },
                      { name: "10", pv: -50, uv: 50 },
                      { name: "11", pv: 50, uv: -50 },
                      { name: "12", pv: -50, uv: 50 },
                      { name: "13", pv: 50, uv: -50 },
                      { name: "14", pv: -50, uv: 50 },
                      { name: "15", pv: 50, uv: -50 },
                      { name: "16", pv: -50, uv: 50 },
                      { name: "17", pv: 50, uv: -50 },
                      { name: "18", pv: -50, uv: 50 },
                      { name: "19", pv: 50, uv: -50 },
                    ]}
                  >
                    <CartesianGrid stroke="#4A5A5B" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#FFFFFF" tick={{ fill: "#FFFFFF", fontSize: 12 }} />
                    <YAxis stroke="#FFFFFF" tick={{ fill: "#FFFFFF", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#2E3A3B", border: "none", color: "#FFFFFF" }}
                      cursor={{ stroke: "#4A5A5B", strokeWidth: 1 }}
                    />
                    <Legend
                      wrapperStyle={{ color: "#FFFFFF", fontSize: 12 }}
                      iconType="square"
                      iconSize={10}
                    />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                ) : block.type === "spark" ? (
                  <div className="relative overflow-hidden group spark-line-wrapper">
                    <AreaChart
                      width={chartWidth}
                      height={chartHeight}
                      data={[
                        { name: "1", value: 30 },
                        { name: "2", value: 80 },
                        { name: "3", value: 45 },
                        { name: "4", value: 60 },
                        { name: "5", value: 20 },
                        { name: "6", value: 50 },
                        { name: "7", value: 70 },
                        { name: "8", value: 40 },
                        { name: "9", value: 60 },
                        { name: "10", value: 80 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00B7EB" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00B7EB" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#00B7EB"
                        strokeWidth={2}
                        fill="url(#sparkGradient)"
                        className="spark-area"
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#2E3A3B", border: "none", color: "#FFFFFF", padding: "5px", borderRadius: "4px" }}
                        cursor={{ stroke: "#4A5A5B", strokeWidth: 1 }}
                        wrapperStyle={{ visibility: "hidden" }}
                        className="spark-tooltip group-hover:visible"
                      />
                    </AreaChart>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center group spiral-chart-wrapper"
                    style={{
                      width: chartWidth * 0.8,
                      height: chartHeight * 0.8,
                    }}
                  >
                    <svg
                      width={chartWidth * 0.8}
                      height={chartHeight * 0.8}
                      viewBox="0 0 100 100"
                      className="spiral-chart"
                    >
                      {/* Outer arc (1-2) */}
                      <path
                        d="M 50 10 A 40 40 0 1 1 10 50"
                        fill="none"
                        stroke="#8884d8"
                        strokeWidth="8"
                        className="spiral-arc"
                      />
                      {/* Data label for 1-2 */}
                      <text
                        x="70"
                        y="30"
                        fill="#FFFFFF"
                        fontSize="8"
                        className="spiral-label invisible group-hover:visible"
                      >
                        32
                      </text>
                      {/* Middle arc (3-4) */}
                      <path
                        d="M 50 20 A 30 30 0 1 1 20 50"
                        fill="none"
                        stroke="#00B7EB"
                        strokeWidth="8"
                        className="spiral-arc"
                      />
                      {/* Data label for 3-4 */}
                      <text
                        x="65"
                        y="40"
                        fill="#FFFFFF"
                        fontSize="8"
                        className="spiral-label invisible group-hover:visible"
                      >
                        21
                      </text>
                      {/* Inner arc (5-6) */}
                      <path
                        d="M 50 30 A 20 20 0 1 1 30 50"
                        fill="none"
                        stroke="#82ca9d"
                        strokeWidth="8"
                        className="spiral-arc"
                      />
                      {/* Data label for 5-6 */}
                      <text
                        x="60"
                        y="50"
                        fill="#FFFFFF"
                        fontSize="8"
                        className="spiral-label invisible group-hover:visible"
                      >
                        58
                      </text>
                      {/* Innermost arc (7-8) */}
                      <path
                        d="M 50 40 A 10 10 0 1 1 40 50"
                        fill="none"
                        stroke="#FFFF00"
                        strokeWidth="8"
                        className="spiral-arc"
                      />
                      {/* Data label for 7-8 */}
                      <text
                        x="55"
                        y="60"
                        fill="#FFFFFF"
                        fontSize="8"
                        className="spiral-label invisible group-hover:visible"
                      >
                        60
                      </text>
                      {/* Center circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="5"
                        fill="#1A2526"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      {/* Legend */}
                      <text x="10" y="15" fill="#FFFFFF" fontSize="8">1-2</text>
                      <rect x="5" y="10" width="5" height="5" fill="#8884d8" />
                      <text x="10" y="25" fill="#FFFFFF" fontSize="8">3-4</text>
                      <rect x="5" y="20" width="5" height="5" fill="#00B7EB" />
                      <text x="10" y="35" fill="#FFFFFF" fontSize="8">5-6</text>
                      <rect x="5" y="30" width="5" height="5" fill="#82ca9d" />
                      <text x="10" y="45" fill="#FFFFFF" fontSize="8">7-8</text>
                      <rect x="5" y="40" width="5" height="5" fill="#FFFF00" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default New;