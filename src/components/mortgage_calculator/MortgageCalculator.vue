<template>
  <div class="box">
    <div class="level">
      <div class="level-left">
        <h1 class="title is-3">Mortgage Calculator</h1>
      </div>
      <div class="level-right">
        <a class="button">
          <span>save</span>
          <span class="icon">
            <i class="fa fa-bookmark"></i>
          </span>
        </a>
      </div>
    </div>
    <hr>
    <div>
      <div class="columns is-multiline">
        <div class="column is-12">
          <h2 class="title is-4">Monthly Payment &nbsp;&nbsp;{{ monthlyPayment | formatNumber(0, '$') }}</h2>
        </div>
        <div class="column is-offset-1 is-4">
          <VueChart type="pie" :data="chartData" :options="chartOption"></VueChart>
        </div>
        <div class="column is-offset-1 is-5">
          <ul v-for="(label, index) in chartData.labels">
            <li v-bind:style="colorStyle(chartData.datasets[0].backgroundColor[index])">
              {{label}}
              <span class="subtitle is-5" style="float:right">
                {{chartData.datasets[0].data[index] | formatNumber(0, '$')}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="columns is-multiline is-gapless">
            <p class="heading column is-12">Price</p>
            <div class="column is-12">
              <FormatableNumberInput :value="newPrice" :formatMethod="formatCurrency" v-on:valuechange="enterPrice"></FormatableNumberInput>
            </div>
            <!-- <el-slider class="column is-12" :min="minPrice" :max="maxPrice" :step="1000" v-model="newPrice"></el-slider> -->
            <div class="column is-12">
              <input type="range" style="display:table-cell; width:100%" :min="minPrice" :max="maxPrice" :step="1000" v-model.number="newPrice">
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="columns is-multiline is-gapless">
            <p class="heading column is-12">Down Payment</p>
            <div class="column is-12">
              <div class="columns is-mobile is-gapless">
                <FormatableNumberInput class="column is-8" :value="downPayment" :formatMethod="formatCurrency" v-on:valuechange="enterDownPayment"></FormatableNumberInput>
                <FormatableNumberInput class="column is-4" :value="downPaymentRate" :formatMethod="formatPercentage" v-on:valuechange="dataChange('downPaymentRate', $event)"></FormatableNumberInput>
              </div>
            </div>
            <input type="range" style="display:table-cell; width:100%" min="0" max="100" step="1" v-model.number="downPaymentRate">
          </div>
        </div>

        <div class="column is-6">
          <div class="columns">
            <div class="column is-6">
              <div class="columns is-multiline is-gapless">
                <p class="heading column is-12">Loan Type</p>
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
              <div class="columns is-multiline is-gapless">
                <p class="heading column is-12">Interest Rate</p>
                <div class="column is-12">
                  <FormatableNumberInput :value="interestRate * 100" :formatMethod="formatPercentage" v-on:valuechange="dataChange('interestRate', $event / 100)"></FormatableNumberInput>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="columns is-multiline is-gapless">
            <p class="heading column is-12">Property Tax</p>
            <div class="column is-12">
              <div class="columns is-mobile is-gapless">
                <FormatableNumberInput class="column is-8" :value="propertyTax * 12" :formatMethod="formatCurrency" v-on:valuechange="enterPropertyTax"></FormatableNumberInput>
                <FormatableNumberInput class="column is-4" :value="propertyTaxRate * 100" :formatMethod="formatPercentage" v-on:valuechange="dataChange('propertyTaxRate', $event / 100)"></FormatableNumberInput>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-6">
          <div class="columns is-multiline is-gapless">
            <p class="heading column is-12">HOA Dues</p>
            <div class="column is-12">
              <FormatableNumberInput :value="newHoa" :formatMethod="formatCurrency" v-on:valuechange="dataChange('newHoa', $event)"></FormatableNumberInput>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="columns is-multiline is-gapless">
            <p class="heading column is-12">Home Insurance</p>
            <div class="column is-12">
              <div class="columns is-mobile is-gapless">
                <FormatableNumberInput class="column is-8" :value="insurance" :formatMethod="formatCurrency" v-on:valuechange="enterInsurance"></FormatableNumberInput>
                <FormatableNumberInput class="is-4" :value="insuranceRate * 100" :formatMethod="formatPercentage" v-on:valuechange="dataChange('insuranceRate', $event / 100)"></FormatableNumberInput>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-6" v-bind:style="mortgageInsuranceStyle">
          <div class="columns is-multiline is-gapless">
            <p class="heading column is-12">Mortgage Insurance</p>
            <div class="column is-12">
              <div class="columns is-mobile is-gapless">
                <FormatableNumberInput class="column is-8" :value="mortgageInsurance" :formatMethod="formatCurrency" v-on:valuechange="enterMortgageInsurance"></FormatableNumberInput>
                <FormatableNumberInput class="column is-4" :value="mortgageInsuranceRate * 100" :formatMethod="formatPercentage" v-on:valuechange="dataChange('mortgageInsuranceRate', $event / 100)"></FormatableNumberInput>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
/* eslint-disable import/extensions */
import VueChart from '../chartjs_wrapper/VueChart.vue';
import FormatableNumberInput from './FormatableNumberInput.vue';


export default {
  name: 'MortgageCalculator',
  props: {
    price: Number,
    hoa: Number,
  },
  data() {
    return {
      newPrice: this.price,
      maxPrice: this.price * 1.2,
      minPrice: this.price * 0.8,
      newHoa: this.hoa,
      downPaymentRate: 20,
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
      return this.downPaymentRate < 20;
    },
    mortgageInsuranceStyle() {
      return this.mortgageInsuranceApply ? { display: 'block' } : { display: 'none' };
    },
    mortgageInsurance() {
      // per month
      /* eslint-disable no-mixed-operators */
      return (this.newPrice - this.downPayment) * this.mortgageInsuranceRate / 12;
    },
    downPayment() {
      return this.newPrice * this.downPaymentRate / 100;
    },
    propertyTax() {
      // per month
      return this.propertyTaxRate * this.newPrice / 12;
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
        this.propertyTax + mortgageInsurance;
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
    price: {
      handler() {
        this.newPrice = this.price;
        this.maxPrice = this.price * 1.2;
        this.minPrice = this.price * 0.8;
      },
    },
    hoa: {
      handler() {
        this.newHoa = this.hoa;
      },
    },
  },
  components: { VueChart, FormatableNumberInput },
  methods: {
    enterPrice(value) {
      this.newPrice = value;
      this.maxPrice = value * 1.2;
      this.minPrice = value * 0.8;
    },
    enterDownPayment(value) {
      this.downPaymentRate = value / this.newPrice * 100;
      this.downPaymentRate = this.downPaymentRate > 100 ? 100 : this.downPaymentRate;
    },
    enterPropertyTax(value) {
      this.propertyTaxRate = value / this.newPrice;
    },
    enterInsurance(value) {
      this.insuranceRate = value * 12 / this.newPrice;
    },
    enterMortgageInsurance(value) {
      this.mortgageInsuranceRate = value * 12 / (this.newPrice - this.downPayment);
    },
    loanTypeChanged() {
      this.interestRate = this.loanTypes[this.selectedLoanType].value;
    },
    colorStyle(color) {
      return {
        color,
      };
    },
    editModel(value, e) {
      e.target.value = value;
    },
    assignValue(data, e) {
      /* eslint-disable no-param-reassign */
      this[data] = e.target.value;
      document.activeElement.blur();
    },
    formatCurrency(money) {
      if (typeof money === 'string' || money instanceof String) {
        return `$${parseFloat(money).toFixed(2)}`;
      }
      return `$${money.toFixed(2)}`;
    },
    formatPercentage(percent) {
      if (typeof percent === 'string' || percent instanceof String) {
        return `%${parseFloat(percent).toFixed(3)}`;
      }
      return `%${percent.toFixed(3)}`;
    },
    dataChange(binding, value) {
      this[binding] = value;
    },
  },
};
</script>
