"use client"
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [alert, setAlert] = useState<any>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:8000/alerts')
                .then(res => res.json())
                .then(data => setAlert(data.error ? data : null));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-10 bg-black min-h-screen text-white font-sans">
            <h1 className="text-3xl font-bold mb-8">SentinelFlow | <span className="text-green-500">Live</span></h1>

            {!alert ? (
                <div className="p-4 border border-green-900 bg-green-950 text-green-400 rounded">
                    ✓ No active pipeline failures.
                </div>
            ) : (
                <div className="p-6 border border-red-500 bg-red-950 rounded-lg">
                    <h2 className="font-bold text-xl">⚠️ Error Detected: {alert.timestamp}</h2>
                    <p className="mt-2 text-red-200 italic">"{alert.error}"</p>

                    <div className="mt-6 p-4 bg-black border border-blue-500 rounded">
                        <p className="text-blue-400 font-bold underline">🤖 AI Diagnosis:</p>
                        <p className="mt-2">{alert.ai_suggestion}</p>
                        <button
                            onClick={() => fetch('http://localhost:8000/fix', { method: 'POST' })}
                            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm"
                        >
                            Approve & Deploy Fix
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}