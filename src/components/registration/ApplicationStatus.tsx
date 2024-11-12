import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { ApplicationStatus as ApplicationStatusType } from '../../types';

type ApplicationStatusProps = {
  application: ApplicationStatusType;
};

export default function ApplicationStatus({ application }: ApplicationStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-medium text-gray-900">État de votre demande</h2>
        <p className="mt-1 text-sm text-gray-500">
          Soumise le {new Date(application.submittedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Statut global</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
            {getStatusIcon(application.status)}
            <span className="ml-1">
              {application.status === 'approved' && 'Approuvée'}
              {application.status === 'rejected' && 'Rejetée'}
              {application.status === 'pending' && 'En cours'}
            </span>
          </span>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Documents soumis</h3>
          <div className="space-y-3">
            {application.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{doc.type}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {getStatusIcon(doc.status)}
                  <span className="ml-1">
                    {doc.status === 'approved' && 'Approuvé'}
                    {doc.status === 'rejected' && 'Rejeté'}
                    {doc.status === 'pending' && 'En attente'}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {application.comments && application.comments.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Commentaires</h3>
            <div className="space-y-2">
              {application.comments.map((comment, index) => (
                <p key={index} className="text-sm text-gray-500">
                  {comment}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}