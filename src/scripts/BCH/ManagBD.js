export default {
    DownLoadAddresses() {
    var text = []
      

      var db = null

      if (navigator.userAgent.match(/(Android)/)) {
          db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
          console.log('DB: SQLite');
      
      } else {
      
          db = window.openDatabase('Addresses.db', "0.1", "Addresses.db description", 200000);    
          console.log('DB: WebSQL');
      }
      db.transaction(function(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS addresses');
        //create table
        tx.executeSql("CREATE TABLE IF NOT EXISTS addresses_bch (address text primary key, name text, key text)", [], function(tx, res){
    
        db.transaction(function(tx) {                    
                    //retrieve data
                    tx.executeSql("SELECT * FROM addresses_bch", [], function(tx, res){
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
        var db = null

        if (navigator.userAgent.match(/(Android)/)) {
            db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
            console.log('DB: SQLite');
        
        } else {
        
            db = window.openDatabase('Addresses.db', "0.1", "Addresses.db description", 200000);    
            console.log('DB: WebSQL');
        }
    
          db.transaction(function(tx) {
            //tx.executeSql('DROP TABLE IF EXISTS multisigAddresses');
            //create table
            tx.executeSql("CREATE TABLE IF NOT EXISTS multisig_addresses_bch (key text primary key, name text, address text, holders text, signs text, keylist text)", [], function(tx, res){
        
            db.transaction(function(tx) {                    
                        //retrieve data
                        tx.executeSql("SELECT * FROM multisig_addresses_bch", [], function(tx, res){
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
        var db = null

        if (navigator.userAgent.match(/(Android)/)) {
            db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
            console.log('DB: SQLite');
        
        } else {
        
            db = window.openDatabase('Addresses.db', "0.1", "Addresses.db description", 200000);    
            console.log('DB: WebSQL');
        }
      
          db.transaction(function(tx) {
      
                  //insert data
                  tx.executeSql("INSERT INTO addresses_bch (address, name, key) VALUES (?,?,?)", [address, name, key]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
      },

      InsertMultisigDb(address, name, key, holders, signs, keylist) {
        var db = null

        if (navigator.userAgent.match(/(Android)/)) {
            db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
            console.log('DB: SQLite');
        
        } else {
        
            db = window.openDatabase('Addresses.db', "0.1", "Addresses.db description", 200000);    
            console.log('DB: WebSQL');
        }
      
          db.transaction(function(tx) {
   
                  tx.executeSql("INSERT INTO multisig_addresses_bch (key, name, address, holders, signs, keylist) VALUES (?,?,?,?,?,?)", [key, name, address, holders, signs, keylist]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
      },
      InsertAddress(oldList, newList){

        var db = null

        if (navigator.userAgent.match(/(Android)/)) {
            db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
            console.log('DB: SQLite');
        
        } else {
        
            db = window.openDatabase('Addresses.db', "0.1", "Addresses.db description", 200000);    
            console.log('DB: WebSQL');
        }
      
        db.transaction(function(tx) {
 
                tx.executeSql("UPDATE multisig_addresses_bch SET keylist = ? WHERE keylist = ?", [newList, oldList]);
    
        }, function(err){
    
            //errors for all transactions are reported here
            alert("Error: " + err.message)
    
        });
      },

      InsertMainAddress(address){

        var db = null

        if (navigator.userAgent.match(/(Android)/)) {
            db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
            console.log('DB: SQLite');
        
        } else {
        
            db = window.openDatabase('Addresses.db', "0.1", "Addresses.db description", 200000);    
            console.log('DB: WebSQL');
        }
      
        db.transaction(function(tx) {
 
                tx.executeSql("UPDATE multisig_addresses_bch SET address = ? WHERE address = ?", [address, ""]);
    
        }, function(err){
    
            //errors for all transactions are reported here
            alert("Error: " + err.message)
    
        });
      }
}