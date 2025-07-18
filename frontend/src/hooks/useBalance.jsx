// hooks/useBalance.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export const useBalance = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {

            const sub = user.sub;
            const token = await getAccessTokenSilently();
            try {
                const res = await axios.post('http://localhost:8000/api/v1/user/getBalance',
                    {
                        sub
                    }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                setBalance(res.data.balance);
            } catch (err) {
                console.error("Failed to fetch balance:", err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user?.sub) {
            fetchBalance();
        }
    }, [user]);

    return { balance, loading };
};
