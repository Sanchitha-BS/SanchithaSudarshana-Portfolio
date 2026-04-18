// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Sanchitha Sudarshana | Portfolio",
  description: "Sanchitha Sudarshana's Data Science, Data Engineering & Analytics portfolio",
};

const ROW1 = ["SELECT * FROM insights", "import pandas as pd", "ETL Pipeline", "def train_model():", "Snowflake", "Data Warehouse", "git commit -m"];
const ROW2 = ["numpy.array()", "sklearn.fit(X, y)", "Star Schema", "dbt transform", "Apache Spark", "Feature Engineering", "ROC Curve"];
const ROW3 = ["Power BI", "Neural Network", "pd.DataFrame()", "XGBoost", "Data Modeling", "KPI Dashboard", "Hypothesis Testing"];
const ROW4 = ["TensorFlow", "SQL JOIN", "Regression", "Classification", "Databricks", "REST API", "Time Series"];
const ROW5 = ["PySpark", "Data Quality", "Agile / Scrum", "HIPAA Compliant", "Jupyter Notebook", "NLP · BERT", "ELT Pipeline"];
const ROW6 = ["import sklearn", "Tableau", "Business Intelligence", "Data Pipeline", "Scikit-learn", "Hyperparameter", "Random Forest"];
const ROWS = [ROW1, ROW2, ROW3, ROW4, ROW5, ROW6];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Floating data science watermark */}
        <div className="ds-watermark" aria-hidden="true">
          {ROWS.map((row, i) => (
            <div key={i} className="ds-watermark-row">
              {/* Repeat each row 3x so it fills wide screens */}
              {[...row, ...row, ...row].map((term, j) => (
                <span key={j}>{term}</span>
              ))}
            </div>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
