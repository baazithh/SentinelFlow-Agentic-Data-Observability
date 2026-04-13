"use client"
import { useState, useEffect } from 'react';

export default function SentinelDashboard() {
  const [alert, setAlert] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAlerts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/alerts');
        const data = await res.json();
        setAlert(data.error ? data : null);
      } catch (e) {
        console.log("Backend not reachable...");
      }
    };
    const interval = setInterval(checkAlerts, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFix = async () => {
    setLoading(true);
    await fetch('http://127.0.0.1:8000/fix', { method: 'POST' });
    setAlert(null);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">SentinelFlow <span className="text-emerald-500">Live</span></h1>
        {!alert ? (
          <div className="p-10 border border-slate-800 rounded-xl bg-slate-900/50">
            <p className="text-slate-500">Pipeline healthy. Watching for anomalies...</p>
          </div>
        ) : (
          <div className="bg-red-950/30 border border-red-500/50 rounded-xl p-6 text-left">
            <h2 className="text-red-400 font-bold">⚠️ FAILURE DETECTED</h2>
            <p className="mt-2 font-mono text-sm">{alert.error}</p>
            <div className="mt-6 p-4 bg-blue-950/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-400 font-bold">AI Remediation:</p>
              <p className="text-slate-300">{alert.ai_suggestion}</p>
              <button 
                onClick={handleFix}
                className="mt-4 w-full bg-blue-600 py-2 rounded font-bold"
              >
                {loading ? "Patching..." : "Apply Hotfix"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
