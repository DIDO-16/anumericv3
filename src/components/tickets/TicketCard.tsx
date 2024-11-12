import React from 'react';
import { Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { Ticket } from '../../types';
import { mockUsers } from '../../data/mockData';

type TicketCardProps = {
  ticket: Ticket;
};

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
};

export default function TicketCard({ ticket }: TicketCardProps) {
  const creator = mockUsers.find(u => u.id === ticket.createdBy);
  const assignee = ticket.assignedTo ? mockUsers.find(u => u.id === ticket.assignedTo) : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{ticket.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[ticket.status]}`}>
          {ticket.status}
        </span>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[ticket.priority]}`}>
          <AlertCircle className="h-4 w-4 inline mr-1" />
          {ticket.priority}
        </span>
        <span className="text-xs text-gray-500 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={creator?.avatar}
            alt={creator?.username}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{creator?.username}</span>
        </div>
        
        {ticket.comments && (
          <span className="text-sm text-gray-500 flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            {ticket.comments.length}
          </span>
        )}
      </div>

      {assignee && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Assigné à:</span>
            <img
              src={assignee.avatar}
              alt={assignee.username}
              className="h-6 w-6 rounded-full"
            />
            <span className="text-sm text-gray-600">{assignee.username}</span>
          </div>
        </div>
      )}
    </div>
  );
}