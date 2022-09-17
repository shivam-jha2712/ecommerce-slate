import Stripe from 'stripe';
// Importing stripe in the backend of the next js application for enabling the payement option of the website

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
// In next js each file has to have its very own handler  and must have request and response similar to express

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1Lix7YSEM0NPLMLk62vPpsDY' },
                    { shipping_rate: 'shr_1LixALSEM0NPLMLkLgPF8sdt' },
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
                    // A try and catch block is required to tell and execute the payement details if anything goes wrong the payement is flushed back and error block is executed and if it does run smoothly then it works with the try block
                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}



