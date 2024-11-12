import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { EventType } from '../../types';

type EventFormData = {
  title: string;
  description: string;
  type: EventType;
  date: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  price?: number;
};

type EventFormProps = {
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
};

export default function EventForm({ onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    type: 'anpt',
    date: '',
    endDate: '',
    location: '',
    maxParticipants: 20,
    price: undefined,
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type d'événement
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
            >
              <option value="anpt">ANPT</option>
              <option value="external">Externe</option>
              <option value="tenant">Locataire</option>
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lieu
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de début
            <input
              type="datetime-local"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de fin
            <input
              type="datetime-local"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre maximum de participants
            <input
              type="number"
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix (optionnel)
            <input
              type="number"
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.price || ''}
              onChange={(e) => setFormData({ ...formData, price: e.target.value ? parseFloat(e.target.value) : undefined })}
            />
          </label>
        </div>
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
          Créer l'événement
        </button>
      </div>
    </form>
  );
}