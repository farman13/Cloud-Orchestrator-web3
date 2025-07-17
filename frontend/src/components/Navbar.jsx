import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useEffect } from "react";

export const Navbar = () => {

    const { loginWithRedirect, user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

    async function storeDetails() {

        if (!isAuthenticated) {
            return;
        }
        try {
            const token = await getAccessTokenSilently();
            const username = user?.name;
            const email = user?.email;
            const sub = user?.sub;
            console.log("token", token)
            console.log("User : ", user);
            console.log(username, email);
            console.log("token", token);

            const response = await axios.post('http://localhost:8000/api/v1/user/signup',
                {
                    username,
                    email,
                    sub
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            console.log(response.data);
        } catch (e) {
            console.log("error while signUp :", e)
        }
    }

    useEffect(() => {

        storeDetails();
    }, [isAuthenticated, user])

    return (
        <div className="flex justify-between px-2 py-2 shadow ">
            <div className="px-5 py-2 font-medium">
                Cloud Orchestrator
            </div>
            <div>
                {!isAuthenticated ?
                    <button onClick={() => loginWithRedirect({
                        authorizationParams: {
                            connection: 'google-oauth2'
                        }
                    })}>Log In</button> :
                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</button>
                }
            </div>
        </div>
    )
}
