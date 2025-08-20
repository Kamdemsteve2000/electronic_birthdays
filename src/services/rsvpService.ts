import { supabase } from '../lib/supabase';
import { GuestResponse } from '../types/invitation';
import { generateGuestQRData } from '../utils/qrGenerator';

export class RSVPService {
  private static readonly EVENT_ID = 'birthday-2025-sarah-johnson';

  static async submitRSVP(formData: any): Promise<GuestResponse> {
    try {
      const attending = formData.attending === 'true' || formData.attending === true;
      
      // Create the response object
      const responseData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        attending,
        number_of_guests: attending ? parseInt(formData.numberOfGuests) || 1 : 1,
        dietary_restrictions: formData.dietaryRestrictions || '',
        message: formData.message || '',
        event_id: this.EVENT_ID,
      };

      // Generate QR code data if attending
      let qrCodeData = null;
      if (attending) {
        const tempResponse: GuestResponse = {
          id: '', // Will be set after insert
          name: responseData.name,
          email: responseData.email,
          phone: responseData.phone,
          attending: responseData.attending,
          numberOfGuests: responseData.number_of_guests,
          dietaryRestrictions: responseData.dietary_restrictions,
          message: responseData.message,
          timestamp: new Date(),
        };
        qrCodeData = generateGuestQRData(tempResponse);
      }

      // Insert or update the response in Supabase
      const { data, error } = await supabase
        .from('rsvp_responses')
        .upsert({
          ...responseData,
          qr_code: qrCodeData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'email,event_id'
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to save RSVP: ${error.message}`);
      }

      // Convert database response to GuestResponse format
      const guestResponse: GuestResponse = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        attending: data.attending,
        numberOfGuests: data.number_of_guests,
        dietaryRestrictions: data.dietary_restrictions,
        message: data.message,
        timestamp: new Date(data.created_at),
        qrCode: data.qr_code || undefined,
      };

      return guestResponse;
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      throw error;
    }
  }

  static async getAllResponses(): Promise<GuestResponse[]> {
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('*')
        .eq('event_id', this.EVENT_ID)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching responses:', error);
        throw new Error(`Failed to fetch responses: ${error.message}`);
      }

      // Convert database responses to GuestResponse format
      return data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        attending: item.attending,
        numberOfGuests: item.number_of_guests,
        dietaryRestrictions: item.dietary_restrictions,
        message: item.message,
        timestamp: new Date(item.created_at),
        qrCode: item.qr_code || undefined,
      }));
    } catch (error) {
      console.error('Error fetching responses:', error);
      return [];
    }
  }

  static async getResponseByEmail(email: string): Promise<GuestResponse | null> {
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('*')
        .eq('email', email)
        .eq('event_id', this.EVENT_ID)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw new Error(`Failed to fetch response: ${error.message}`);
      }

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        attending: data.attending,
        numberOfGuests: data.number_of_guests,
        dietaryRestrictions: data.dietary_restrictions,
        message: data.message,
        timestamp: new Date(data.created_at),
        qrCode: data.qr_code || undefined,
      };
    } catch (error) {
      console.error('Error fetching response by email:', error);
      return null;
    }
  }

  static async getAttendingCount(): Promise<{ attending: number; notAttending: number; totalGuests: number }> {
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('attending, number_of_guests')
        .eq('event_id', this.EVENT_ID);

      if (error) {
        throw new Error(`Failed to fetch attendance stats: ${error.message}`);
      }

      const stats = data.reduce(
        (acc, response) => {
          if (response.attending) {
            acc.attending += 1;
            acc.totalGuests += response.number_of_guests;
          } else {
            acc.notAttending += 1;
          }
          return acc;
        },
        { attending: 0, notAttending: 0, totalGuests: 0 }
      );

      return stats;
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
      return { attending: 0, notAttending: 0, totalGuests: 0 };
    }
  }
}