'use client';
import { useState } from 'react';

export default function Home() {
  const [patientName, setPatientName] = useState('John Doe');
  const [age, setAge] = useState(45);
  const [tests, setTests] = useState([
    { name: 'Glucose', value: 140, unit: 'mg/dL', min: 70, max: 99 },
    { name: 'Triglycerides', value: 200, unit: 'mg/dL', min: 0, max: 150 },
    { name: 'Creatinine', value: 1.5, unit: 'mg/dL', min: 0.6, max: 1.2 },
    { name: 'Potassium', value: 5.2, unit: 'mmol/L', min: 3.5, max: 5.0 }
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <main className="p-8 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">MedAnalyzer Prototype (Hackathon)</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 border rounded shadow">
        <div>
          <label className="block font-semibold">Patient Name</label>
          <input 
            type="text" 
            value={patientName} 
            onChange={e => setPatientName(e.target.value)} 
            className="w-full border p-2 rounded" 
          />
        </div>
        <div>
          <label className="block font-semibold">Age</label>
          <input 
            type="number" 
            value={age} 
            onChange={e => setAge(e.target.value)} 
            className="w-full border p-2 rounded" 
          />
        </div>
        <h2 className="font-bold text-lg mt-4">Test Results</h2>
        {tests.map((t, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input type="text" value={t.name} readOnly className="border p-1 w-1/3 bg-gray-100" />
            <input 
              type="number" 
              value={t.value} 
              onChange={e => {
                const newTests = [...tests];
                newTests[idx].value = Number(e.target.value);
                setTests(newTests);
              }} 
              className="border p-1 w-1/3" 
            />
            <span className="text-sm">{t.unit} (Ref: {t.min}-{t.max})</span>
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">
          {loading ? 'Analyzing...' : 'Analyze Report'}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 border-2 border-red-500 bg-red-50 rounded">
          <h2 className="text-xl font-bold text-red-700">Analysis Results</h2>
          <p><strong>Patient:</strong> {result.patientName} ({result.age} yrs)</p>
          
          <h3 className="font-bold mt-3 text-red-600">Dangerous Combinations Detected:</h3>
          {result.dangerousCombinations.length > 0 ? (
            <ul className="list-disc pl-5 text-red-800 font-semibold">
              {result.dangerousCombinations.map((combo, i) => <li key={i}>{combo}</li>)}
            </ul>
          ) : (
            <p className="text-green-700">No dangerous cross-indicator combinations found.</p>
          )}

          <h3 className="font-bold mt-3">Single Abnormal Flags:</h3>
          <ul className="list-disc pl-5">
            {result.flags.map((flag, i) => <li key={i}>{flag}</li>)}
          </ul>
        </div>
      )}
    </main>
  );
}