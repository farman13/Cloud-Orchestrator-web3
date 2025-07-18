import React from "react";

export const DeployOptions = ({ onAkashDeploy, onFluxDeploy }) => {
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">Select Deployment Option</h2>
            <div className="flex gap-4">
                <button
                    onClick={onAkashDeploy}
                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-md transition"
                >
                    Deploy on Akash Cloud
                </button>
                <button
                    onClick={onFluxDeploy}
                    className="px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 shadow-md transition"
                >
                    Deploy on Flux Cloud
                </button>
            </div>
        </div>
    );
};
