export default {
    DownLoadAddresses() {
    var text = []
      var db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});

      db.transaction(function(tx) {
        // tx.executeSql('DROP TABLE IF EXISTS addresses');
        //create table
        tx.executeSql("CREATE TABLE IF NOT EXISTS addresses (address text primary key, name text, key text)", [], function(tx, res){
    
        db.transaction(function(tx) {                    
                    //retrieve data
                    tx.executeSql("SELECT * FROM addresses", [], function(tx, res){
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
            tx.executeSql("CREATE TABLE IF NOT EXISTS multisigAddresses (key text primary key, name text, address text, holders text, signs text, keylist text)", [], function(tx, res){
        
            db.transaction(function(tx) {                    
                        //retrieve data
                        tx.executeSql("SELECT * FROM multisigAddresses", [], function(tx, res){
                            for(var iii = 0; iii < res.rows.length; iii++)
                            {
                                text.push({key: res.rows.item(iii).key, name: res.rows.item(iii).name, address: res.rows.item(iii).address, holders: res.rows.item(iii).holders, signs: res.rows.item(iii).signs, keylist: res.rows.item(iii).keylist})   
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
                  tx.executeSql("INSERT INTO addresses (address, name, key) VALUES (?,?,?)", [address, name, key]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
      },

      InsertMultisigDb(address, name, key, holders, signs, keylist) {
        var db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
      
          db.transaction(function(tx) {
   
                  tx.executeSql("INSERT INTO multisigAddresses (key, name, address, holders, signs, keylist) VALUES (?,?,?,?,?,?)", [key, name, address, holders, signs, keylist]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
      }
}