import React, { useState } from 'react';
import { FileText, DollarSign, TrendingUp } from 'lucide-react';
import InvoiceList from './InvoiceList';
import { useAuth } from '../../contexts/AuthContext';

const mockInvoices = [
  {
    id: '1',
    companyId: '1',
    number: 'INV-2024-001',
    date: '2024-03-01',
    dueDate: '2024-03-31',
    items: [
      {
        id: '1',
        description: 'Location Bureau 203',
        quantity: 1,
        unitPrice: 50000,
        total: 50000,
        type: 'rent'
      }
    ],
    total: 50000,
    status: 'pending'
  },
  {
    id: '2',
    companyId: '1',
    number: 'INV-2024-002',
    date: '2024-02-01',
    dueDate: '2024-02-29',
    items: [
      {
        id: '1',
        description: 'Location Bureau 203',
        quantity: 1,
        unitPrice: 50000,
        total: 50000,
        type: 'rent'
      }
    ],
    total: 50000,
    status: 'paid',
    paidAt: '2024-02-15'
  }
];

export default function BillingDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  const filteredInvoices = user?.role === 'company'
    ? mockInvoices.filter(invoice => invoice.companyId === user.id)
    : mockInvoices;

  const stats = {
    total: filteredInvoices.reduce((acc, inv) => acc + inv.total, 0),
    paid: filteredInvoices.filter(inv => inv.status === 'paid').reduce((acc, inv) => acc + inv.total, 0),
    pending: filteredInvoices.filter(inv => inv.status === 'pending').reduce((acc, inv) => acc + inv.total, 0)
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Facturation</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total payé</p>
              <p className="text-2xl font-semibold">{stats.paid.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">En attente</p>
              <p className="text-2xl font-semibold">{stats.pending.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-semibold">{stats.total.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'all'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Toutes les factures
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'pending'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              En attente
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'paid'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payées
            </button>
          </nav>
        </div>

        <InvoiceList 
          invoices={filteredInvoices.filter(invoice => 
            activeTab === 'all' || invoice.status === activeTab
          )}
          isAdmin={user?.role === 'admin'}
        />
      </div>
    </div>
  );
}