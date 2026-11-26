import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider, InputNumber } from 'antd';
import { CalculatorOutlined, ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';

export default function InstallmentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(1250000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(6.5);

  // Live Financial Calculations
  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;

  const monthlyInstallment =
    monthlyRate === 0
      ? Math.round(loanAmount / totalMonths)
      : Math.round(
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        );

  const totalPayable = monthlyInstallment * totalMonths + downPaymentAmount;

  return (
    <section className="calculator-section py-5" aria-labelledby="calcHeading">
      <div className="container py-lg-4">
        <div className="row g-5 align-items-center">
          {/* Left Side: Interactive Sliders */}
          <div className="col-lg-7" data-aos="fade-right">
            <span className="section-subtitle">| SMART FINANCING</span>
            <h2 id="calcHeading" className="section-title mb-3">
              Estimate Your Monthly Installment
            </h2>
            <p className="text-muted mb-4">
              Adjust property price, down payment, and tenure to plan your purchase with zero hidden bank surprises.
            </p>

            <div className="calculator-controls bg-white p-4 p-md-5 rounded-4 shadow-sm border">
              {/* 1. Property Price */}
              <div className="control-group mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="fw-semibold text-dark">Property Price ($)</label>
                  <InputNumber
                    min={100000}
                    max={5000000}
                    step={25000}
                    value={propertyPrice}
                    formatter={(val) => `$ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(val) => val?.replace(/\$\s?|(,*)/g, '')}
                    onChange={(val) => setPropertyPrice(val || 100000)}
                    className="calc-input"
                  />
                </div>
                <Slider
                  min={100000}
                  max={5000000}
                  step={25000}
                  value={propertyPrice}
                  onChange={setPropertyPrice}
                  trackStyle={{ backgroundColor: '#f35525' }}
                  handleStyle={{ borderColor: '#f35525' }}
                />
              </div>

              {/* 2. Down Payment % */}
              <div className="control-group mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="fw-semibold text-dark">
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <span className="badge-amount">${downPaymentAmount.toLocaleString()}</span>
                </div>
                <Slider
                  min={10}
                  max={80}
                  step={5}
                  value={downPaymentPercent}
                  onChange={setDownPaymentPercent}
                  trackStyle={{ backgroundColor: '#f35525' }}
                  handleStyle={{ borderColor: '#f35525' }}
                />
              </div>

              {/* 3. Tenure (Years) & Annual Markup Rate */}
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="fw-semibold text-dark">Tenure (Years)</label>
                    <span className="badge-amount">{years} Yrs</span>
                  </div>
                  <Slider
                    min={1}
                    max={25}
                    value={years}
                    onChange={setYears}
                    trackStyle={{ backgroundColor: '#f35525' }}
                    handleStyle={{ borderColor: '#f35525' }}
                  />
                </div>

                <div className="col-sm-6">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="fw-semibold text-dark">Annual Rate (%)</label>
                    <span className="badge-amount">{interestRate}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={15}
                    step={0.5}
                    value={interestRate}
                    onChange={setInterestRate}
                    trackStyle={{ backgroundColor: '#f35525' }}
                    handleStyle={{ borderColor: '#f35525' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Live Result Summary Card */}
          <div className="col-lg-5" data-aos="fade-left">
            <div className="result-summary-card text-white p-4 p-md-5 rounded-4 shadow-lg">
              <div className="d-flex align-items-center gap-2 text-orange fw-bold small text-uppercase mb-2">
                <CalculatorOutlined /> Estimated Breakdown
              </div>
              <p className="text-white-50 small mb-1">Your Monthly Installment</p>
              <h3 className="display-5 fw-bold text-white mb-4">
                ${monthlyInstallment.toLocaleString()}
                <span className="fs-6 fw-normal text-white-50"> / month</span>
              </h3>

              <div className="breakdown-list border-top border-secondary pt-3 mb-4">
                <div className="d-flex justify-content-between py-2 border-bottom border-secondary border-opacity-50">
                  <span className="text-white-50">Down Payment ({downPaymentPercent}%)</span>
                  <strong className="text-white">${downPaymentAmount.toLocaleString()}</strong>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom border-secondary border-opacity-50">
                  <span className="text-white-50">Financed Amount</span>
                  <strong className="text-white">${loanAmount.toLocaleString()}</strong>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="text-white-50">Total Cost Over {years} Years</span>
                  <strong className="text-orange">${totalPayable.toLocaleString()}</strong>
                </div>
              </div>

              <ul className="list-unstyled small text-white-50 mb-4">
                <li className="mb-2">
                  <CheckCircleFilled className="text-orange me-2" />
                  Pre-approved bank financing partners available
                </li>
                <li>
                  <CheckCircleFilled className="text-orange me-2" />
                  Direct developer installment options on select villas
                </li>
              </ul>

              <Link to="/contact" className="btn-calc-cta w-100">
                Get Custom Payment Plan <ArrowRightOutlined className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}