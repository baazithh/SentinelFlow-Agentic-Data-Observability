"use client"
import { useState, useEffect } from 'react';

export default function SentinelDashboard() {
    const [alert, setAlert] = useState<any>(null);
    const [resolvedCount, setResolvedCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Poll for alerts and check resolved history
    useEffect(() => {
        const checkStatus = async () => {
            try {
                // 1. Check for active alerts
                const res = await fetch('http://127.0.0.1:8000/alerts');
                const data = await res.json();
                setAlert(data.error ? data : null);

                // 2. Check how many we have fixed in total
                const historyRes = await fetch('http://127.0.0.1:8000/history');
                const historyData = await historyRes.json();
                setResolvedCount(historyData.count || 0);
            } catch (e) {
                console.log("Backend offline...");
            }
        };
        const interval = setInterval(checkStatus, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleFix = async () => {
        setLoading(true);
        await fetch('http://127.0.0.1:8000/fix', { method: 'POST' });
        // Optimistic UI update
        setAlert(null);
        setResolvedCount(prev => prev + 1);
        setLoading(false);
    };

    // Determine dynamic styles
    const isAlerting = !!alert;
    const bgColor = isAlerting ? 'bg-slate-950' : 'bg-white';
    const textColor = isAlerting ? 'text-white' : 'text-slate-900';
    const borderColor = isAlerting ? 'border-slate-800' : 'border-slate-200';

    return (
        <main className={`min-h-screen transition-colors duration-700 ${bgColor} ${textColor} p-8 font-sans`}>
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <header className={`flex justify-between items-center border-b ${borderColor} pb-6 mb-10`}>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter uppercase">
                            SentinelFlow <span className={isAlerting ? 'text-red-500' : 'text-emerald-600'}>●</span>
                        </h1>
                        <p className={`${isAlerting ? 'text-slate-400' : 'text-slate-500'} text-xs font-bold`}>
                            {isAlerting ? "CRITICAL SYSTEM STATE" : "SYSTEM STABLE"}
                        </p>
                    </div>

                    <div className="text-right">
                        <span className="text-4xl font-black">{resolvedCount}</span>
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Total Data Fixes</p>
                    </div>
                </header>

                {/* Main Content */}
                {!alert ? (
                    <div className="py-20 text-center">
                        <div className="inline-block animate-bounce mb-4 text-emerald-500">✓</div>
                        <p className="text-lg font-medium opacity-60 italic">Waiting for stream anomalies...</p>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="bg-red-600 text-white p-6 rounded-lg shadow-2xl">
                            <h2 className="font-black text-xl mb-2">⚠ ANOMALY DETECTED</h2>
                            <p className="font-mono text-sm bg-black/20 p-3 rounded leading-relaxed">
                                {alert.error}
                            </p>
                        </div>

                        <div className={`p-6 rounded-lg border-2 border-dashed ${borderColor} bg-white/5`}>
                            <h3 className="font-bold text-blue-400 mb-2 uppercase text-xs tracking-wider">AI Remediation Plan</h3>
                            <p className="text-lg leading-snug mb-6">{alert.ai_suggestion}</p>

                            <button
                                onClick={handleFix}
                                disabled={loading}
                                className="w-full bg-white text-black hover:bg-emerald-400 hover:text-white py-4 rounded-none font-black transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "EXECUTING REPAIR..." : "APPROVE & DEPLOY FIX"}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}