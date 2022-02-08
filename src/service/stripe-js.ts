//ESSA É A PARTE QUE INTREGA O STRIPE COM O FRONT
import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPER_API_KEY)

    return stripeJs
}