export interface GuestResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  numberOfGuests: number;
  dietaryRestrictions: string;
  message?: string;
  timestamp: Date;
  qrCode?: string;
}

export interface InvitationDetails {
  title: string;
  hostName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  theme?: string;
  dressCode?: string;
  foodArrangement: string;
  drinkArrangement: string;
  parking: string;
  emergencyContact: string;
  rsvpDeadline: string;
  hostEmail: string;
  hostPhone: string;
}