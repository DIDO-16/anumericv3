import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Clock, AlertCircle } from 'lucide-react';
import { Ticket, TicketStatus } from '../../types';
import { mockUsers } from '../../data/mockData';

type Column = {
  id: TicketStatus;
  title: string;
};

const columns: Column[] = [
  { id: 'todo', title: 'À faire' },
  { id: 'in_progress', title: 'En cours' },
  { id: 'done', title: 'Terminé' }
];

type KanbanBoardProps = {
  tickets: Ticket[];
  onTicketMove: (ticketId: string, newStatus: TicketStatus) => void;
};

export default function KanbanBoard({ tickets, onTicketMove }: KanbanBoardProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const ticketId = result.draggableId;
    const newStatus = result.destination.droppableId as TicketStatus;
    
    onTicketMove(ticketId, newStatus);
  };

  const getColumnTickets = (columnId: TicketStatus) => {
    return tickets.filter(ticket => ticket.status === columnId);
  };

  const getTimeSpent = (ticket: Ticket) => {
    if (!ticket.actualTime) return 'Non démarré';
    return `${Math.round(ticket.actualTime / 60)}h ${ticket.actualTime % 60}m`;
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column.id} className="flex-1 min-w-[320px]">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center justify-between">
              {column.title}
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {getColumnTickets(column.id).length}
              </span>
            </h3>
            
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 rounded-lg p-4 min-h-[calc(100vh-240px)]"
                >
                  {getColumnTickets(column.id).map((ticket, index) => (
                    <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white rounded-lg shadow-sm p-4 mb-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                              ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              <AlertCircle className="h-3 w-3 inline mr-1" />
                              {ticket.priority}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {getTimeSpent(ticket)}
                            </div>
                            
                            {ticket.assignedTo && (
                              <div className="flex items-center">
                                <img
                                  src={mockUsers.find(u => u.id === ticket.assignedTo)?.avatar}
                                  alt="Assignee"
                                  className="h-6 w-6 rounded-full"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}