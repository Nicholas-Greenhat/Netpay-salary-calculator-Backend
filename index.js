const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint for calculating net pay
app.post('/calculate-net-pay', (req, res) => {
    const { grossPay, nonCashBenefits, pensionContribution, otherDeductions } = req.body;

    // Perform the calculation
    const netPay = grossPay - nonCashBenefits - pensionContribution - otherDeductions;

    // Send the response back to the Angular app
    res.json({ netPay });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
