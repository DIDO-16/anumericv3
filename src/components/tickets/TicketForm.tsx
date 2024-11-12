import React, { useState } from 'react';
import { TicketFormData } from '../../types';

type TicketFormProps = {
  onSubmit: (data: TicketFormData) => void;
  onCancel: () => void;
};

export default function TicketForm({ onSubmit, onCancel }: TicketFormProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    type: 'it',
    priority: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Titre
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type d'intervention
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'it' | 'building' })}
          >
            <option value="it">IT</option>
            <option value="building">Bâtiment</option>
          </select>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priorité
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
          >
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Soumettre
        </button>
      </div>
    </form>
  );
}