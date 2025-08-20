import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Phone, Mail, Gift, Sparkles } from 'lucide-react';
import { InvitationCard } from './components/InvitationCard';
import { RSVPForm } from './components/RSVPForm';
import { ConfirmationModal } from './components/ConfirmationModal';
import { AdminDashboard } from './components/AdminDashboard';
import { invitationDetails } from './data/invitationData';
import { RSVPResponse } from './types/invitation';
import { RSVPService } from './services/rsvpService';

function App() {
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<RSVPResponse | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRSVPClick = () => {
    setShowRSVPForm(true);
  };

  const handleRSVPSubmit = async (data: Omit<RSVPResponse, 'id' | 'qrCode' | 'createdAt' | 'updatedAt'>) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Floating particles animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Admin Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="bg-white/90 backdrop-blur-sm text-purple-600 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-200"
        >
          {showAdmin ? 'Voir l\'invitation' : 'Admin Dashboard'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {showAdmin ? (
          <AdminDashboard />
        ) : (
          <>
            {!showRSVPForm && !showConfirmation && (
              <InvitationCard 
              invitation={invitationDetails} 
                onRSVPClick={handleRSVPClick}
              />
            )}

            {showRSVPForm && (
              <div className="max-w-2xl mx-auto">
                <RSVPForm 
                  onSubmit={handleRSVPSubmit}
                  onBack={handleBackToInvitation}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            )}

            {showConfirmation && confirmationData && (
              <ConfirmationModal
                response={confirmationData}
                onClose={handleCloseConfirmation}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;