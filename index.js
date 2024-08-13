const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to calculate PAYE tax
function calculatePayeTax(income) {
    let tax = 0;
    if (income <= 24000) {
        tax = income * 0.10;
    } else if (income <= 32333) {
        tax = (24000 * 0.10) + ((income - 24000) * 0.25);
    } else {
        tax = (24000 * 0.10) + ((32333 - 24000) * 0.25) + ((income - 32333) * 0.30);
    }
    return tax;
}

// Route to handle net pay calculation
app.post('/calculate-net-pay', (req, res) => {
    const { grossPay, nonCashBenefits, pensionContribution, otherDeductions } = req.body;

    // Fixed statutory deductions
    const nssfTierI = 420.00;
    const nssfTierII = 1740.00;
    const nhif = 1600.00;

    // Calculate taxable income
    const taxableIncome = grossPay - pensionContribution - otherDeductions;

    // Calculate PAYE tax
    const payeTax = calculatePayeTax(taxableIncome);

    // Calculate total deductions
    const totalDeductions = nonCashBenefits + pensionContribution + otherDeductions + nssfTierI + nssfTierII + nhif + payeTax;

    // Calculate net pay
    const netPay = grossPay - totalDeductions;

    // Send the calculated net pay and PAYE tax as the response
    res.json({ netPay, payeTax });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
