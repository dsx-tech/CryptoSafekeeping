<template>
  <q-page>
    <q-dialog v-model="creating">
      <q-card>
        <q-card-section>
          <div>
            <p>Wallet name:</p>
            <q-input filled autofocus v-model="walletName" :placeholder="walletName"/>
          </div>
          <div class="col-1">
            <p>Choose the net:</p>
            <q-select outlined v-model="chosenNet" :options="nets"/>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Create" color="primary" v-close-popup @click="Address(String(walletName), String(chosenNet))"/>
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Enter wallet name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="walletName" autofocus />
        </q-card-section>

        <q-card-section>
          <div class="text-h12">And choose wallet type</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Standart" @click="creating = true" v-close-popup/>
          <q-btn flat label="Multisig" @click="GoToCreationMultisigAddress(String(walletName))" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="importKey">
      <q-card>
        <q-card-section>
          <div class="text-h6">Enter wallet name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="walletName" autofocus @keyup.enter="CountDialog = false"  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="importKey = false" v-close-popup/>
          <q-btn flat label="Import key" @click="ImportKey(String(walletName))" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div v-if="showCamera">
      <qrcode-stream :camera="camera" @decode="onDecode">
      </qrcode-stream>
    </div>


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
                  <q-item-label @click= "GoToAddress(contact.name, contact.address, contact.key, contact.net)">{{ contact.name }}</q-item-label>
                
              </q-item-section>
            </q-item>
            </q-list>
            
          </q-tab-panel>

          <q-tab-panel name="multisig">
            <q-list>
                  <q-item v-for="multisigContact in multisigContacts" :key="multisigContact.id" class="q-my-sm" clickable v-ripple>
                <q-item-section>
                    <q-item-label @click="GoToMultisigAddress(multisigContact.holders, multisigContact.signs, multisigContact.keylist, multisigContact.address, multisigContact.name, multisigContact.net)">{{ multisigContact.name }}</q-item-label>
                </q-item-section>
                  </q-item>
            </q-list>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>

      <q-item class="flex flex-center">
        <button class="nextButton" @click="importKey = true"> Import private key </button>
        <button class="nextButton" @click="inception = true"> New Address </button>
      </q-item>

        <button class="nextButton" @click="GoBack()"> Back </button>
      
    </div>
    
  </q-page>
    
</template>

<script src="../scripts/Ethereum/index.js"></script>
