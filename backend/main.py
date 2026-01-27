from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import joblib
import numpy as np
import os

# Create FastAPI app
app = FastAPI(title="Loan Approval Prediction API", root_path="/api")

# Mount static files for frontend
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")

# Load trained model
model_path = os.path.join(os.path.dirname(__file__), "model (1).pkl")
model = joblib.load(model_path)

# Input schema
class LoanInput(BaseModel):
    Gender: int              # 0 = Female, 1 = Male
    Married: int             # 0 = No, 1 = Yes
    Education: int           # 0 = Not Graduate, 1 = Graduate
    Self_Employed: int       # 0 = No, 1 = Yes
    ApplicantIncome: float
    LoanAmount: float
    Credit_History: int      # 0 or 1

# Home route
@app.get("/")
def home():
    return {"message": "Loan Approval Prediction API is running"}

# Prediction route
@app.post("/predict")
def predict_loan(data: LoanInput):
    try:
        input_data = np.array([[
            data.Gender,
            data.Married,
            data.Education,
            data.Self_Employed,
            data.ApplicantIncome,
            data.LoanAmount,
            data.Credit_History
        ]])

        prediction = model.predict(input_data)[0]

        if prediction == 1:
            result = "✅ Loan Approved"
        else:
            result = "❌ Loan Rejected"

        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
