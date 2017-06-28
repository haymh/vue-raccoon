<template>
<div>
  <v-expansion-panel :expand="expand">
    <v-expansion-panel-content v-model="isExpanded">
      <div slot="header">Mortgage Calculator 
        <span v-show="!isExpanded">
          &nbsp;&nbsp;{{ monthlyPayment | formatNumber(0, '$') }} / Month
        </span>
      </div>
      <v-card>
        <v-card-row class="blue-grey darken-1">
          <v-card-title>
            <span class="white--text">Monthly Payment &nbsp;&nbsp;{{ monthlyPayment | formatNumber(0, '$') }}</span>
            <v-spacer></v-spacer>
            <v-btn icon="icon" slot="activator" class="white--text">
              <v-icon>bookmark</v-icon>
            </v-btn>
          </v-card-title>
        </v-card-row>
        <v-card-row class="ma-2">
          <v-layout row wrap>
            <v-flex offset-xs2 xs6 offset-md2 md6>
              <VueChart type="pie" :data="chartData" :options="chartOption"></VueChart>
            </v-flex>
            <v-flex xs12 md12>
              <ul v-for="(label, index) in chartData.labels">
                <li v-bind:style="colorStyle(chartData.datasets[0].backgroundColor[index])">
                  {{label}}
                  <span style="float:right">
                    {{chartData.datasets[0].data[index] | formatNumber(0, '$')}}
                  </span>
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </v-card-row>
      </v-card>
      <v-card>
        <v-card-row class="ma-2">
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-text-field label="Price" :value="newPrice" prefix="$" v-on:input="enterPrice"></v-text-field>
              <v-slider  v-model.number="newPrice" dark :min="minPrice" :max="maxPrice" :step="1000"></v-slider>
            </v-flex>
            <v-flex xs12 md6>
              <v-layout row wrap>
              <v-flex xs6 md6>
                <v-text-field label="Down Payment Amount" :value="downPayment" prefix="$" v-on:input="enterDownPayment"></v-text-field>
              </v-flex>
              <v-flex xs6 md6>
                <v-text-field label="Down Payment Percentage" :value="downPaymentRate" suffix="%" v-on:input="dataChange('downPaymentRate', $event)"></v-text-field>
              </v-flex>
              <v-flex xs12 md12>
                <v-slider  v-model.number="downPaymentRate" dark :min="0" :max="100" :step="1000"></v-slider>
              </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md6>
              <v-layout row wrap>
                <v-flex xs6 md6>
                  <v-select
                    v-on:input="loanTypeChanged"
                    v-bind:items="loanTypes"
                    v-model="selectedLoanType"
                    label="Loan Type"
                    dark
                    auto
                    item-text="text"
                    item-value="index"
                  ></v-select>
                </v-flex>
                <v-flex xs6 md6>
                  <v-text-field label="Interest Rate" :value="interestRate * 100" suffix="%" v-on:input="dataChange('interestRate', $event / 100)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md6>
              <v-layout row wrap>
                <v-flex xs6 md6>
                  <v-text-field label="Property Tax Amount" :value="propertyTax * 12" prefix="$" v-on:input="enterPropertyTax"></v-text-field>
                </v-flex>
                <v-flex xs6 md6>
                  <v-text-field label="Property Tax Percentage" :value="propertyTaxRate * 100" suffix="%" v-on:input="dataChange('propertyTaxRate', $event / 100)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md6>
              <!--<FormatableNumberInput :value="newHoa" :formatMethod="formatCurrency" v-on:valuechange="dataChange('newHoa', $event)"></FormatableNumberInput>-->
              <v-text-field label="HOA Dues" :value="newHoa" prefix="$" v-on:input="dataChange('newHoa', parseFloat($event))"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-layout row wrap>
                <v-flex xs6 md6>
                  <v-text-field label="Home Insurance Amount" :value="insurance" prefix="$" v-on:input="enterInsurance"></v-text-field>
                </v-flex>
                <v-flex xs6 md6>
                  <v-text-field label="Home Insurance Percentage" :value="insuranceRate * 100" suffix="%" v-on:input="dataChange('insuranceRate', $event / 100)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md6 v-bind:style="mortgageInsuranceStyle">
              <v-layout row wrap>
                <v-flex xs6 md6>
                  <v-text-field label="Mortgage Insurance Amount" :value="mortgageInsurance" prefix="$" v-on:input="enterMortgageInsurance"></v-text-field>
                </v-flex>
                <v-flex xs6 md6>
                  <v-text-field label="Mortgage Insurance Percentage" :value="mortgageInsuranceRate * 100" suffix="%" v-on:input="dataChange('mortgageInsuranceRate', $event / 100)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-row>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</div>
</template>
<style>
</style>
<script>
/* eslint-disable import/extensions */
import VueChart from '../chartjs_wrapper/VueChart.vue';

export default {
  name: 'MortgageCalculator',
  props: {
    price: Number,
    hoa: Number,
    expand: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newPrice: this.price,
      maxPrice: this.price * 1.2,
      minPrice: this.price * 0.8,
      newHoa: this.hoa,
      isExpanded: this.expand,
      downPaymentRate: 20,
      loanTypes: [
        {
          text: '30 Yr. Fixed',
          value: 0.03875,
          year: 30,
          index: 0,
        },
        {
          text: '15 Yr. Fixed',
          value: 0.0325,
          year: 15,
          index: 1,
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
  components: { VueChart },
  methods: {
    test(value) {
      console.log('changed', value);
    },
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
