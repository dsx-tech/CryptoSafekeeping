<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          Crypto Safe keeping
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/bitcoin" clickable>
          <q-item-section avatar>
            <q-icon name="sentiment_satisfied_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Bitcoin</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/addresses" clickable>
          <q-item-section avatar>
            <q-icon name="sentiment_satisfied_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Addresses</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/ethereum" clickable>
          <q-item-section avatar>
            <q-icon name="sentiment_satisfied" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ethereum</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/bch" clickable>
          <q-item-section avatar>
            <q-icon name="sentiment_satisfied" />
          </q-item-section>
          <q-item-section>
            <q-item-label>BCH</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/startPage" clickable>
          <q-item-section avatar>
            <q-icon name="sentiment_satisfied_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Start page</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
