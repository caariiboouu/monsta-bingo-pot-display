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
        this.getPotSingleAction();
        this.polling = setInterval(() => {
          this.getPotSingleAction();
        }, 60000)
      },
      getPotRepeater () {
        this.getPotSingleAction();
      },
      getPotSingleAction () {
        axios
        .get('https://cake.monster/api/bingo.php')
        .then(response => {
          this.info = response.data
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      },

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