import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


export default function AddFunds() {
    const [amount, setAmount] = useState(10);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth0();

    const handleAddFunds = async () => {
        setLoading(true);

        const stripe = await loadStripe(import.meta.env.VITE_PUBLISH_KEY);

        const sub = user.sub;
        const res = await axios.post('http://localhost:8000/api/v1/user/create-checkout-session', {
            sub,
            amountUsd: amount
        });

        const session = res.data;

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error.message);
        }

        setLoading(false);
    };


    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2">Add Funds</h2>
            <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="border px-2 py-1 rounded mb-4 w-full"
            />
            <button
                onClick={handleAddFunds}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Processing...' : `Add $${amount}`}
            </button>
        </div>
    );
}
