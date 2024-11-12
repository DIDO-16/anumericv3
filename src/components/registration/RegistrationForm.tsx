import React, { useState } from 'react';
import { Building2, Mail, Phone, Users } from 'lucide-react';

type RegistrationFormData = {
  companyName: string;
  sector: string;
  employeeCount: number;
  contactEmail: string;
  contactPhone: string;
  documents: File[];
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    companyName: '',
    sector: '',
    employeeCount: 0,
    contactEmail: '',
    contactPhone: '',
    documents: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Demande de location
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Remplissez ce formulaire pour soumettre votre demande
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Nom de l'entreprise
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="companyName"
                  type="text"
                  required
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                Secteur d'activité
              </label>
              <select
                id="sector"
                required
                className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              >
                <option value="">Sélectionnez un secteur</option>
                <option value="tech">Technologies</option>
                <option value="biotech">Biotechnologie</option>
                <option value="energy">Énergie</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700">
                Nombre d'employés
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="employeeCount"
                  type="number"
                  min="1"
                  required
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email de contact
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Documents requis
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="documents"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Télécharger des fichiers</span>
                      <input
                        id="documents"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setFormData({ ...formData, documents: files });
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC jusqu'à 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Soumettre la demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}