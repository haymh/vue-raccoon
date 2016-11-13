<template>
  <div class="card is-fullwidth">
    <header class="card-header">
      <p class="card-header-title">
        Mortgage Calculator
      </p>
      <a class="card-header-icon">
        <i class="fa fa-angle-down"></i>
      </a>
    </header>
    <div class="card-content">
      <div class="box">
        <div class="columns">
          <div class="column is-4">
            <VueChart type="pie" :data="chartData" :options="chartOption"></VueChart>
          </div>
          <div class="column is-4">
            <ul v-for="(label, index) in chartData.labels">
              <li v-bind:style="colorStyle(chartData.datasets[0].backgroundColor[index])">
                {{label}}:
                <span class="subtitle is-5">
                  {{chartData.datasets[0].data[index] | formatCurrency}}
                </span>
              </li>
            </ul>
          </div>
          <div class="column is-4">
            <h1 class="title">Monthly Payment</h1>
            <h1 class="title">{{ monthlyPayment | formatCurrency }}</h1>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="columns is-multiline">
            <label class="label column is-12">Price</label>
            <div class="column is-12">
              <input class="input" type="number" v-model="newPrice">
            </div>
            <input class="column is-offset-1 is-10" type="range" :min="minPrice" :max="maxPrice" step="1000" v-model="newPrice">
          </div>
        </div>
        <div class="column is-6">
          <div class="columns is-multiline">
            <label class="label column is-12">Down Payment</label>
            <div class="column is-12">
              <p class="control has-addons">
                <input class="input is-expanded" type="number" :value="downPayment" v-on:keyup.enter="enterDownPayment">
                <input class="input" type="number" min="0" max="1" step="0.01" v-model="downPaymentRate">
              </p>
            </div>
            <input class="column is-offset-1 is-10" type="range" min="0" max="1.0" step="0.01" v-model="downPaymentRate">
          </div>
        </div>

        <div class="column is-6">
          <div class="columns">
            <div class="column is-6">
              <div class="columns is-multiline">
                <label class="label column is-12">Loan Type</label>
                <div class="column is-12">
                  <span class="select" v-on:change="loanTypeChanged">
                    <select v-model="selectedLoanType">
                      <option v-for="(type, index) in loanTypes" v-bind:value="index">
                        {{ type.text }}
                      </option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="columns is-multiline">
                <label class="label column is-12">Interest Rate</label>
                <div class="column is-12">
                  <input class="input" type="number" min="0" max="0.1" step="0.00005" v-model="interestRate">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="columns is-multiline">
            <div class="column is-12">
              <label class="label">Property Tax</label>
            </div>
            <div class="column is-12">
              <p class="control has-addons">
                <input class="input is-expanded" type="number" min="0" max="0.1" step="0.00005" :value="propertyTax"  v-on:keyup.enter="enterPropertyTax">
                <input class="input" type="number" min="0" max="0.1" step="0.00005" v-model="propertyTaxRate">
              </p>
            </div>
          </div>
        </div>

        <div class="column is-6">
          <div class="columns is-multiline">
            <div class="column is-12">
              <label class="label">HOA Dues</label>
            </div>
            <div class="column is-12">
              <input class="input" type="number" min="0" max="10000" step="10" v-model="newHoa">
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="columns is-multiline">
            <div class="column is-12">
              <label class="label">Home Insurance</label>
            </div>
            <div class="column is-12">
              <p class="control has-addons">
                <input class="input is-expanded" type="number" min="0" max="100000" step="10" :value="insurance"  v-on:keyup.enter="enterInsurance">
                <input class="input" type="number" min="0" max="0.1" step="0.00005" v-model="insuranceRate">
              </p>
            </div>
          </div>
        </div>

        <div class="column is-6" v-bind:style="mortgageInsuranceStyle">
          <div class="columns is-multiline">
            <div class="column is-12">
              <label class="label">Mortgage Insurance</label>
            </div>
            <div class="column is-12">
              <p class="control has-addons">
                <input class="input is-expanded" type="number" min="0" max="100000" step="10" :value="mortgageInsurance"  v-on:keyup.enter="enterMortgageInsurance">
                <input class="input" type="number" min="0" max="0.1" step="0.00005" v-model="mortgageInsuranceRate">
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style>
li {
    display: list-item;
    text-align: -webkit-match-parent;
}
</style>
<script>
/* eslint-disable import/extensions */
import VueChart from '../chartjs_wrapper/VueChart.vue';


export default {
  name: 'MortgageCalculator',
  props: {
    price: Number,
    hoa: Number,
  },
  data() {
    return {
      newPrice: this.price,
      newHoa: this.hoa,
      downPaymentRate: 0.2,
      loanTypes: [
        {
          text: '30 Yr. Fixed',
          value: 0.03875,
          year: 30,
        },
        {
          text: '15 Yr. Fixed',
          value: 0.0325,
          year: 15,
        },
      ],
      selectedLoanType: 0,
      propertyTaxRate: 0.0105,
      insuranceRate: 0.0022,
      interestRate: 0.03875,
      mortgageInsuranceRate: 0.0075,
      chartOption: {
        responsive: true,
        legend: {
          display: false,
        },
      },
    };
  },
  computed: {
    mortgageInsuranceApply() {
      return this.downPaymentRate < 0.2;
    },
    mortgageInsuranceStyle() {
      return this.mortgageInsuranceApply ? { display: 'block' } : { display: 'none' };
    },
    mortgageInsurance() {
      // per month
      /* eslint-disable no-mixed-operators */
      return (this.newPrice - this.downPayment) * this.mortgageInsuranceRate / 12;
    },
    minPrice() {
      return this.price * 0.8;
    },
    maxPrice() {
      return this.price * 1.2;
    },
    downPayment() {
      return this.newPrice * this.downPaymentRate;
    },
    propertyTax() {
      // per year
      return this.propertyTaxRate * this.newPrice;
    },
    insurance() {
      // per month
      return this.insuranceRate * this.newPrice / 12;
    },
    principal() {
      const month = this.loanTypes[this.selectedLoanType].year * 12;
      const borrow = this.newPrice - this.downPayment;
      const interest = this.interestRate / 12;
      const pow = (interest + 1) ** month;
      return borrow * pow * interest / (pow - 1);
    },
    monthlyPayment() {
      const mortgageInsurance = this.mortgageInsuranceApply ? this.mortgageInsurance : 0;
      return this.principal + this.insurance + this.newHoa +
        this.propertyTax / 12 + mortgageInsurance;
    },
    chartData() {
      return {
        labels: [
          'Principal and Interest',
          'Property Taxes',
          'HOA Dues',
          'Home Insurance',
          'Mortgage Insurance',
        ],
        datasets: [
          {
            data: [this.principal, this.propertyTax, this.newHoa,
              this.insurance, this.mortgageInsurance],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#ADBDFF',
              '#AADAAD',
            ],
          }],
      };
    },
  },
  watch: {
  },
  filters: {
    formatCurrency(money) {
      return `$${money.toFixed(2)}`;
    },
  },
  components: { VueChart },
  methods: {
    enterDownPayment(e) {
      this.downPaymentRate = e.target.value / this.newPrice;
      this.downPaymentRate = this.downPaymentRate > 1.0 ? 1.0 : this.downPaymentRate;
    },
    enterPropertyTax(e) {
      this.propertyTaxRate = e.target.value / this.newPrice;
    },
    enterInsurance(e) {
      this.insuranceRate = e.target.value / this.newPrice;
    },
    enterMortgageInsurance(e) {
      this.mortgageInsuranceRate = e.target.value * 12 / (this.newPrice - this.downPayment);
    },
    loanTypeChanged() {
      this.interestRate = this.loanTypes[this.selectedLoanType].value;
    },
    colorStyle(color) {
      return {
        color,
      };
    },
  },
};
</script>
