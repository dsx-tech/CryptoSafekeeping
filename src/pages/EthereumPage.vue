<template>
  <q-page>
    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Enter wallet name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="walletName" autofocus @keyup.enter="CountDialog = false"  />
        </q-card-section>

        <q-card-section>
          <div class="text-h12">And choose wallet type</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Standart" @click="Address(String(walletName))" v-close-popup/>
          <q-btn flat label="Multisig" @click="GoToCreationMultisigAddress(String(walletName))" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>



    <div class="q-pa-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="addresses" label="Addresses" />
          <q-tab name="multisig" label="Multisig addresses" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="addresses">
            <q-list>
              <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>

            <q-item-section>
            <q-item-label @click= "GoToAddress(contact.name, contact.address, contact.key)">{{ contact.name }}</q-item-label>
          </q-item-section>

        </q-item>
      </q-list>
            
          </q-tab-panel>

          <q-tab-panel name="multisig">
            <q-list>
                  <q-item v-for="multisigContact in multisigContacts" :key="multisigContact.id" class="q-my-sm" clickable v-ripple>
                <q-item-section>
                    <q-item-label @click="GoToMultisigAddress(multisigContact.holders, multisigContact.signs, multisigContact.ownersList, multisigContact.address, multisigContact.name)">{{ multisigContact.name }}</q-item-label>
                </q-item-section>
                  </q-item>
                  </q-list>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>

      <q-item class="flex flex-center">
        <button @click="inception = true"> New Address </button>
      </q-item>

      <q-item class="flex flex-center">
        <button @click="GoBack()"> Back </button>
      </q-item>
      
    </div>
    
  </q-page>
    
</template>

<script src="../scripts/Ethereum/index.js"></script>
