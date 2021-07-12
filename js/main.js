var app = new Vue({
    el: '#app',
    data () {
      return {
        info: null,
        loading: true,
        errored: false,
      }
    },
    methods: {
      getPot () {
        this.polling = setInterval(() => {
          axios
          .get('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then(response => {
            this.info = response.data.bpi
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
        }, 50000)
      }
    },
    filters: {
      currencydecimal (value) {
        return value.toFixed(2)
      }
    },
    created () {
      this.getPot();
    }
  })