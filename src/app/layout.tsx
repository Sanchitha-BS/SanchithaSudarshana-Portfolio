// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Sanchitha Sudarshana | Portfolio",
  description: "Sanchitha Sudarshana's Data Science, Data Engineering & Analytics portfolio",
};

const DS_TERMS = [
  "SELECT * FROM insights", "ETL Pipeline", "def predict(X):", "Snowflake", "import pandas as pd",
  "Data Warehouse", "dbt transform", "Neural Network", "sklearn.fit()", "SQL JOIN",
  "Power BI", "Tableau", "Machine Learning", "numpy.array()", "Feature Engineering",
  "Random Forest", "XGBoost", "ELT Pipeline", "Star Schema", "Data Modeling",
  "pd.DataFrame()", "HIPAA Compliant", "TensorFlow", "Regression", "Classification",
  "ROC Curve", "Hyperparameter", "Apache Spark", "Databricks", "Jupyter Notebook",
  "git commit -m", "Data Quality", "KPI Dashboard", "Scikit-learn", "Time Series",
  "NLP · BERT", "PySpark", "REST API", "Data Pipeline", "Agile / Scrum",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Floating data science watermark */}
        <div className="ds-bg-text" aria-hidden="true">
          {DS_TERMS.map((term, i) => (
            <span key={i}>{term}</span>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
