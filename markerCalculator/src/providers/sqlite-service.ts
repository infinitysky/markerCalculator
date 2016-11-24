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

  public database: SQLite;
  public myQueryList: Array<Object>;

  constructor(public http: Http) {
   // console.log('Hello SqliteService Provider');
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
    var number=0;

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log("countTable ", JSON.stringify(data));
        console.log("testetst")
        number=data.rows.item(0).c;
        console.log(number);
        return number;
      }, (error) => {
        console.error("countTable Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("countTable Unable to open database", JSON.stringify(error));
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

        return data;
      }, (error) => {
        console.error("dropGPSListTable Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("dropGPSListTable Unable to open database", JSON.stringify(error));
    });
  }

  public recreateGPSListTable() {
    //DELETE FROM table_name;
    var newSqlQuery = 'CREATE TABLE IF NOT EXISTS GPSList (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, gpsLon double,gpsLat double)';
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

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log("show all");
        console.log(JSON.stringify(data));
        //if(data.rows.length > 0) {
        //  for(var i = 0; i < data.rows.length; i++) {
          //  this.myQueryList.push({markerID: data.rows.item(i).markerID, gpsLon: data.rows.item(i).gpsLon, gpsLat: data.rows.item(i).gpsLat});
          //  console.log(data.rows.item(i).markerID);
         // }
        //}

        //console.log(JSON.stringify(data.rows.item(1).markerID));
       // return data;
        //console.log(JSON.parse(data.rows.item).result);
        return data;
          // if(this.myQueryList) {
          //   // already loaded data
          //   return Promise.resolve(this.myQueryList);
          // }
          //
          // // don't have the data yet
          // return new Promise(resolve => {
          //
          //
          // });


      }, (error) => {
        console.error("showTable Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("showTable Unable to open database", JSON.stringify(error));
    });



    // this.database.executeSql(newSqlQuery, []).then((data) => {
    //   if(data.rows.length > 0) {
    //     for(var i = 0; i < data.rows.length; i++) {
    //       this.myQueryList.push({markerID: data.rows.item(i).markerID, gpsLon: data.rows.item(i).gpsLon, gpsLat: data.rows.item(i).gpsLat});
    //     }
    //   }
    //   console.log(JSON.stringify(data.rows.item(1).markerID));
    //   return this.myQueryList;
    // }, (error) => {
    //   console.log("ERROR: " + JSON.stringify(error));
    // });

  }

  public searchVale(markerID){

    var newSqlQuery = 'SELECT * FROM GPSList where markerID='+markerID;
    console.log(newSqlQuery);

    let db = new SQLite();
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      //;CREATE TABLE IF NOT EXISTS distance (id INTEGER PRIMARY KEY AUTOINCREMENT, markerID int, distance int, soutceMarkerID int, Bearing double)
      db.executeSql(newSqlQuery, {}).then((data) => {
        console.log(" ", JSON.stringify(data));
        console.log(data.rows.item(1).markerID);
        return data;
      }, (error) => {
        console.error("dropDistanceTable Unable to execute sql", JSON.stringify(error));
      })
    }, (error) => {
      console.error("dropDistanceTable Unable to open database", JSON.stringify(error));
    });


  }

}
