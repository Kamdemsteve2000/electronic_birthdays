import React from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Users, Car, Utensils, Wine } from 'lucide-react';
import { InvitationDetails } from '../types/invitation';

interface InvitationCardProps {
  details: InvitationDetails;
  onRSVPClick: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ details, onRSVPClick }) => {
  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold mb-2">{details.title}</h1>
          <p className="text-xl opacity-90">Hosted by {details.hostName}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
      </div>

      {/* Event Details */}
      <div className="p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
              <Calendar className="text-purple-600 w-5 h-5" />
              <div>
                <p className="font-semibold text-gray-800">Date</p>
                <p className="text-gray-600">{details.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
              <Clock className="text-purple-600 w-5 h-5" />
              <div>
                <p className="font-semibold text-gray-800">Time</p>
                <p className="text-gray-600">{details.time}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-white rounded-xl shadow-sm">
              <MapPin className="text-purple-600 w-5 h-5 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">{details.venue}</p>
                <p className="text-gray-600">{details.address}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {details.theme && (
              <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
                <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-800">Theme</p>
                  <p className="text-gray-600">{details.theme}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
              <Utensils className="text-purple-600 w-5 h-5" />
              <div>
                <p className="font-semibold text-gray-800">Food</p>
                <p className="text-gray-600">{details.foodArrangement}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
              <Wine className="text-purple-600 w-5 h-5" />
              <div>
                <p className="font-semibold text-gray-800">Drinks</p>
                <p className="text-gray-600">{details.drinkArrangement}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Car className="text-gray-600 w-4 h-4" />
            <span className="text-sm"><strong>Parking:</strong> {details.parking}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="text-gray-600 w-4 h-4" />
            <span className="text-sm"><strong>Emergency Contact:</strong> {details.emergencyContact}</span>
          </div>
        </div>

        {/* RSVP Section */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">RSVP Required</h3>
          <p className="text-gray-600 mb-4">Please confirm your attendance before {details.rsvpDeadline}</p>
          <button
            onClick={onRSVPClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            RSVP Now
          </button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
          <div className="flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>{details.hostEmail}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>{details.hostPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};