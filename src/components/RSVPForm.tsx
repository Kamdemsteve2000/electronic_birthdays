import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Users, MessageSquare, AlertCircle } from 'lucide-react';

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  numberOfGuests: number;
  dietaryRestrictions: string;
  message: string;
}

interface RSVPFormProps {
  onSubmit: (data: RSVPFormData) => void;
  onClose: () => void;
  isVisible: boolean;
  loading?: boolean;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmit, onClose, isVisible, loading = false }) => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<RSVPFormData>({
    defaultValues: {
      attending: true,
      numberOfGuests: 1,
    }
  });

  const attending = watch('attending');

  const handleFormSubmit = (data: RSVPFormData) => {
    onSubmit(data);
    reset();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            aria-label="Close RSVP form"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-4xl mb-2">🎊</div>
            <h2 className="text-2xl font-bold">Confirmation de Présence</h2>
            <p className="opacity-90">Merci de remplir ce formulaire</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Vos Informations</span>
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom Complet *
              </label>
              <input
                id="name"
                {...register('name', { required: 'Nom est requis' })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                // placeholder="Votre nom complet"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (optionnel)
              </label>
              <input
                id="email"
                {...register('email', { 
                  // required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address'
                  }
                })}
                type="email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                // placeholder="your.email@example.com"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                id="phone"
                {...register('phone', { required: 'Téléphone est requis' })}
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="+1 (555) 123-4567"
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Attendance */}
          <div className="space-y-4">
            <fieldset>
              <legend className="font-semibold text-gray-800 mb-3">Confirmez-vous votre présence ? *</legend>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border-2 border-green-200 rounded-xl cursor-pointer hover:bg-green-50 transition-colors">
                  <input
                    {...register('attending')}
                    type="radio"
                    value="true"
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="text-2xl">✅</span>
                  <span className="font-medium text-gray-800">Oui, je serai présent(e)</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border-2 border-red-200 rounded-xl cursor-pointer hover:bg-red-50 transition-colors">
                  <input
                    {...register('attending')}
                    type="radio"
                    value="false"
                    className="text-red-600 focus:ring-red-500"
                  />
                  <span className="text-2xl">❌</span>
                  <span className="font-medium text-gray-800">Non, je ne peux pas venir</span>
                </label>
              </div>
            </fieldset>
          </div>

          {/* Additional Details for Attending Guests */}
          {attending && (
            <div className="space-y-4 animate-in slide-in-from-top-4 duration-500 ease-out">
              <div>
                <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de personnes * (y compris vous-même)
                </label>
                <input
                  id="numberOfGuests"
                  {...register('numberOfGuests', {
                    required: 'Le nombre de personnes est requis',
                    min: { value: 1, message: 'Au moins 1 personne est requise' },
                    max: { value: 10, message: 'Maximum 10 personnes autorisées' }
                  })}
                  type="number"
                  min="1"
                  max="10"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  aria-describedby={errors.numberOfGuests ? "guests-error" : undefined}
                />
                {errors.numberOfGuests && (
                  <p id="guests-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1" role="alert">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.numberOfGuests.message}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
                 Allergies / Régimes spéciaux (optionnel)
                </label>
                <textarea
                  id="dietaryRestrictions"
                  {...register('dietaryRestrictions')}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Any food allergies or dietary requirements..."
                />
              </div>
            </div>
          )}

          {/* Optional Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Message (optionnel)</span>
            </label>
            <textarea
              id="message"
              {...register('message')}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
              rows={3}
              // placeholder="Leave a birthday message or any questions..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            aria-describedby="submit-button-description"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Enregistrement...</span>
              </div>
            ) : (
              attending ? '🎉 Confirmer ma présence' : '😔 Envoyer mes regrets'
            )}
          </button>
          <p id="submit-button-description" className="sr-only">
            {attending ? 'Confirmez votre présence à la fête d\'anniversaire' : 'Envoyez vos regrets pour ne pas pouvoir assister'}
          </p>
        </form>
      </div>
    </div>
  );
};