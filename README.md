# UK Wind Power Forecast Monitor 🌬️

A production-quality dashboard for monitoring and analyzing UK national wind power generation and forecast accuracy. Built with Next.js, TypeScript, and Recharts.

## 🚀 Deployment
Live Demo: [https://wind-forecast-app.vercel.app](https://wind-power-three.vercel.app/)

## 🛠️ Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS v4, Lucide Icons
- **Visualization**: Recharts
- **Backend API**: Next.js Serverless Routes (Node.js)
- **Data Source**: [Elexon BMRS API v1](https://bmrs.elexon.co.uk/)
- **Analysis**: Python (Pandas, Seaborn, Jupyter)

## 📁 Project Structure
```text
wind-forecast-app/
├── analysis/               # Jupyter Notebook & analysis scripts
│   └── wind_analysis.ipynb
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # Serverless API endpoints
│   │   └── globals.css     # Tailwind & Custom Styles
│   ├── components/         # Reusable UI components
│   │   ├── ForecastChart.tsx
│   │   ├── HorizonSlider.tsx
│   │   └── DateRangePicker.tsx
│   └── lib/                # Logic & Data fetching
│       ├── bmrsClient.ts
│       └── forecastProcessor.ts
├── public/                 # Static assets
└── docs/                   # Original challenge documentation
```

## 🧠 Critical Logic: Forecast Horizon
The application implements a strict forecast selection rule:
1. For every target half-hour, we identify all available forecasts.
2. We filter forecasts that were published at least **X hours** (user-selected horizon) prior to the target time.
3. From the valid set, we select the **latest** available forecast.
4. Formula: `(target_time - publish_time) >= horizon_hours`

## 📊 Analysis Findings
The included Jupyter Notebook performs a deep dive into the January 2024 historical dataset:
- **Error Metrics**: RMSE, Mean, Median, and P99 calculations.
- **Horizon Impact**: Visualization of how forecast error increases linearly with the forecast horizon.
- **Reliability**: A P10-based recommendation for "firm" wind capacity to ensure grid stability.

## 🔧 Local Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd project-forecast
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

4. **Run the analysis**:
   Install Python dependencies: `pip install pandas numpy matplotlib seaborn requests`
   Open `analysis/wind_analysis.ipynb` in VS Code or Jupyter.

## 🤖 AI Tools Used
- **Antigravity (Gemini 2.0)**: Used for rapid scaffolding, architectural design, component creation, and documentation.
- **Claude 3.5 Sonnet**: Assisted in refining the mathematical logic for forecast selection.

---
Developed as a part of a Senior Softare Engineer Technical Challenge.
