<template>
  <q-page>
  <q-item class="flex flex-center">
    <button @click="AddressPage"> AddressList </button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="Address"> New Address </button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="CreateMultisigContract"> New Multisignature Address </button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="Scan">ScanQRCode</button>
  </q-item>
    <h5>{{ message }}</h5>
      <div class="q-pa-md" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Addresses</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>

        <q-item-section>
          <q-item-label @click= "Scan(contact.key)">{{ contact.name }}</q-item-label>
        </q-item-section>

      </q-item>

    </q-list>
  </div>
<q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"></span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script src="../scripts/Ethereum/index.js"></script>
