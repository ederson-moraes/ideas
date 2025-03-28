const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {

    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
    
//     const query = `
//         INSERT INTO ideas(
//         image, 
//         title,
//         category,
//         description,
//         link
//         ) VALUES (?,?,?,?,?);
//         `
//     const values = [  
//         "/movies-app.png",
//         "Videos Edition",
//          "Learning",
//         "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
//         "http://eidm.com.br"
//       ]

//     db.run(query,values), function(err){
//         if (err) return console.log(err)
//         console.log(this)
//    }

    //db.run(`DELETE FROM ideas WHERE id = ?`, [2], function(err){
        //if (err) return console.log(err)
        //console.log("DELETE", this)
    //})

   // db.all(`SELECT * FROM ideas`, function(err, rows){
       // if (err) return console.log(err)
       // console.log(rows)
    
   // })
    
})

module.exports = db

