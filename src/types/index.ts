// Previous types remain the same...

export type Notification = {
  id: string;
  userId: string;
  message: string;
  date: string;
  read: boolean;
  type: 'ticket_update' | 'event' | 'room_booking' | 'invoice' | 'application';
};