'use client';
import { useState } from 'react';

export default function Home() {
  const [patientName, setPatientName] = useState('Eleanor Vance');
  const [age, setAge] = useState(54);
  const [tests, setTests] = useState([
    { name: 'Glucose', value: 145, unit: 'mg/dL', min: 70, max: 99 },
    { name: 'Triglycerides', value: 220, unit: 'mg/dL', min: 0, max: 150 },
    { name: 'Creatinine', value: 1.6, unit: 'mg/dL', min: 0.6, max: 1.2 },
    { name: 'Potassium', value: 5.3, unit: 'mmol/L', min: 3.5, max: 5.0 }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCriticalPreset = () => {
    setPatientName('Robert Vance (High Risk Profile)');
    setAge(61);
    setTests([
      { name: 'Glucose', value: 160, unit: 'mg/dL', min: 70, max: 99 },
      { name: 'Triglycerides', value: 250, unit: 'mg/dL', min: 0, max: 150 },
      { name: 'Creatinine', value: 1.9, unit: 'mg/dL', min: 0.6, max: 1.2 },
      { name: 'Potassium', value: 5.7, unit: 'mmol/L', min: 3.5, max: 5.0 }
    ]);
  };

  const loadNormalPreset = () => {
    setPatientName('Sarah Jenkins (Normal Profile)');
    setAge(29);
    setTests([
      { name: 'Glucose', value: 88, unit: 'mg/dL', min: 70, max: 99 },
      { name: 'Triglycerides', value: 120, unit: 'mg/dL', min: 0, max: 150 },
      { name: 'Creatinine', value: 0.8, unit: 'mg/dL', min: 0.6, max: 1.2 },
      { name: 'Potassium', value: 4.1, unit: 'mmol/L', min: 3.5, max: 5.0 }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientName, age: Number(age), tests })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Submission failed');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs px-3 py-1 rounded-full font-mono font-semibold uppercase tracking-wider">
                MedTech AI v1.0
              </span>
              <span className="text-xs text-slate-500 font-mono">Status: Online & Ready</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-2">Clinical Report & Risk Analyzer</h1>
            <p className="text-slate-400 text-sm mt-1">Detecting abnormal biomarkers and cross-indicator health combinations instantly.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={loadNormalPreset}
              type="button"
              className="text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl transition shadow-lg"
            >
              Load Normal Test
            </button>
            <button 
              onClick={loadCriticalPreset}
              type="button"
              className="text-xs font-semibold bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 px-4 py-2.5 rounded-xl transition shadow-lg"
            >
              Load Critical Test
            </button>
          </div>
        </div>

        {/* Main Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Control Panel */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Patient Input Parameters
              </h2>
              <span className="text-xs text-slate-400 font-mono">JSON / Form Entry</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">Patient Full Name</label>
                  <input 
                    type="text" 
                    value={patientName} 
                    onChange={e => setPatientName(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">Age</label>
                  <input 
                    type="number" 
                    value={age} 
                    onChange={e => setAge(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition" 
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-2">Biomarkers & Test Values</label>
                <div className="space-y-2.5">
                  {tests.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950/70 border border-slate-800/80 p-3 rounded-2xl">
                      <div className="w-1/3">
                        <span className="text-xs font-bold text-slate-200 block">{t.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">Ref: {t.min} - {t.max} {t.unit}</span>
                      </div>
                      <div className="w-1/3 px-2">
                        <input 
                          type="number" 
                          value={t.value} 
                          onChange={e => {
                            const newTests = [...tests];
                            newTests[idx].value = Number(e.target.value);
                            setTests(newTests);
                          }} 
                          className="w-full bg-slate-900 border border-slate-700 text-center text-sm font-bold text-cyan-300 py-1.5 rounded-lg focus:outline-none focus:border-cyan-400" 
                        />
                      </div>
                      <div className="w-1/3 text-right">
                        <span className="text-xs font-mono text-slate-400">{t.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl transition shadow-lg shadow-cyan-500/20 text-sm tracking-wide uppercase font-mono disabled:opacity-50"
              >
                {loading ? 'Running Diagnostics...' : 'Analyze Report & Combinations'}
              </button>
            </form>
          </div>

          {/* Right Column: Diagnostic Output Display */}
          <div className="lg:col-span-7">
            {!result ? (
              <div className="h-full min-h-[420px] bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl mb-4 shadow-inner">
                  ⚡
                </div>
                <h3 className="text-slate-300 font-bold text-base">Awaiting Diagnostic Execution</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">Submit a patient panel or click a preset above to calculate automated risks and dangerous combinations.</p>
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 animate-fadeIn">
                
                {/* Patient Summary Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Analysis Results</span>
                    <h2 className="text-2xl font-black text-white mt-0.5">{result.patientName}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Age: <span className="text-slate-200 font-semibold">{result.age} years old</span> • Timestamp: {new Date(result.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs px-3 py-1.5 rounded-xl font-mono font-bold">
                    ID: {result._id.slice(-6).toUpperCase()}
                  </span>
                </div>

                {/* Dangerous Combinations Alert Box */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Concerning Cross-Indicator Combinations</h3>
                  {result.dangerousCombinations.length > 0 ? (
                    <div className="bg-rose-950/40 border border-rose-500/50 p-4 rounded-2xl space-y-2 shadow-inner">
                      {result.dangerousCombinations.map((combo, i) => (
                        <div key={i} className="flex items-start gap-3 text-rose-200 text-sm font-bold">
                          <span className="text-rose-400 text-base">🚨</span> 
                          <span>{combo}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl text-emerald-300 text-xs font-semibold flex items-center gap-3">
                      <span className="text-base">✅</span> 
                      <span>No dangerous cross-parameter complications identified.</span>
                    </div>
                  )}
                </div>

                {/* Single Out-of-Range Flags */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Single Biomarker Flags</h3>
                  {result.flags.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {result.flags.map((flag, i) => (
                        <div key={i} className="bg-amber-950/30 border border-amber-500/30 text-amber-200 p-3 rounded-xl text-xs font-medium flex items-center gap-3">
                          <span className="text-amber-400 font-bold">⚠️</span> 
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-950 border border-slate-800 text-slate-400 p-3 rounded-xl text-xs">
                      All measured markers fall within healthy standard reference ranges.
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}