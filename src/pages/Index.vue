<template>
  <q-page class="row full-height items-center">
    <div class="btn-group">
    <Button class="mainButton" @click="GoToBitcoin()">Bitcoin</Button>
    <Button class="mainButton" @click="GoToEthereum()">Ethereum</Button>
    <Button class="mainButton" @click="GoToBCH()">Bitcoin Cash</Button>
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
  methods: {
    GoToBitcoin(){
      this.$router.push({ name: 'Bitcoin' })
    },
    GoToEthereum(){
      this.$router.push({ name: 'Ethereum' })
    },
     GoToBCH(){
      this.$router.push({ name: 'BCH' })
    }

  }
}
</script>