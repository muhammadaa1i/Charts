import SparkLinechart from '../SparkLinechart';
import Spiralchart from '../Spiralchart';
import Linechart from '../LineChart';
import Barchart from '../Barchart';

export default function Dashboard() {
  return (
    <div className="full-page p-6 min-h-screen text-white overflow-auto">
      <h2 className="full-text text-2xl font-bold mb-4">Dashboard Charts</h2>

      <div className="hero grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Spark Line Chart */}
        <SparkLinechart />

        {/* Spiral Chart */}
        <Spiralchart />

        {/* Line Chart */}
        <Linechart />
      </div>

      {/* Bar Chart */}
      <Barchart />
    </div>
  );
}
