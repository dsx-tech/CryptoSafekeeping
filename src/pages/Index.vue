<template>
  <q-page class="row full-height items-center">
    <div class="btn-group">
    <Button class="mainButton" @click="GoToBitcoin()">Bitcoin</Button>
    <Button class="mainButton" @click="GoToEthereum()">Ethereum</Button>
    </div>
  </q-page>
</template>

<style src="../css/Ethereum/Ethereum.css"></style>

<script>
export default {
  data () {
    return {
      
    }
  },

  beforeMount(){
    if (window.navigator.onLine)
      alert('You are connected to the internet! Continue with internet connection (UNSAFE) ?')
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