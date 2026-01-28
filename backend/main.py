from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="Loan Approval Prediction API")

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model .pkl")

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded successfully")
except Exception as e:
    print("❌ Model loading failed:", e)
    model = None


class LoanInput(BaseModel):
    Self_Employed: int
    ApplicantIncome: float
    LoanAmount: float
    Credit_History: int


@app.post("/predict")
def predict_loan(data: LoanInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        features = np.array([[data.Self_Employed, data.ApplicantIncome, data.LoanAmount, data.Credit_History]])
        prediction = model.predict(features)

        result = "Approved" if prediction[0] == 1 else "Rejected"

        return {"prediction": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
