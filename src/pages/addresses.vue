<template>
  <div>
    <p>{{ message }}</p>
    <q-btn @click="Address()" label="newAddress" />
    <q-btn @click="writeFile()" label="click" />
    <q-list>
             <q-item v-for="(address, idx) in addresses" :key="idx" class="q-my-sm" clickable v-ripple {{ address.name }}>

      </q-item>
     </q-list>
  </div>

</template>

<script>
import settings from '../scripts/Bitcoin/settings.js'

function read(fileName) {
  return new Promise((resolve, reject) => {
     var errorHandler = function(fileName, e) {
      var msg = "";

      switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          msg = "Storage quota exceeded";
          break;
        case FileError.NOT_FOUND_ERR:
          msg = "File not found";
          break;
        case FileError.SECURITY_ERR:
          msg = "Security error";
          break;
        case FileError.INVALID_MODIFICATION_ERR:
          msg = "Invalid modification";
          break;
        case FileError.INVALID_STATE_ERR:
          msg = "Invalid state";
          break;
        default:
          msg = "Unknown error";
          break;
      }

      console.log("Error (" + fileName + "): " + msg);
    };
    var pathToFile = cordova.file.externalDataDirectory + fileName;
    window.resolveLocalFileSystemURL(
      pathToFile,
      function(fileEntry) {
        fileEntry.file(function(file) {
          var reader = new FileReader();

          reader.onloadend = function(e) {
            console.log("Share the results... " + JSON.parse(this.result));
            resolve(JSON.parse(this.result));
          };

          reader.readAsText(file);
        }, errorHandler.bind(null, fileName));
      },
      errorHandler.bind(null, fileName)
    );
     
  }); // Return the promise

}


function write(Name, text) {
  function writeToFile(fileName, data) {
    data = JSON.stringify(data, null, "\t");
    window.resolveLocalFileSystemURL(
      cordova.file.externalDataDirectory,
      function(directoryEntry) {
        directoryEntry.getFile(
          fileName,
          { create: true },
          function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
              fileWriter.onwriteend = function(e) {
                // for real-world usage, you might consider passing a success callback
                console.log('Write of file "' + fileName + '"" completed.');
              };

              fileWriter.onerror = function(e) {
                // you could hook this up with our global error handler, or pass in an error callback
                console.log("Write failed: " + e.toString());
              };

              var blob = new Blob([data], { type: "text/plain" });
              fileWriter.write(blob);
            }, errorHandler.bind(null, fileName));
          },
          errorHandler.bind(null, fileName)
        );
      },
      errorHandler.bind(null, fileName)
    );
  }
  var errorHandler = function(fileName, e) {
    var msg = "";

    switch (e.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = "Storage quota exceeded";
        break;
      case FileError.NOT_FOUND_ERR:
        msg = "File not found";
        break;
      case FileError.SECURITY_ERR:
        msg = "Security error";
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = "Invalid modification";
        break;
      case FileError.INVALID_STATE_ERR:
        msg = "Invalid state";
        break;
      default:
        msg = "Unknown error";
        break;
    }

    console.log("Error (" + fileName + "): " + msg);
  };
  writeToFile(Name, text);
}
let addresses = read("Addresses.json")
let bitcoin = require('bitcoinjs-lib')
export default {
  
  data() {
    return {
      message: "hey",
      addresses
    };
  },
  methods: {
    async readFile(fileName) {
    return(await read(fileName))
  
    },
    
    writeFile(fileName, text) {
      this.message = write(fileName, text);
    },
    Address () {
      const keyPair = bitcoin.ECPair.makeRandom()
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: settings.data() })
      let text = { address: address, key: keyPair, name: 'name ' + Math.floor(Math.random() * 1000000) }
      write('Addresses.json', text);
    },

  }
};
</script>