<template>
  <q-page class="row full-height items-center">
    <div class="btn-group">
    <Button class="mainButton" @click="GoToBitcoin()">Bitcoin</Button>
    <Button class="mainButton" @click="GoToEthereum()">Ethereum</Button>
    </div>
  </q-page>
</template>

<style>

body {
  background: linear-gradient(to top, rgb(230, 240, 238) 0%, rgb(10, 167, 240) 100%);
  height: 100%;
}

.btn-group button {
    display: block; /* Make the buttons appear below each other */
    width: 100%;
    top: 50%;
    left: 33%;
}

.mainButton {
 
  text-decoration: none;
  outline: none;
  display: inline-block;
  padding: 20px 30px;
  margin: 10px 20px;
  position: relative;
  color: white;
  border: 2px solid rgba(255,255,255,.4);
  background: none;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.mainButton:before,
.mainButton:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  box-sizing: border-box;
}
.mainButton:before {
  bottom: 0;
  left: 0;
  border-left: 1px solid white;
  border-top: 1px solid white;
  transition: 0s ease opacity .8s, .2s ease width .4s, .2s ease height .6s;
}
.mainButton:after {
  top: 0;
  right: 0;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  transition: 0s ease opacity .4s, .2s ease width , .2s ease height .2s;
}
.mainButton:hover:before,
.mainButton:hover:after{
  height: 100%;
  width: 100%;
  opacity: 1;
}
.mainButton:hover:before {transition: 0s ease opacity 0s, .2s ease height, .2s ease width .2s;}
.mainButton:hover:after {transition: 0s ease opacity .4s, .2s ease height .4s , .2s ease width .6s;}
.mainButton:hover {background: rgba(255,255,255,.2);}

.nextButton {
  text-decoration: none;
  outline: none;
  display: inline-block;
  padding: 5px 10px;
  margin: 10px 20px;
  position: relative;
  overflow: hidden;
  border: 2px solid #3794fe;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif; 
  color: #3a37fe;
  transition: .2s ease-in-out;
}
.nextButton:before {
  content: "";
  background: linear-gradient(90deg, rgba(255,255,255,.1), rgba(14, 102, 204, 0.5));
  height: 50px;
  width: 50px;
  position: absolute;
  top: -8px;
  left: -75px;
  transform: skewX(-45deg);
}
.nextButton:hover {
  background: #2956eb;
  color: #fff;
}
.nextButton:hover:before {
  left: 150px;
  transition: .5s ease-in-out;
}
</style>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    GoToBitcoin(){
      this.$router.push({ name: 'Bitcoin' })
    },
    GoToEthereum(){
      this.$router.push({ name: 'Ethereum' })
    }

  }
}
</script>