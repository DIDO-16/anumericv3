import React, { useState } from 'react';
import { Plus, Filter, LayoutGrid, List } from 'lucide-react';
import { mockTickets } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import TicketCard from './TicketCard';
import TicketForm from './TicketForm';
import KanbanBoard from './KanbanBoard';
import { Ticket, TicketStatus, TicketFormData } from '../../types';

export default function TicketList() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  const filteredTickets = tickets.filter(ticket => {
    if (user?.role === 'it_service') return ticket.type === 'it';
    if (user?.role === 'building_service') return ticket.type === 'building';
    if (user?.role === 'company') return ticket.createdBy === user.id;
    return true;
  });

  const handleNewTicket = (formData: TicketFormData) => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      ...formData,
      status: 'todo',
      createdBy: user?.id || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTickets([...tickets, newTicket]);
    setShowForm(false);
  };

  const handleTicketMove = (ticketId: string, newStatus: TicketStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
        : ticket
    ));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setViewMode(viewMode === 'list' ? 'kanban' : 'list')}
            className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            {viewMode === 'list' ? (
              <><LayoutGrid className="h-4 w-4 mr-2" />Vue Kanban</>
            ) : (
              <><List className="h-4 w-4 mr-2" />Vue Liste</>
            )}
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau ticket
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Nouveau Ticket</h2>
            <TicketForm 
              onSubmit={handleNewTicket}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {viewMode === 'kanban' ? (
        <KanbanBoard 
          tickets={filteredTickets}
          onTicketMove={handleTicketMove}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}