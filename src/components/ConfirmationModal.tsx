import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Check, X, Download, Share2, Calendar } from 'lucide-react';
import { GuestResponse } from '../types/invitation';

interface ConfirmationModalProps {
  response: GuestResponse | null;
  onClose: () => void;
  isVisible: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ response, onClose, isVisible }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    if (response?.attending && response?.qrCode) {
      QRCode.toDataURL(response.qrCode, {
        width: 200,
        margin: 2,
        color: {
          dark: '#7C3AED',
          light: '#FFFFFF'
        }
      })
        .then(setQrCodeDataUrl)
        .catch(console.error);
    }
  }, [response]);

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `birthday-invitation-${response?.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareResponse = async () => {
    if (!response) return;

    const shareText = response.attending
      ? `🎉 I'm attending the birthday party! Can't wait to celebrate!`
      : `Unfortunately, I won't be able to attend the birthday party, but I'm sending my best wishes! 🎂`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Birthday Party RSVP',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Message copied to clipboard!');
    }
  };

  if (!isVisible || !response) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className={`${
          response.attending 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
            : 'bg-gradient-to-r from-pink-500 to-rose-600'
        } p-6 text-white text-center relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-6xl mb-4">
            {response.attending ? '🎊' : '😔'}
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {response.attending ? 'See You There!' : 'We\'ll Miss You!'}
          </h2>
          
          <p className="opacity-90">
            {response.attending 
              ? 'Your attendance has been confirmed'
              : 'Thanks for letting us know'
            }
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Response Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-3">
              {response.attending ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-red-600" />
              )}
              <div>
                <p className="font-semibold text-gray-800">{response.name}</p>
                <p className="text-sm text-gray-600">
                  {response.attending 
                    ? `Attending with ${response.numberOfGuests} guest${response.numberOfGuests > 1 ? 's' : ''}`
                    : 'Unable to attend'
                  }
                </p>
              </div>
            </div>
            
            {response.message && (
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic">"{response.message}"</p>
              </div>
            )}
          </div>

          {/* QR Code for Attending Guests */}
          {response.attending && qrCodeDataUrl && (
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-lg inline-block">
                <img 
                  src={qrCodeDataUrl} 
                  alt="Event QR Code"
                  className="mx-auto"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Show this QR code at the event for quick check-in
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={shareResponse}
                    className="flex items-center space-x-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Not Attending Message */}
          {!response.attending && (
            <div className="text-center space-y-4">
              <div className="bg-pink-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  We're sorry you can't make it to the celebration, but we understand! 
                  Your thoughtful response means a lot.
                </p>
                <p className="text-sm text-gray-600">
                  We'll be sure to share some photos and memories from the party with you! 📸
                </p>
              </div>
              <button
                onClick={shareResponse}
                className="flex items-center space-x-2 mx-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Send Birthday Wishes</span>
              </button>
            </div>
          )}

          {/* Additional Info for Attending Guests */}
          {response.attending && (
            <div className="bg-purple-50 p-4 rounded-xl">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-800 mb-1">Important Reminders:</p>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Please arrive on time</li>
                    <li>• Bring your QR code for check-in</li>
                    <li>• Contact the host if plans change</li>
                    {response.dietaryRestrictions && (
                      <li>• Your dietary requirements have been noted</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};