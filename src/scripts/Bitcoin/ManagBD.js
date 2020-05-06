export default {
    DownLoadAddresses() {
    var text = []
      

      var db = null

    /*  if (navigator.userAgent.match(/(Android)/)) {
          db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
          console.log('DB: SQLite');
      
      } else {*/
      
          db = window.openDatabase('Addresses.db', "0.1", "Addresses.db description", 200000);    
          console.log('DB: WebSQL');
     // }
      db.transaction(function(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS addresses_bitcoin');
        //create table
        tx.executeSql("CREATE TABLE IF NOT EXISTS addresses_bitcoin (address text primary key, name text, key text, net text)", [], function(tx, res){
    
        db.transaction(function(tx) {                    
                    //retrieve data
                    tx.executeSql("SELECT * FROM addresses_bitcoin", [], function(tx, res){
                        for(var iii = 0; iii < res.rows.length; iii++)
                        {
                            text.push({address: res.rows.item(iii).address, name: res.rows.item(iii).name, key: res.rows.item(iii).key, net: res.rows.item(iii).net})   
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
            //tx.executeSql('DROP TABLE IF EXISTS multisig_addresses_bitcoin');
            //create table
            tx.executeSql("CREATE TABLE IF NOT EXISTS multisig_addresses_bitcoin (key text primary key, name text, address text, holders text, signs text, keylist text, net text)", [], function(tx, res){
        
            db.transaction(function(tx) {                    
                        //retrieve data
                        tx.executeSql("SELECT * FROM multisig_addresses_bitcoin", [], function(tx, res){
                            for(var iii = 0; iii < res.rows.length; iii++)
                            {
                                text.push({key: res.rows.item(iii).key, name: res.rows.item(iii).name, address: res.rows.item(iii).address, holders: res.rows.item(iii).holders, signs: res.rows.item(iii).signs, keylist: res.rows.item(iii).keylist, net: res.rows.item(iii).net})   
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
    
    InsertAddressDb(address, name, key, net) {
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
                  tx.executeSql("INSERT INTO addresses_bitcoin (address, name, key, net) VALUES (?,?,?,?)", [address, name, key, net]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
      },

      InsertMultisigDb(address, name, key, holders, signs, keylist, net) {
        var db = null

        if (navigator.userAgent.match(/(Android)/)) {
            db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
            console.log('DB: SQLite');
        
        } else {
        
            db = window.openDatabase('Addresses.db', "0.1", "Addresses.db description", 200000);    
            console.log('DB: WebSQL');
        }
      
          db.transaction(function(tx) {
   
                  tx.executeSql("INSERT INTO multisig_addresses_bitcoin (key, name, address, holders, signs, keylist, net) VALUES (?,?,?,?,?,?,?)", [key, name, address, holders, signs, keylist, net]);
      
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
 
                tx.executeSql("UPDATE multisig_addresses_bitcoin SET keylist = ? WHERE keylist = ?", [newList, oldList]);
    
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
 
                tx.executeSql("UPDATE multisig_addresses_bitcoin SET address = ? WHERE address = ?", [address, ""]);
    
        }, function(err){
    
            //errors for all transactions are reported here
            alert("Error: " + err.message)
    
        });
      },
      RemoveAddressDB(name){
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
                  tx.executeSql("DELETE FROM addresses_bitcoin WHERE name = ?", [name]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
      },

      RemoveMultiAddressDB(name){
        var db = null

            db = window.sqlitePlugin.openDatabase({name: "Addresses.db"});
            console.log('DB: SQLite');
        
      
          db.transaction(function(tx) {
      
                  //insert data
                  tx.executeSql("DELETE FROM multisig_addresses_bitcoin WHERE name = ?", [name]);
      
          }, function(err){
      
              //errors for all transactions are reported here
              alert("Error: " + err.message)
      
          });
        }
}