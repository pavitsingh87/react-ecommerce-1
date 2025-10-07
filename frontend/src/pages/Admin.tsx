import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import AdminLayout from '../components/AdminLayout';
import api from '../services/api';
import '../styles/admin.css';

const Admin: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [analytics, setAnalytics] = useState({ totalOrders: 0, totalRevenue: 0, totalUsers: 0 });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, ordersRes] = await Promise.all([
          api.get('/admin/analytics'),
          api.get('/admin/orders')
        ]);
        setAnalytics(analyticsRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Admin Access Required</h1>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card orders">
          <div className="stat-header">
            <div className="stat-title">Total Orders</div>
            <div className="stat-icon"><img src="https://img.icons8.com/ios/32/000000/purchase-order.png" alt="Orders" /></div>
          </div>
          <div className="stat-value">{analytics.totalOrders}</div>
          <div className="stat-change">+12% from last month</div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-header">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-icon"><img src="https://img.icons8.com/ios/32/000000/money-bag.png" alt="Revenue" /></div>
          </div>
          <div className="stat-value">${analytics.totalRevenue.toLocaleString()}</div>
          <div className="stat-change">+8% from last month</div>
        </div>

        <div className="stat-card users">
          <div className="stat-header">
            <div className="stat-title">Total Users</div>
            <div className="stat-icon"><img src="https://img.icons8.com/ios/32/000000/group.png" alt="Users" /></div>
          </div>
          <div className="stat-value">{analytics.totalUsers}</div>
          <div className="stat-change">+15% from last month</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card mb-8">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="card-body">
          <div className="grid md-grid-2 lg-grid-4 gap-6">
            <Link 
              to="/admin/products" 
              className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 text-center block text-decoration-none hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-3"><img src="https://img.icons8.com/ios/48/ffffff/diamond.png" alt="Products" /></div>
              <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
              <p className="text-sm opacity-90">Add, edit, delete jewelry products</p>
            </Link>
            
            <Link 
              to="/admin/orders" 
              className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 text-center block text-decoration-none hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-3"><img src="https://img.icons8.com/ios/48/ffffff/clipboard.png" alt="Orders" /></div>
              <h3 className="text-lg font-semibold mb-2">Manage Orders</h3>
              <p className="text-sm opacity-90">View and update order status</p>
            </Link>
            
            <Link 
              to="/admin/customers" 
              className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 text-center block text-decoration-none hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-3"><img src="https://img.icons8.com/ios/48/ffffff/group.png" alt="Customers" /></div>
              <h3 className="text-lg font-semibold mb-2">View Customers</h3>
              <p className="text-sm opacity-90">Customer management & analytics</p>
            </Link>
            
            <Link 
              to="/admin/reports" 
              className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 text-center block text-decoration-none hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-3"><img src="https://img.icons8.com/ios/48/ffffff/bar-chart.png" alt="Reports" /></div>
              <h3 className="text-lg font-semibold mb-2">Sales Reports</h3>
              <p className="text-sm opacity-90">Analytics and insights</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="admin-card">
        <div className="card-header">
          <h2 className="card-title">Recent Orders</h2>
        </div>
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order: any) => (
                  <tr key={order._id}>
                    <td>
                      <span className="font-medium">#{order._id.slice(-8)}</span>
                    </td>
                    <td>
                      <div>
                        <div className="font-medium">{order.user?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{order.user?.email}</div>
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;