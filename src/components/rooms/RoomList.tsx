import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { mockRooms } from '../../data/mockData';

export default function RoomList() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Salles disponibles</h1>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Calendar className="h-4 w-4 mr-2" />
            Réserver une salle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{room.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Capacité: {room.capacity} personnes
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {room.isAvailable ? 'Disponible' : 'Occupée'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-gray-700">Équipements:</p>
              <div className="flex flex-wrap gap-2">
                {room.equipment.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Disponible aujourd'hui
              </span>
              <button className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Voir le calendrier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}