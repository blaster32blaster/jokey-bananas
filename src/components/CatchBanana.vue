<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
        <v-layout column align-center class="root-catch-div">
            <div id="play-area" class="play-area">
                <img id="game-piece" src="@/assets/banana.jpg" alt="Vuetify.js" @click="clickOnBanana" class="mb-5">
            </div>
            <div class="options-area">
            <h4>Welcome to Catch a Banana</h4>
            <div class="catch-banana-main-div-options">
                <v-btn color="info" @click="start">Start</v-btn>
                <v-btn color="info" @click="stop">Stop</v-btn>
                <Stopwatch :runTime="runTime" />
            </div>
            </div>
        </v-layout>
        </v-slide-y-transition>
    </v-container>  
</template>

<script>
    // import Toasted from 'vue-toasted'
    import Stopwatch from '@/components/Stopwatch'
    export default {
      components: {
        Stopwatch
      },
      props: {
      },
      data () {
        return {
          piece: '',
          pieceOffset: '',
          playArea: '',
          running: false,
          runTime: false,
          boing: 'http://soundbible.com/mp3/Cartoon Hop-SoundBible.com-553158131.mp3',
          cheer: 'http://soundbible.com/mp3/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3',
          interval: '',
          timeOffset: Date.now(),
          clock: ''
        }
      },
      methods: {
        start () {
          this.running = true
          this.runTime = true
          this.playArea = document.getElementById('play-area').getBoundingClientRect()
          if (this.running) {
            this.timeOffset = Date.now()
            this.interval = setInterval(this.update, 1000)
          }
        },
        update () {
          this.clock = this.delta()
          this.run()
        },
        delta () {
          let now = Date.now()
          let d = now - this.timeOffset
          this.timeOffset = now
          return d
        },
        stop () {
          this.running = false
          this.runTime = false
          clearInterval(this.interval)
          this.resetGamePiece()
          this.interval = null
          this.timeOffset = Date.now()
        },
        getOffset () {
          const rect = this.piece.getBoundingClientRect()
          let left = rect.left + window.scrollX
          let top = rect.top + window.scrollY
          let bottom = rect.bottom + window.scrollY
          let pieceHeight = rect.height
          let bottomMeasure = this.playArea.height - bottom
          return {
            left: left,
            top: top,
            bottom: bottom,
            heightFromBottom: bottomMeasure,
            pieceHeight: pieceHeight
          }
        },
        adjustxAxis (offset) {
          if (offset >= this.playArea.width || offset <= this.playArea.left) {
            this.resetGamePiece()
            return
          }
          this.piece.style.left = offset + 'px'
        },
        adjustyAxis (offsetTop, offset) {
          if (offsetTop <= this.playArea.top || offset.heightFromBottom < 0) {
            this.resetGamePiece()
            return
          }
          this.piece.style.top = offsetTop + 'px'
        },
        moveRandomDirection (offset) {
          let random = Math.floor(Math.random() * 10)
          console.log(random)
          if (random === 0 || random === 8) {
            let offsetTop = offset.top + 30
            this.adjustyAxis(offsetTop, offset)
          }
          if (random === 1 || random === 9) {
            let offsetTop = offset.top - 30
            this.adjustyAxis(offsetTop, offset)
          }
          if (random === 2 || random === 4 || random === 6) {
            offset = offset.left + 30
            this.adjustxAxis(offset)
          }
          if (random === 3 || random === 5 || random === 7) {
            offset = offset.left - 30
            this.adjustxAxis(offset)
          }
        },
        resetGamePiece () {
          this.piece.style.top = 50 + '%'
          this.piece.style.left = 50 + '%'
        },
        run () {
          let offset = this.getOffset()
          if (this.running) {
            this.moveRandomDirection(offset)
            this.playBoingEffect()
          }
        },
        clickOnBanana () {
          this.playClapEffect()
          this.stop()
        },
        playBoingEffect () {
          let audio = new Audio(this.boing)
          audio.play()
        },
        playClapEffect () {
          let audio = new Audio(this.cheer)
          audio.play()
        }
      },
      mounted () {
        this.piece = document.getElementById('game-piece')
      }
    }
</script>

<style scoped>
img { 
    max-width: 50px;
}
.catch-banana-main-div-options {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.root-catch-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.options-area {
    position: absolute;
    height: 20%;
    bottom:0%;
}
#game-piece {
    position: absolute;
    top: 50%;
    left: 50%;
}
#play-area {
  position: absolute;
  top:1%;
  height: 79%;
  width: 100%;
}
</style>