import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AdminLayout from '../components/AdminLayout';
import api from '../services/api';

interface SeoSettings {
  _id?: string;
  page: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const AdminSeo: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [seoSettings, setSeoSettings] = useState<SeoSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [formData, setFormData] = useState<SeoSettings>({
    page: '',
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });

  const pages = [
    { key: 'home', label: 'Home Page' },
    { key: 'products', label: 'Products Page' },
    { key: 'about', label: 'About Page' },
    { key: 'contact', label: 'Contact Page' }
  ];

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const fetchSeoSettings = async () => {
    try {
      const response = await api.get('/admin/seo');
      setSeoSettings(response.data);
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: string) => {
    const existing = seoSettings.find(s => s.page === page);
    if (existing) {
      setFormData(existing);
    } else {
      setFormData({
        page,
        title: `BijouxKart - ${pages.find(p => p.key === page)?.label}`,
        description: 'BijouxKart – French Elegance, Timeless Beauty. Discover our exquisite collection of fine French jewelry.',
        keywords: 'bijoukart, bijoux, french jewelry, jewelry, gold, diamonds, rings, necklaces, earrings, bracelets, luxury jewelry',
        ogTitle: '',
        ogDescription: '',
        ogImage: ''
      });
    }
    setEditingPage(page);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/seo', formData);
      fetchSeoSettings();
      setEditingPage(null);
      alert('SEO settings updated successfully!');
    } catch (error) {
      console.error('Error updating SEO settings:', error);
      alert('Error updating SEO settings');
    }
  };

  if (!user || user.role !== 'admin') {
    return <AdminLayout><div className="text-center py-20"><h1 className="text-4xl font-bold">Admin Access Required</h1></div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SEO Management</h1>
        <p className="text-gray-600 mt-2">Manage meta tags and SEO settings for BijouxKart</p>
      </div>

      <div className="admin-card">
        <div className="card-header">
          <h2 className="card-title">Page SEO Settings</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-12">Loading SEO settings...</div>
          ) : (
            <div className="space-y-4">
              {pages.map((page) => {
                const existing = seoSettings.find(s => s.page === page.key);
                return (
                  <div key={page.key} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{page.label}</h3>
                      <p className="text-sm text-gray-600">
                        {existing ? existing.title : 'No SEO settings configured'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEdit(page.key)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                      {existing ? 'Edit' : 'Configure'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">
                SEO Settings - {pages.find(p => p.key === editingPage)?.label}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Page title for search engines"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Brief description for search results"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Comma-separated keywords"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Title</label>
                <input
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) => setFormData({...formData, ogTitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Title for social media sharing"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Description</label>
                <textarea
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({...formData, ogDescription: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={2}
                  placeholder="Description for social media sharing"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Image URL</label>
                <input
                  type="url"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({...formData, ogImage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Image URL for social media sharing"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSeo;