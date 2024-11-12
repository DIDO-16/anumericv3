import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import TicketList from './tickets/TicketList';
import RoomList from './rooms/RoomList';
import EventList from './events/EventList';
import BillingDashboard from './billing/BillingDashboard';

type View = 'dashboard' | 'tickets' | 'rooms' | 'events' | 'billing';

export default function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'tickets':
        return <TicketList />;
      case 'rooms':
        return <RoomList />;
      case 'events':
        return <EventList />;
      case 'billing':
        return <BillingDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar onViewChange={setCurrentView} currentView={currentView} />
        <main className="ml-64 flex-1">
          {renderView()}
        </main>
      </div>
    </div>
  );
}