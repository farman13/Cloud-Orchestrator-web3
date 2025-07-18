import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const DeployOptions = () => {
    const [selected, setSelected] = useState(null);
    const [formData, setFormData] = useState({
        image: "",
        port: "",
        cpu: "",
        memory: "",
        storage: "",
    });

    const { user, getAccessTokenSilently } = useAuth0();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAkashDeploy = async () => {

        const sub = user.sub;
        const token = await getAccessTokenSilently();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/deploy/deploy-akash", { sub, formData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            alert("Akash Deployment Started: " + res.data.message);
        } catch (err) {
            alert("Akash Deployment Failed");
            console.error(err);
        }
    };

    const handleFluxDeploy = async () => {
        const sub = user.sub;
        const token = await getAccessTokenSilently();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/deploy-flux", { sub, formData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            alert("Flux Deployment Started: " + res.data.message);
        } catch (err) {
            alert("Flux Deployment Failed");
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">Select Deployment Option</h2>
            <div className="flex gap-4">
                <button
                    onClick={() => setSelected("akash")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-md transition"
                >
                    Deploy on Akash Cloud
                </button>
                <button
                    onClick={() => setSelected("flux")}
                    className="px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 shadow-md transition"
                >
                    Deploy on Flux Cloud
                </button>
            </div>

            {selected && (
                <div className="w-full max-w-md mt-6">
                    <input
                        type="text"
                        name="image"
                        placeholder="Docker image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="port"
                        placeholder="Port"
                        value={formData.port}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="cpu"
                        placeholder="CPU (e.g. 0.5)"
                        value={formData.cpu}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="memory"
                        placeholder="Memory (e.g. 512Mi)"
                        value={formData.memory}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="storage"
                        placeholder="Storage (e.g. 512Mi)"
                        value={formData.storage}
                        onChange={handleChange}
                        className="w-full mb-2 p-2 border rounded"
                    />

                    <button
                        onClick={selected === "akash" ? handleAkashDeploy : handleFluxDeploy}
                        className={`w-full py-2 mt-2 rounded text-white ${selected === "akash" ? "bg-blue-600" : "bg-green-600"
                            }`}
                    >
                        Deploy on {selected === "akash" ? "Akash" : "Flux"}
                    </button>
                </div>
            )}
        </div>
    );
};
