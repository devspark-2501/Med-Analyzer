# 🔬 MedAnalyzer AI — Intelligent Medical Report & Risk Analyzer

> **Hackathon Prototype** | Medical Report Analysis & Concerning Indicator Combination Detector

MedAnalyzer AI is an intelligent medical report analyzer designed to automatically flag out-of-range biomarkers and detect dangerous multi-indicator cross-risks (e.g., Metabolic Syndrome, Acute Kidney Impairment) in real-time.

---

## 🚀 Key Features

* **⚡ Real-Time Biomarker Evaluation**: Automatically flags single test values falling outside predefined clinical reference ranges (e.g., High Glucose, Elevated Creatinine).
* **🚨 Cross-Indicator Combination Engine**: Detects high-priority health risks resulting from specific combinations of abnormal parameters (e.g., Glucose + Triglycerides or Creatinine + Potassium).
* **💾 Persistent Storage**: Saves complete patient evaluation reports, including status flags and detected risks, directly to MongoDB Atlas.
* **🎯 Hackathon Demo Mode**: Features quick-load buttons for normal and high-risk patient sample profiles to streamline live pitches.

---

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router)
* **Frontend**: React, Tailwind CSS
* **Database**: MongoDB (via Mongoose ODM)
* **Language**: JavaScript (ES6+)

---

## 📁 Project Structure

```text
med-analyzer/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.js    # Core analysis engine & database persistence API
│   ├── globals.css         # Global CSS & Tailwind imports
│   ├── layout.js          # Main layout wrapper
│   └── page.js            # Interactive clinical dashboard & demo interface
├── lib/
│   └── mongodb.js         # Mongoose connection utility
├── models/
│   └── Report.js          # Mongoose schema for medical reports
├── .env.local             # Local environment configuration
├── jsconfig.json          # JavaScript project configuration
└── package.json           # Dependencies and scripts
