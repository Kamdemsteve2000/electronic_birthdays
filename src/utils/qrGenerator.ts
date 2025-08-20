import { v4 as uuidv4 } from 'uuid';
import { GuestResponse } from '../types/invitation';

export const generateGuestQRData = (response: GuestResponse): string => {
  const qrData = {
    guestId: response.id,
    name: response.name,
    email: response.email,
    numberOfGuests: response.numberOfGuests,
    timestamp: response.timestamp.toISOString(),
    attending: response.attending,
    eventId: 'birthday-2025-sarah-johnson',
    checkInCode: uuidv4().substring(0, 8).toUpperCase()
  };

  return JSON.stringify(qrData);
};

export const createGuestResponse = (formData: any): GuestResponse => {
  const response: GuestResponse = {
    id: uuidv4(),
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    attending: formData.attending === 'true' || formData.attending === true,
    numberOfGuests: parseInt(formData.numberOfGuests) || 1,
    dietaryRestrictions: formData.dietaryRestrictions || '',
    message: formData.message || '',
    timestamp: new Date()
  };

  if (response.attending) {
    response.qrCode = generateGuestQRData(response);
  }

  return response;
};