<template>
  <canvas width="width" height="height"></canvas>
</template>
<script>
import Chart from 'chart.js';
import assign from 'lodash.assign';

export default {
  props: {
    type: {
      type: String,
      default: 'line',
    },
    data: {
      type: Object,
      default: () => ({
        labels: [],
        datasets: [],
      }),
    },
    options: {
      type: Object,
    },
    width: {
      type: String,
      default: '200px',
    },
    height: {
      type: String,
      default: '200px',
    },
  },
  data: () => ({
    chart: null,
  }),
  mounted() {
    this.chart = new Chart(this.$el, {
      type: this.type,
      data: this.data,
      options: this.options,
    });
    this.$watch('data', () => {
      if (this.data.datasets && this.data.datasets.length > 0) {
        /* eslint-disable array-callback-return */
        this.data.datasets.map((dataset, i) => {
          if (i === this.chart.config.data.datasets.length) {
            return;
          }
          this.data.datasets[i] = assign(this.chart.config.data.datasets[i], dataset);
        });
      }
      this.chart.config.data = assign(this.chart.config.data, this.data);
      this.$nextTick(() => {
        this.chart.update();
      });
    });
    this.$watch('options', () => {
      this.chart.config.options = assign(this.chart.config.options, this.options);
      this.$nextTick(() => {
        this.chart.update();
      });
    });
  },
};
</script>
