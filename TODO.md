# TODO List for Fixing "Unable to get prediction" Error in Loan Prediction App

## Step 1: Fix Model Loading Path in Backend (main.py)
- [x] Correct the model path to load from the root directory instead of backend/.
- [x] Add debug prints to verify model loading.

## Step 2: Add Model Null Check in Prediction Route
- [x] Add check in predict_loan function to handle if model is None.
- [x] Return proper error response if model not loaded.

## Step 3: Test the Changes
- [x] Run the backend locally to ensure it starts without errors.
- [ ] Test the prediction endpoint with valid data.
- [ ] Verify frontend handles errors gracefully.
