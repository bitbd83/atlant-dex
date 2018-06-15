export const numbersFormat = {
  methods: {
    numbersFormat(num, fixedTo = 2) {
      if (typeof num === 'string') num = Number.parseInt(num);
      if (num.toString().indexOf('.') !== -1) num = (num.toString().split('.').pop().length > fixedTo) ? num.toFixed(fixedTo) : num;
      num = num.toString().split('.');
      num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return num.join('.');
    },
  },
};
