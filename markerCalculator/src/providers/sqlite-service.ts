import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite } from 'ionic-native';
//import { Storage, SqlStorage } from 'ionic-angular';
/*
  Generated class for the SqliteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SqliteService {
  mydata :any;
  tableName:string;

  private storage: SQLite;
  private isOpen: boolean;

  public database: SQLite;
  public myQueryList: Array<Object>;
  public fullQueryData:any;

  constructor(public http: Http) {
   // console.log('Hello SqliteService Provider');

    if(!this.isOpen) {
      this.storage = new SQLite();
      this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.storage.executeSql("CREATE TABLE IF NOT EXISTS GPSList (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, gpsXt double, gpsYt double)", []);
        this.isOpen = true;
      });
    }


  }
  public insertData(tableName, mydata){
    //INSERT INTO MyTable VALUES ("John", 123, "Lloyds Office");
    var newSqlQuery='INSERT INTO '+tableName+' VALUES '+mydata;
    console.log(newSqlQuery);

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS dittance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));
      }, (error) => {
        //console.error("Unable to execute sql", error);
        console.error("Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("Unable to open database", JSON.stringify(error));
    });


  }
  public rebuildTable(tableSql) {
    //DELETE FROM table_name;
    var newSqlQuery = tableSql;
    console.log(newSqlQuery);

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log("delete : ", JSON.stringify(data));
      }, (error) => {
        console.error("Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("Unable to open database", JSON.stringify(error));
    });
  }


  public countTable(tableSql) {
    //DELETE FROM table_name;
    var newSqlQuery = 'SELECT count(*) AS c FROM '+tableSql;
    console.log(newSqlQuery);

    return new Promise((resolve, reject) => {

        let db = new SQLite();
        db.openDatabase({
          name: "data.db",
          location: "default"
        }).then(() => {
          //;CREATE TABLE IF NOT EXISTS dittance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
          db.executeSql(newSqlQuery, {}).then((data) => {
            console.log("countTable ", JSON.stringify(data));
            this.mydata=data.rows.item(0).c;
            console.log("countTable() -> this.data : "+ this.mydata);
            resolve(this.mydata);

          }, (error) => {
            //console.error("Unable to execute sql", error);
            console.error("countTable Unable to execute sql", JSON.stringify(error));
            reject(error);
          })
        }, (error) => {
          console.error("countTable Unable to open database", JSON.stringify(error));
          reject(error);
        });

    });

  }






  public dropGPSListTable() {
    //DELETE FROM table_name;
    var newSqlQuery = 'DROP TABLE IF EXISTS GPSList';
    console.log(newSqlQuery);

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log(" ", JSON.stringify(data));

        return new Promise(resolve => {
          resolve(data);
        });


      }, (error) => {
        console.error("dropGPSListTable Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("dropGPSListTable Unable to open database", JSON.stringify(error));
    });
  }

  public recreateGPSListTable() {
    //DELETE FROM table_name;
    var newSqlQuery = 'CREATE TABLE IF NOT EXISTS GPSList (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, gpsXt double,gpsYt double)';
    console.log(newSqlQuery);

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log("recreate : ", JSON.stringify(data));

        return data;
      }, (error) => {
        console.error("RecreateGPSListTable Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("RecreateGPSListTable Unable to open database", JSON.stringify(error));
    });
  }


  public dropDistanceTable() {

    //DELETE FROM table_name;
    var newSqlQuery = 'DROP TABLE IF EXISTS distance';
    console.log(newSqlQuery);

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log(" ", JSON.stringify(data));

        return data;
      }, (error) => {
        console.error("dropDistanceTable Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("dropDistanceTable Unable to open database", JSON.stringify(error));
    });
  }

  public recreateDistanceTable() {
    //DELETE FROM table_name;
    var newSqlQuery = 'CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance double, soutceMarkerID INTEGER, Bearing double)';
    console.log(newSqlQuery);

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log(" ", JSON.stringify(data));

        return data;
      }, (error) => {
        console.error("recreateDistanceTable Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("recreateDistanceTable Unable to open database", JSON.stringify(error));
    });
  }



  public showTable(tableName){

    var newSqlQuery='SELECT * FROM '+ tableName;
    console.log(newSqlQuery);

    return new Promise((resolve, reject) => {
      this.storage.executeSql(newSqlQuery, []).then((data) => {
        console.log("show all");
        console.log(JSON.stringify(data));
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });

  }


  public searchVale(markerID:number) {
    //DELETE FROM table_name;
    var newSqlQuery = 'SELECT * FROM GPSList WHERE markerID='+markerID;
    console.log(newSqlQuery);

    return new Promise((resolve, reject) => {

      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        //;CREATE TABLE IF NOT EXISTS dittance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
        db.executeSql(newSqlQuery, {}).then((data) => {
          console.log("searchVale ", JSON.stringify(data));
          this.mydata=data;
          console.log("searchVale() -> this.data : "+ this.mydata);
          resolve(this.mydata);

        }, (error) => {
          //console.error("Unable to execute sql", error);
          console.error("countTable Unable to execute sql", JSON.stringify(error));
          reject(error);
        })
      }, (error) => {
        console.error("countTable Unable to open database", JSON.stringify(error));
        reject(error);
      });

    });

  }




//example
  public getPeople() {
    return new Promise((resolve, reject) => {
      this.storage.executeSql("SELECT * FROM people", []).then((data) => {
        let people = [];
        if(data.rows.length > 0) {
          for(let i = 0; i < data.rows.length; i++) {
            people.push({
              id: data.rows.item(i).id,
              firstname: data.rows.item(i).firstname,
              lastname: data.rows.item(i).lastname
            });
          }
        }
        resolve(people);
      }, (error) => {
        reject(error);
      });
    });
  }

  public getGPSList() {
    var newSqlQuery = 'SELECT * FROM GPSList';
    console.log(newSqlQuery);

    return new Promise((resolve, reject) => {
      this.storage.executeSql("SELECT * FROM GPSList", []).then((data) => {
        let myGPSList = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            myGPSList.push({
              markerID: data.rows.item(i).markerID,
              gpsXt: data.rows.item(i).gpsXt,
              gpsYt: data.rows.item(i).gpsYt
            });
          }
        }

        //this.fullQueryDaya=data.rows;
        //this.myQueryList=myGPSList;
        resolve(myGPSList);
      }, (error) => {
        reject(error);
      });
    });
  }


  public getGPSData() {

    var newSqlQuery = 'SELECT * FROM GPSList';
    console.log(newSqlQuery);

    return new Promise((resolve, reject) => {

      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        //;CREATE TABLE IF NOT EXISTS dittance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
        db.executeSql(newSqlQuery, {}).then((data) => {
          console.log("getGPSData ", JSON.stringify(data));
          let myGPSList = [];
          this.fullQueryData=data;

          for(var i=0; i<this.fullQueryData.rows.length;i++){
            console.log(this.fullQueryData.rows.item(i).markerID+" "+this.fullQueryData.rows.item(i).gpsXt +"  "+ this.fullQueryData.rows.item(i).gpsYt);

          }

          resolve(this.fullQueryData);

        }, (error) => {
          //console.error("Unable to execute sql", error);
          console.error("countTable Unable to execute sql", JSON.stringify(error));
          reject(error);
        })
      }, (error) => {
        console.error("countTable Unable to open database", JSON.stringify(error));
        reject(error);
      });

    });



  }


  public countRecord(markerID) {
    //DELETE FROM table_name;
    var newSqlQuery = 'SELECT count(*) AS c FROM  GPSList WHERE markerID='+markerID;
    console.log(newSqlQuery);

    return new Promise((resolve, reject) => {

      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        //;CREATE TABLE IF NOT EXISTS dittance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
        db.executeSql(newSqlQuery, {}).then((data) => {
          console.log("countRecord ", JSON.stringify(data));
          this.mydata=data.rows.item(0).c;
          console.log("countRecord() -> this.data : "+ this.mydata);
          resolve(this.mydata);

        }, (error) => {
          //console.error("Unable to execute sql", error);
          console.error("countRecord Unable to execute sql", JSON.stringify(error));
          reject(error);
        })
      }, (error) => {
        console.error("countRecord Unable to open database", JSON.stringify(error));
        reject(error);
      });

    });

  }





}
