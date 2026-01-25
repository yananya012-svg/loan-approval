document.getElementById("loanForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        Gender: parseInt(document.getElementById("Gender").value),
        Married: parseInt(document.getElementById("Married").value),
        Education: parseInt(document.getElementById("Education").value),
        Self_Employed: parseInt(document.getElementById("Self_Employed").value),
        ApplicantIncome: parseFloat(document.getElementById("ApplicantIncome").value),
        LoanAmount: parseFloat(document.getElementById("LoanAmount").value),
        Credit_History: parseInt(document.getElementById("Credit_History").value)
    };

    const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("result").innerText = result.prediction;
});