import settings from '../scripts/Bitcoin/settings.js'

export default {
    read(fileName) {
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
                console.log(JSON.parse(this.result));
                resolve(JSON.parse(this.result));
            };

            reader.readAsText(file);
            }, errorHandler.bind(null, fileName));
        },
        errorHandler.bind(null, fileName)
        );
        
    }); // Return the promise

    },

    write(Name, text) {
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
    },

    writeToEnd(Name, text) {
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
                      //readFile(fileEntry);
                    };
      
                    fileWriter.onerror = function(e) {
                      // you could hook this up with our global error handler, or pass in an error callback
                      console.log("Write failed: " + e.toString());
                    };
      
                    try {
                          fileWriter.seek(fileWriter.length);
                      }
                      catch (e) {
                          console.log("file doesn't exist!");
                      }
      
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
    },

    clear(Name, text) {
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
                    fileWriter.write('');
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
};
