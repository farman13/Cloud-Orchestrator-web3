import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function Success() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        console.log(sessionId);
        if (sessionId) {
            axios.post("http://localhost:8000/api/v1/user/confirm-payment", {
                sessionId: sessionId
            })
                .then(res => {
                    console.log("Balance updated:", res.data);
                })
                .catch(err => {
                    console.error("Payment confirmation failed:", err);
                });
        }
    }, []);

    return <div>Payment Successful</div>;
}
