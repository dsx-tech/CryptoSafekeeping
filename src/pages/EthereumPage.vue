<template>
  <q-page>
    <q-dialog v-model="creating" class="dialog">
      <q-card>
        <q-card-section>
        <div>
          <div>
            <p>Wallet name:</p>
            <q-input filled autofocus v-model="walletName" :placeholder="walletName"/>
          </div>
          <div>
            <p>Choose the net:</p>
            <q-select outlined v-model="chosenNet" :options="nets"/>
          </div>
        </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Create" color="primary" v-close-popup @click="Address(String(walletName), String(chosenNet))"/>
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="inception" class="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            <p>Enter wallet name</p>
          </div>
          <q-input dense v-model="walletName" autofocus />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">
            <p>And choose wallet type</p>
          </div>
          <q-btn label="Standart" @click="creating = true" v-close-popup style="margin: 10px 20px"/>
          <q-btn label="Multisig" @click="GoToCreationMultisigAddress(String(walletName))" v-close-popup style="margin: 10px 20px"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="importKey">
      <q-card class="dialog" style="width: 500px; max-width: 80vw; margin: auto;">
        <q-card-section>
          <div class="text-h6">
              <p>Enter wallet name</p>
            </div>
          <q-input dense v-model="walletName" autofocus @keyup.enter="CountDialog = false"  />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">
            <p>Choose the network:</p>
          </div>
          <q-select outlined v-model="chosenNet" :options="nets"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="importKey = false" v-close-popup/>
          <q-btn flat label="Import key" @click="ImportKey(String(walletName), String(chosenNet))" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>


    <div v-if="showCamera" class="camera">
      <qrcode-stream :camera="camera" @decode="onDecode">
      </qrcode-stream>
      <q-btn label="Cancel" class="mainButton" @click="showCamera = false"/>
    </div>



    <div class="q-pa-md column justify-center" style="max-width: 600px; margin: auto">
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
              <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple style="border-bottom: 1px ridge;">

                  <q-item-section>
                  <q-item-label @click= "GoToAddress(contact.name, contact.address, contact.key, contact.net)">{{ contact.name }}</q-item-label>
                
              </q-item-section>
            </q-item>
            </q-list>
            
          </q-tab-panel>

          <q-tab-panel name="multisig">
            <q-list>
                  <q-item v-for="multisigContact in multisigContacts" :key="multisigContact.id" class="q-my-sm" clickable v-ripple style="border-bottom: 1px ridge;">
                <q-item-section>
                    <q-item-label @click="GoToMultisigAddress(multisigContact.holders, multisigContact.signs, multisigContact.keylist, multisigContact.address, multisigContact.name, multisigContact.net)">{{ multisigContact.name }}</q-item-label>
                </q-item-section>
                  </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <q-item class="flex flex-center row" style="padding: 8px 0px">
        <button class="mainButton col" @click="importKey = true" style="height: 100px"> Import private key </button>
        <button class="mainButton col" @click="inception = true" style="height: 100px"> New Address </button>
      </q-item>

      <button class="mainButton" @click="GoBack()" style="margin: 10px 20px"> Back </button>
      
    </div>
    
  </q-page>
    
</template>

<script src="../scripts/Ethereum/index.js"></script>
<style src="../css/Ethereum/Ethereum.css"></style>