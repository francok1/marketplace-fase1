'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface QuoteRequestFormProps {
  providerId: string;
  providerName: string;
  onClose: () => void;
}

export default function QuoteRequestForm({
  providerId,
  providerName,
  onClose,
}: QuoteRequestFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providerId,
          title: formData.title,
          description: formData.description,
          notes: `Fecha del evento: ${formData.eventDate}\nCantidad de personas: ${formData.guestCount}\nPresupuesto: ${formData.budget}\nNotas: ${formData.notes}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-12 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Tu solicitud de cotización ha sido enviada a {providerName}. Pronto recibirás una respuesta.
          </p>
          <Button
            onClick={onClose}
            className="bg-yellow-600 text-white hover:bg-yellow-700 w-full py-3"
          >
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Solicitar Cotización</h2>
          <button
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-gray-600 font-light"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Solicita una cotización personalizada a <span className="font-semibold">{providerName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Título de tu solicitud
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Fotografía para boda de 150 personas"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Descripción del servicio
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe qué necesitas con detalle..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
              required
            />
          </div>

          {/* Fecha del Evento */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Fecha del evento
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
              required
            />
          </div>

          {/* Grid 2 columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Cantidad de Personas */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Cantidad de personas
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="Ej: 150"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
              />
            </div>

            {/* Presupuesto */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Presupuesto aproximado (CLP)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Ej: 1500000"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Notas Adicionales */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Notas adicionales (opcional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Agrega cualquier otro detalle importante..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 text-white hover:bg-yellow-700 px-8 py-3"
            >
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
