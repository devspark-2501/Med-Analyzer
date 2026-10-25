import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Report from '@/models/Report';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { patientName, age, tests } = body;

    const flags = [];
    const dangerousCombinations = [];

    const evaluatedTests = tests.map(test => {
      let status = 'Normal';
      if (test.value < test.min) {
        status = 'Low';
        flags.push(`${test.name} is LOW (${test.value} ${test.unit}, ref: ${test.min}-${test.max})`);
      } else if (test.value > test.max) {
        status = 'High';
        flags.push(`${test.name} is HIGH (${test.value} ${test.unit}, ref: ${test.min}-${test.max})`);
      }
      return { ...test, status };
    });

    const testMap = {};
    tests.forEach(t => { 
      testMap[t.name.toLowerCase()] = t.value; 
    });

    const glucose = testMap['glucose'] || 0;
    const triglycerides = testMap['triglycerides'] || 0;
    if (glucose > 126 && triglycerides > 150) {
      dangerousCombinations.push('⚠️ Critical Alert: High Glucose & High Triglycerides detected. Potential Metabolic Syndrome Risk - Immediate Clinical Review Required.');
    }

    const creatinine = testMap['creatinine'] || 0;
    const potassium = testMap['potassium'] || 0;
    if (creatinine > 1.2 && potassium > 5.0) {
      dangerousCombinations.push('⚠️ Critical Alert: Elevated Creatinine & High Potassium. Possible Acute Kidney Impairment - Urgent Medical Review Needed.');
    }

    const newReport = await Report.create({
      patientName,
      age,
      tests: evaluatedTests,
      flags,
      dangerousCombinations
    });

    return NextResponse.json({ success: true, data: newReport }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}