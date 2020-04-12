export default {
    DownLoadAddresses() {
    var text = []
      var db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});

      db.transaction(function(tx) {
        // tx.executeSql('DROP TABLE IF EXISTS addresses');
        //create table
        tx.executeSql("CREATE TABLE IF NOT EXISTS addresses_ethereum (address text primary key, name text, key text)", [], function(tx, res){
    
        db.transaction(function(tx) {                    
                    //retrieve data
                    tx.executeSql("SELECT * FROM addresses_ethereum", [], function(tx, res){
                        for(var iii = 0; iii < res.rows.length; iii++)
                        {
                            text.push({address: res.rows.item(iii).address, name: res.rows.item(iii).name, key: res.rows.item(iii).key})   
                        }
                        console.log(text)
                        
                    })
                });
         });
        }, function(err){
    
            //errors for all transactions are reported here
            alert("Error: " + err.message)
    
        });
        return text
    },

    DownLoadMultidigAdresses() {
        var text = []
          var db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
    
          db.transaction(function(tx) {
           // tx.executeSql('DROP TABLE IF EXISTS multisigAddresses');
            //create table
            tx.executeSql("CREATE TABLE IF NOT EXISTS multisig_addresses_ethereum (name text primary key, address text, holders integer, signs integer, keylist text)", [], function(tx, res){
        
            db.transaction(function(tx) {                    
                        //retrieve data
                        tx.executeSql("SELECT * FROM multisig_addresses_ethereum", [], function(tx, res){
                            for(var iii = 0; iii < res.rows.length; iii++)
                            {
                                text.push({name: res.rows.item(iii).name, address: res.rows.item(iii).address, holders: res.rows.item(iii).holders, signs: res.rows.item(iii).signs, keylist: res.rows.item(iii).keylist})   
                            }
                            console.log(text)
                            
                        })
                    });
             });
            }, function(err){
        
                //errors for all transactions are reported here
                alert("Error: " + err.message)
        
            });
            return text
        },
    
    InsertAddressDb(address, name, key) {
        var db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
      
          db.transaction(function(tx) {
      
                  //insert data
                  tx.executeSql("INSERT INTO addresses_ethereum (address, name, key) VALUES (?,?,?)", [address, name, key]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
      },

      InsertMultisigDb(address, name, holders, signs, keylist) {
        var db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
      
          db.transaction(function(tx) {
   
                  tx.executeSql("INSERT INTO multisig_addresses_ethereum (name, address, holders, signs, keylist) VALUES (?,?,?,?,?)", [name, address, holders, signs, keylist]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
      },
      InsertAddress(oldList, newList){

        var db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
      
        db.transaction(function(tx) {
 
                tx.executeSql("UPDATE multisig_addresses_ethereum SET keylist = ? WHERE keylist = ?", [newList, oldList]);
    
        }, function(err){
    
            //errors for all transactions are reported here
            alert("Error: " + err.message)
    
        });
      },

      InsertMainAddress(address){

        var db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
      
        db.transaction(function(tx) {
 
                tx.executeSql("UPDATE multisig_addresses_ethereum SET address = ? WHERE address = ?", [address, ""]);
    
        }, function(err){
    
            //errors for all transactions are reported here
            alert("Error: " + err.message)
    
        });
      }
}