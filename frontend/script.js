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

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById("result").innerText = result.prediction || "Error: No prediction received";
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error: Unable to get prediction. Please try again.";
    }
});
