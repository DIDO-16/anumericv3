import { User, Ticket, Room, Event, Invoice, ApplicationStatus, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@anpt.dz',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '2',
    username: 'it_support',
    email: 'it@anpt.dz',
    role: 'it_service',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '3',
    username: 'building_support',
    email: 'building@anpt.dz',
    role: 'building_service',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '4',
    username: 'startup_user',
    email: 'contact@startup.dz',
    role: 'company',
    companyName: 'TechStartup DZ',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
  },
  {
    id: '5',
    username: 'potential_client',
    email: 'potential@example.dz',
    role: 'potential_client',
    companyName: 'Future Tech DZ',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face',
    applicationStatus: 'pending',
  }
];

export const mockCompanies = [
  {
    id: '1',
    name: 'TechStartup DZ',
    sector: 'Technologies',
    description: 'Startup spécialisée en solutions IoT',
    employeeCount: 15,
    joinedDate: '2024-01-01',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Future Tech DZ',
    sector: 'Intelligence Artificielle',
    description: 'Solutions IA pour l\'industrie',
    employeeCount: 8,
    joinedDate: '2024-03-01',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop',
    status: 'pending'
  }
];

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Problème de Connexion Internet',
    description: 'Connexion internet lente dans le bureau 203',
    type: 'it',
    status: 'todo',
    priority: 'high',
    createdBy: '4',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    comments: [
      {
        id: '1',
        ticketId: '1',
        userId: '2',
        content: 'Un technicien va vérifier le problème sous peu.',
        createdAt: '2024-03-15T10:30:00Z',
      }
    ]
  },
  {
    id: '2',
    title: 'Climatisation défectueuse',
    description: 'La climatisation ne fonctionne pas dans la salle de réunion B',
    type: 'building',
    status: 'in_progress',
    priority: 'medium',
    createdBy: '4',
    assignedTo: '3',
    createdAt: '2024-03-14T09:00:00Z',
    updatedAt: '2024-03-14T14:00:00Z',
  }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Salle de Conférence A',
    capacity: 20,
    type: 'meeting',
    equipment: ['projecteur', 'tableau blanc', 'visioconférence'],
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Salle de Formation 1',
    capacity: 30,
    type: 'training',
    equipment: ['projecteur', 'tableau blanc', 'ordinateurs'],
    isAvailable: true,
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Workshop Innovation',
    description: 'Workshop sur l\'innovation technologique',
    type: 'anpt',
    date: '2024-04-01T14:00:00Z',
    endDate: '2024-04-01T17:00:00Z',
    location: 'Salle de Conférence A',
    maxParticipants: 30,
    currentParticipants: 12,
    registeredUsers: ['4'],
    organizer: '1'
  },
  {
    id: '2',
    title: 'Formation IA',
    description: 'Introduction à l\'Intelligence Artificielle',
    type: 'external',
    date: '2024-04-15T09:00:00Z',
    endDate: '2024-04-15T17:00:00Z',
    location: 'Salle de Formation 1',
    maxParticipants: 20,
    currentParticipants: 8,
    organizer: '1',
    price: 15000
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    companyId: '4',
    number: 'INV-2024-001',
    date: '2024-03-01',
    dueDate: '2024-03-31',
    items: [
      {
        id: '1',
        description: 'Location Bureau 203',
        quantity: 1,
        unitPrice: 50000,
        total: 50000,
        type: 'rent'
      }
    ],
    total: 50000,
    status: 'pending'
  },
  {
    id: '2',
    companyId: '4',
    number: 'INV-2024-002',
    date: '2024-02-01',
    dueDate: '2024-02-29',
    items: [
      {
        id: '1',
        description: 'Location Bureau 203',
        quantity: 1,
        unitPrice: 50000,
        total: 50000,
        type: 'rent'
      }
    ],
    total: 50000,
    status: 'paid',
    paidAt: '2024-02-15'
  }
];

export const mockApplications: ApplicationStatus[] = [
  {
    id: '1',
    userId: '5',
    companyName: 'Future Tech DZ',
    sector: 'Intelligence Artificielle',
    employeeCount: 8,
    documents: [
      {
        type: 'Registre de commerce',
        url: '/documents/rc.pdf',
        status: 'approved'
      },
      {
        type: 'Plan d\'affaires',
        url: '/documents/business-plan.pdf',
        status: 'pending'
      }
    ],
    status: 'pending',
    comments: [
      'Documents supplémentaires requis pour le plan d\'affaires'
    ],
    submittedAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T14:30:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '4',
    message: 'Votre ticket IT a été pris en charge',
    date: '2024-03-15T10:30:00Z',
    read: false,
    type: 'ticket_update'
  },
  {
    id: '2',
    userId: '4',
    message: 'Nouvel événement: Workshop Innovation',
    date: '2024-03-14T15:00:00Z',
    read: true,
    type: 'event'
  },
  {
    id: '3',
    userId: '4',
    message: 'Rappel: Réservation salle de réunion demain',
    date: '2024-03-13T09:00:00Z',
    read: true,
    type: 'room_booking'
  }
];