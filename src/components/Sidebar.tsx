import React from 'react';
import { Home, Ticket, Calendar, Users, Building2, BookOpen, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type View = 'dashboard' | 'tickets' | 'rooms' | 'events' | 'billing';

type MenuItem = {
  icon: React.ElementType;
  label: string;
  view: View;
  roles: string[];
};

const menuItems: MenuItem[] = [
  { icon: Home, label: 'Tableau de bord', view: 'dashboard', roles: ['admin', 'it_service', 'building_service', 'company', 'potential_client'] },
  { icon: Ticket, label: 'Tickets', view: 'tickets', roles: ['admin', 'it_service', 'building_service', 'company'] },
  { icon: Calendar, label: 'Salles', view: 'rooms', roles: ['admin', 'company'] },
  { icon: BookOpen, label: 'Événements', view: 'events', roles: ['admin', 'company', 'potential_client'] },
  { icon: FileText, label: 'Facturation', view: 'billing', roles: ['admin', 'company'] },
];

type SidebarProps = {
  onViewChange: (view: View) => void;
  currentView: View;
};

export default function Sidebar({ onViewChange, currentView }: SidebarProps) {
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">Technoparc</h1>
        
        <nav>
          <ul className="space-y-2">
            {filteredMenuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => onViewChange(item.view)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.view
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}