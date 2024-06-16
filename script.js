const carValueNumberInput = document.getElementById("car-value-number");
const carValueRangeInput = document.getElementById("car-value-range");
const downPaymentNumberInput = document.getElementById("down-payment-number");
const downPaymentRangeInput = document.getElementById("down-payment-range");
const carTypeInput = document.getElementById("car-type");
const leasePeriodInput = document.getElementById("lease-period-dropdown");
const totalLeasingCostText = document.getElementById("total-leasing-cost");
const monthlyInstallmentText = document.getElementById("monthly-installment");
const downPaymentText = document.getElementById("down-payment");
const interestRateText = document.getElementById("interest-rate");

let totalLeasingCost, downPayment, monthlyInstallment, interestRate;


const synchronizeInputs = event => {
  if (event.target === carValueNumberInput) {
    carValueRangeInput.value = carValueNumberInput.value;
  } else if (event.target === carValueRangeInput) {
    carValueNumberInput.value = carValueRangeInput.value;
  } else if (event.target === downPaymentNumberInput) {
    downPaymentRangeInput.value = downPaymentNumberInput.value;
  } else if (event.target === downPaymentRangeInput) {
    downPaymentNumberInput.value = downPaymentRangeInput.value;
  }
}

const resetNumber = event => {
  if (event.target == carValueNumberInput && event.target.value < 10000) {
    carValueNumberInput.value = 10000;
  } else if (event.target = downPaymentNumberInput && event.target.value < 10) {
    downPaymentNumberInput.value = 10;
  }
}

const calculate = event => {
  if (carValueNumberInput.value >= 10000 && downPaymentNumberInput.value >= 10) {
    downPayment = carValueNumberInput.value * downPaymentNumberInput.value / 100;
    if (carTypeInput.value === "brand-new") {
      interestRate = 2.99;
    } else {
      interestRate = 3.7;
    }
    
    let monthlyInterestRate = (interestRate/100)/12;
    let formula = Math.pow( 1 + monthlyInterestRate, leasePeriodInput.value );
    
    monthlyInstallment = (carValueNumberInput.value - downPayment) / (( formula - 1 ) / ( monthlyInterestRate * formula));
    
    totalLeasingCost = monthlyInstallment * leasePeriodInput.value + downPayment;
    
    downPaymentText.innerText = `Down Payment: €${downPayment}`;
    interestRateText.innerText = `Interest Rate ${interestRate}%`;
    monthlyInstallmentText.innerText = `Monthly Installment: €${monthlyInstallment.toFixed(2)}`;
    totalLeasingCostText.innerText = `Total Leasing Cost: €${totalLeasingCost.toFixed(2)}`;
    }
}

carValueNumberInput.addEventListener('input', synchronizeInputs);
carValueNumberInput.addEventListener('change', resetNumber);
carValueNumberInput.addEventListener('input', calculate);

carValueRangeInput.addEventListener('input', synchronizeInputs);
carValueRangeInput.addEventListener('input', calculate);

downPaymentNumberInput.addEventListener('input', synchronizeInputs);
downPaymentNumberInput.addEventListener('change', resetNumber);
downPaymentNumberInput.addEventListener('input', calculate);

downPaymentRangeInput.addEventListener('input', synchronizeInputs);
downPaymentRangeInput.addEventListener('input', calculate);

carTypeInput.addEventListener('input', calculate);
leasePeriodInput.addEventListener('input', calculate);

window.onload = calculate;