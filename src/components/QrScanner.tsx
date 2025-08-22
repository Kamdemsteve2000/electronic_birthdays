import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, QrCode, Calendar, MapPin, Clock, Users, Phone, Mail, Car, Utensils, Wine } from 'lucide-react';
import { invitationDetails } from '../data/invitationData';

interface QRData {
  guestId: string;
  name: string;
  email: string;
  numberOfGuests: number;
  timestamp: string;
  attending: boolean;
  eventId: string;
  checkInCode: string;
}

export const QRScanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<QRData | null>(null);
  const [error, setError] = useState<string>('');
  const [manualInput, setManualInput] = useState<string>('');
  const navigate = useNavigate();

  // Handle manual QR code input for testing/demo purposes
  const handleManualInput = () => {
    try {
      const data = JSON.parse(manualInput);
      setScannedData(data);
      setError('');
    } catch (err) {
      setError('Invalid QR code data format');
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setError('');
    setManualInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
              aria-label="Back to invitation"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Invitation</span>
            </button>
            <QrCode className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">QR Code Scanner</h1>
          <p className="text-gray-600 text-center mt-2">Scan your invitation QR code to view event details</p>
        </div>

        {!scannedData ? (
          /* Scanner Interface */
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            {/* Manual Input for Demo */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Enter QR Code Data (for demo)</h3>
              <textarea
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                rows={4}
                placeholder="Paste QR code JSON data here..."
              />
              <button
                onClick={handleManualInput}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Process QR Code Data
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-center">{error}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-purple-50 rounded-xl p-4">
              <h4 className="font-medium text-purple-800 mb-2">How to use:</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Scan the QR code from your RSVP confirmation</li>
                <li>• Or paste the QR code data in the text area above</li>
                <li>• View complete event information and details</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Event Information Display */
          <div className="space-y-6">
            {/* Guest Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎊</div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {scannedData.name}!</h2>
                <p className="text-gray-600">Check-in Code: <span className="font-mono font-bold text-purple-600">{scannedData.checkInCode}</span></p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">
                    {scannedData.attending ? `Attending with ${scannedData.numberOfGuests} guest${scannedData.numberOfGuests > 1 ? 's' : ''}` : 'Not Attending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{invitationDetails.title}</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Calendar className="text-purple-600 w-5 h-5" />
                    <div>
                      <p className="font-semibold text-gray-800">Date</p>
                      <p className="text-gray-600">{invitationDetails.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Clock className="text-purple-600 w-5 h-5" />
                    <div>
                      <p className="font-semibold text-gray-800">Time</p>
                      <p className="text-gray-600">{invitationDetails.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="text-purple-600 w-5 h-5 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800">{invitationDetails.venue}</p>
                      <p className="text-gray-600">{invitationDetails.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {invitationDetails.theme && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-800">Theme</p>
                        <p className="text-gray-600">{invitationDetails.theme}</p>
                      </div>
                    </div>
                  )}

                  {invitationDetails.dressCode && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-800">Dress Code</p>
                        <p className="text-gray-600">{invitationDetails.dressCode}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Utensils className="text-purple-600 w-5 h-5" />
                    <div>
                      <p className="font-semibold text-gray-800">Food</p>
                      <p className="text-gray-600">{invitationDetails.foodArrangement}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Wine className="text-purple-600 w-5 h-5" />
                    <div>
                      <p className="font-semibold text-gray-800">Drinks</p>
                      <p className="text-gray-600">{invitationDetails.drinkArrangement}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-6 space-y-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-800 mb-3">Additional Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-3">
                      <Car className="text-purple-600 w-4 h-4" />
                      <span><strong>Parking:</strong> {invitationDetails.parking}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-purple-600 w-4 h-4" />
                      <span><strong>Emergency Contact:</strong> {invitationDetails.emergencyContact}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Host Contact</h4>
                  <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{invitationDetails.hostEmail}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{invitationDetails.hostPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={resetScanner}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Scan Another Code
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Back to Invitation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};