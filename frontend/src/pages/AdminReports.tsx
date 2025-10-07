import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AdminLayout from '../components/AdminLayout';
import api from '../services/api';
import { Chart } from 'react-google-charts';

interface ReportData {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  monthlyRevenue: Array<{
    _id: { year: number; month: number };
    revenue: number;
    orders: number;
  }>;
  topProducts: Array<{
    _id: string;
    totalSold: number;
    revenue: number;
    product: { title: string; price: number };
  }>;
  ordersByStatus: Array<{
    _id: string;
    count: number;
  }>;
}

const AdminReports: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/admin/reports');
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  if (!user || user.role !== 'admin') {
    return <AdminLayout><div className="text-center py-20"><h1 className="text-4xl font-bold">Admin Access Required</h1></div></AdminLayout>;
  }

  if (loading) {
    return <AdminLayout><div className="text-center py-20">Loading reports...</div></AdminLayout>;
  }

  if (!reportData) {
    return <AdminLayout><div className="text-center py-20">Failed to load reports</div></AdminLayout>;
  }

  // Prepare chart data with fallbacks
  const revenueChartData = reportData.monthlyRevenue.length > 0 ? [
    ['Month', 'Revenue', 'Orders'],
    ...reportData.monthlyRevenue.reverse().map(month => [
      `${getMonthName(month._id.month)} ${month._id.year}`,
      month.revenue,
      month.orders
    ])
  ] : [
    ['Month', 'Revenue', 'Orders'],
    ['No Data', 0, 0]
  ];

  const statusChartData = reportData.ordersByStatus.length > 0 ? [
    ['Status', 'Count'],
    ...reportData.ordersByStatus.map(status => [
      status._id.charAt(0).toUpperCase() + status._id.slice(1),
      status.count
    ])
  ] : [
    ['Status', 'Count'],
    ['No Orders', 1]
  ];

  const topProductsChartData = reportData.topProducts.length > 0 ? [
    ['Product', 'Revenue'],
    ...reportData.topProducts.slice(0, 5).map(product => [
      product.product.title,
      product.revenue
    ])
  ] : [
    ['Product', 'Revenue'],
    ['No Sales Data', 0]
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Business insights and performance metrics</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="admin-card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-purple-600">{reportData.totalProducts}</div>
            <div className="text-gray-600 mt-2">Total Products</div>
          </div>
        </div>
        <div className="admin-card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-blue-600">{reportData.totalOrders}</div>
            <div className="text-gray-600 mt-2">Total Orders</div>
          </div>
        </div>
        <div className="admin-card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-green-600">{reportData.totalCustomers}</div>
            <div className="text-gray-600 mt-2">Total Customers</div>
          </div>
        </div>
        <div className="admin-card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-purple-600">${reportData.totalRevenue.toFixed(2)}</div>
            <div className="text-gray-600 mt-2">Total Revenue</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Revenue Chart */}
        <div className="admin-card">
          <div className="card-header">
            <h2 className="card-title">Monthly Revenue & Orders</h2>
          </div>
          <div className="card-body">
            {reportData.monthlyRevenue.length > 0 ? (
              <Chart
                chartType="ComboChart"
                width="100%"
                height="300px"
                data={revenueChartData}
                options={{
                  title: 'Revenue and Orders by Month',
                  vAxes: {
                    0: { title: 'Revenue ($)' },
                    1: { title: 'Orders' }
                  },
                  hAxis: { title: 'Month' },
                  seriesType: 'columns',
                  series: { 1: { type: 'line', targetAxisIndex: 1 } },
                  colors: ['#8b5cf6', '#3b82f6']
                }}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <img src="https://img.icons8.com/ios/48/000000/bar-chart.png" alt="No Data" className="mx-auto mb-4 opacity-50" />
                <p>No revenue data available yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Status Pie Chart */}
        <div className="admin-card">
          <div className="card-header">
            <h2 className="card-title">Orders by Status</h2>
          </div>
          <div className="card-body">
            {reportData.ordersByStatus.length > 0 ? (
              <Chart
                chartType="PieChart"
                width="100%"
                height="300px"
                data={statusChartData}
                options={{
                  title: 'Order Status Distribution',
                  colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#6b7280']
                }}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <img src="https://img.icons8.com/ios/48/000000/pie-chart.png" alt="No Data" className="mx-auto mb-4 opacity-50" />
                <p>No order data available yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products Chart */}
        <div className="admin-card">
          <div className="card-header">
            <h2 className="card-title">Top Products by Revenue</h2>
          </div>
          <div className="card-body">
            {reportData.topProducts.length > 0 ? (
              <Chart
                chartType="BarChart"
                width="100%"
                height="300px"
                data={topProductsChartData}
                options={{
                  title: 'Top 5 Products by Revenue',
                  hAxis: { title: 'Revenue ($)' },
                  vAxis: { title: 'Products' },
                  colors: ['#8b5cf6']
                }}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <img src="https://img.icons8.com/ios/48/000000/product.png" alt="No Data" className="mx-auto mb-4 opacity-50" />
                <p>No product sales data available yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="admin-card">
          <div className="card-header">
            <h2 className="card-title">Key Business Metrics</h2>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">Average Order Value</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${reportData.totalOrders > 0 ? (reportData.totalRevenue / reportData.totalOrders).toFixed(2) : '0.00'}
                  </div>
                </div>
                <div className="text-3xl"><img src="https://img.icons8.com/ios/32/000000/money-bag.png" alt="Money" /></div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">Revenue per Customer</div>
                  <div className="text-2xl font-bold text-purple-600">
                    ${reportData.totalCustomers > 0 ? (reportData.totalRevenue / reportData.totalCustomers).toFixed(2) : '0.00'}
                  </div>
                </div>
                <div className="text-3xl"><img src="https://img.icons8.com/ios/32/000000/user.png" alt="User" /></div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">Orders per Customer</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {reportData.totalCustomers > 0 ? (reportData.totalOrders / reportData.totalCustomers).toFixed(1) : '0.0'}
                  </div>
                </div>
                <div className="text-3xl"><img src="https://img.icons8.com/ios/32/000000/package.png" alt="Package" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;