import Stripe from 'stripe';

// Inicialización perezosa: el cliente de Stripe se crea solo cuando se usa
// (en tiempo de ejecución), no al importar el módulo. Así el build no falla
// aunque STRIPE_SECRET_KEY no esté configurada todavía.
let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeClient = new Stripe(key, {
      apiVersion: '2023-10-16' as any,
    });
  }
  return stripeClient;
}

// Compatibilidad: permite seguir usando `stripe.paymentIntents...` etc.
// El cliente real solo se instancia al acceder a una propiedad (en runtime).
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const client = getStripe();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

export const createPaymentIntent = async (
  amount: number,
  metadata: Record<string, string | number>
) => {
  try {
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: 'clp',
      metadata,
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPaymentIntent = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error confirming payment intent:', error);
    throw error;
  }
};
