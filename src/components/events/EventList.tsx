import React, { useState } from 'react';
import { Calendar, Users, MapPin, Plus } from 'lucide-react';
import { mockEvents } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { Event } from '../../types';
import EventForm from './EventForm';

export default function EventList() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showForm, setShowForm] = useState(false);

  const handleNewEvent = (formData: any) => {
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      ...formData,
      currentParticipants: 0,
      registeredUsers: [],
      organizer: user?.id || '',
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  const handleRegister = (eventId: string) => {
    if (!user) return;

    setEvents(events.map(event => {
      if (event.id === eventId && event.currentParticipants < event.maxParticipants) {
        return {
          ...event,
          currentParticipants: event.currentParticipants + 1,
          registeredUsers: [...(event.registeredUsers || []), user.id],
        };
      }
      return event;
    }));
  };

  const isRegistered = (event: Event) => {
    return event.registeredUsers?.includes(user?.id || '');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Événements</h1>
        {user?.role === 'admin' && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Créer un événement
          </button>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Nouvel Événement</h2>
            <EventForm 
              onSubmit={handleNewEvent}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                {event.currentParticipants}/{event.maxParticipants} participants
              </div>
              {event.price && (
                <div className="text-sm text-gray-600">
                  Prix: {event.price.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              {event.currentParticipants < event.maxParticipants && !isRegistered(event) ? (
                <button 
                  onClick={() => handleRegister(event.id)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  S'inscrire
                </button>
              ) : isRegistered(event) ? (
                <button className="w-full px-4 py-2 bg-green-100 text-green-800 rounded-lg cursor-not-allowed">
                  Inscrit
                </button>
              ) : (
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed">
                  Complet
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}