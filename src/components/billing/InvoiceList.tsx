import React from 'react';
import { FileText, Download, Check, Clock } from 'lucide-react';
import { Invoice } from '../../types';
import { format } from 'date-fns';

type InvoiceListProps = {
  invoices: Invoice[];
  isAdmin?: boolean;
};

export default function InvoiceList({ invoices, isAdmin = false }: InvoiceListProps) {
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Check className="h-4 w-4" />;
      case 'pending':
      case 'overdue':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Numéro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              {isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    {invoice.number}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(invoice.date), 'dd/MM/yyyy')}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.companyId}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.total.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'DZD',
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    <span className="ml-1">
                      {invoice.status === 'paid' && 'Payée'}
                      {invoice.status === 'pending' && 'En attente'}
                      {invoice.status === 'overdue' && 'En retard'}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Télécharger
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}