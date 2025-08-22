import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Phone, Mail, Gift, Sparkles } from 'lucide-react';
import { InvitationCard } from './components/InvitationCard';
import { RSVPForm } from './components/RSVPForm';
import { ConfirmationModal } from './components/ConfirmationModal';
import { AdminDashboard } from './components/AdminDashboard';
import { QRScanner } from './components/QrScanner';
import { invitationDetails } from './data/invitationData';
import { GuestResponse } from './types/invitation';
import { RSVPService } from './services/rsvpService';

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  numberOfGuests: number;
  dietaryRestrictions: string;
  message: string;
}

function App() {
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<GuestResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRSVPClick = () => {
    setShowRSVPForm(true);
  };

  const handleRSVPSubmit = async (data: RSVPFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await RSVPService.submitRSVP(data);
      setConfirmationData(response);
      setShowRSVPForm(false);
      setShowConfirmation(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationData(null);
  };

  const handleBackToInvitation = () => {
    setShowRSVPForm(false);
    setError(null);
  };

  // Main invitation page component
  const InvitationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Floating particles animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {!showRSVPForm && !showConfirmation && (
          <InvitationCard 
            details={invitationDetails} 
            onRSVPClick={handleRSVPClick}
          />
        )}

        {showRSVPForm && (
          <div className="max-w-2xl mx-auto">
            <RSVPForm 
              onSubmit={handleRSVPSubmit}
              onClose={handleBackToInvitation}
              isVisible={true}
              loading={isLoading}
            />
          </div>
        )}

        {showConfirmation && confirmationData && (
          <ConfirmationModal
            response={confirmationData}
            onClose={handleCloseConfirmation}
            isVisible={showConfirmation}
          />
        )}
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<InvitationPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/qr-scanner" element={<QRScanner />} />
    </Routes>
  );
}

export default App;