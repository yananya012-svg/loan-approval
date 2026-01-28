document.getElementById('loanForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  // Convert to numbers where needed
  data.Gender = parseInt(data.Gender);
  data.Married = parseInt(data.Married);
  data.Education = parseInt(data.Education);
  data.Self_Employed = parseInt(data.Self_Employed);
  data.ApplicantIncome = parseFloat(data.ApplicantIncome);
  data.LoanAmount = parseFloat(data.LoanAmount);
  data.Credit_History = parseInt(data.Credit_History);

  fetch('http://127.0.0.1:8000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('result').innerText = data.prediction;
  })
  .catch(err => {
    document.getElementById('result').innerText = 'Error: ' + err.message;
  });
});
