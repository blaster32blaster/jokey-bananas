<template>
    <div>
      <div class="stopwatch-time">
        {{ printedMinutes }}:{{ printedSeconds }}:{{ printedMilliseconds }}
      </div>
    </div>
</template>

<script>
    export default {
      props: {
        runTime: {
          type: Boolean,
          default: false
        }
      },
      data () {
        return {
          elapsedMinutes: 0,
          elapsedSeconds: 0,
          elapsedMilliseconds: 0,
          printedMinutes: '00',
          printedSeconds: '00',
          printedMilliseconds: '0',
          offset: Date.now(),
          running: false,
          clock: '',
          interval: '',
          printTime: ''
        }
      },
      methods: {
        start () {
          this.offset = Date.now()
          this.interval = setInterval(this.update, 100)
        },
        stop () {
          if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
            this.clear()
          }
        },
        clear () {
          this.elapsedMilliseconds = 0
          this.elapsedSeconds = 0
          this.elapsedMilliseconds = 0
          this.offset = Date.now()
          this.printedMilliseconds = '0'
          this.printedSeconds = '00'
          this.printedMinutes = '00'
        },
        run () {
          console.log('iterating')
        },
        update () {
          this.clock = this.delta()
          this.formatTime()
          this.updateTimePrinted()
        },
        delta () {
          let now = Date.now()
          let d = now - this.offset
          this.offset = now
          return d
        },
        formatTime () {
          // this.printTime = this.clock / 1000
          this.elapsedMilliseconds++
          if (this.elapsedMilliseconds > 9) {
            this.elapsedMilliseconds = 0
            this.elapsedSeconds++
          }
          if (this.elapsedSeconds > 60) {
            this.elapsedSeconds = 0
            this.elapsedMinutes++
          }
        },
        updateTimePrinted () {
          if (this.elapsedMinutes <= 9) {
            this.printedMinutes = ''
            this.printedMinutes = '0' + this.elapsedMinutes
          } else {
            this.printedMinutes = this.elapsedMinutes
          }
          if (this.elapsedSeconds <= 9) {
            this.printedSeconds = ''
            this.printedSeconds = '0' + this.elapsedSeconds
          } else {
            this.printedSeconds = this.elapsedSeconds
          }
          this.printedMilliseconds = this.elapsedMilliseconds
          // if (this.elapsedMilliseconds <= 9) {
          //   this.printedMilliseconds = ''
          //   this.printedMilliseconds = '0' + this.elapsedMilliseconds
          // } else {
          //
          // }
        }
      },
      mounted () {
      },
      watch: {
        runTime: function () {
          if (this.runTime === true) {
            console.log('starting')
            this.start()
          }
          if (this.runTime === false) {
            console.log('stopping')
            this.stop()
          }
        }
      }
    }
</script>

<style scoped>
.stopwatch-time {
  font-family: Inconsolata;
  font-size: 2rem;
}
</style>