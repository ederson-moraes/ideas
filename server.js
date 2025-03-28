const express = require('express');
const server = express();


server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

const nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: server,
    noCache: true
});

const db = require('./db');


// const ideas = [
//     {
//         img: "/movies-app.png",
//         title: "Videos Edition",
//         category: "Learning",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
//         url: "http://eidm.com.br"
//     },
//     {
//         img: "/bank.png",
//         title: "Finance Management",
//         category: "Personal",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
//         url: "http://eidm.com.br"
//     },
//     {
//         img: "/spotify.png",
//         title: "Music Creation",
//         category: "Listening",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
//         url: "http://eidm.com.br"
//     },
//     {
//         img: "/camera.png",
//         title: "Photography Course",
//         category: "Photo",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
//         url: "http://eidm.com.br"
//     },
//     {
//         img: "/translate.png",
//         title: "Learning new Language",
//         category: "Language",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
//         url: "http://eidm.com.br"
//     },
//     {
//         img: "/daily-health-app.png",
//         title: "Health Care",
//         category: "Health",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
//         url: "http://eidm.com.br"
//     }
// ]
server.get('/', (req, res) => {



      db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')

        }
       
        const reverseIdeas = [...rows].reverse();


        let lastIdeas = [];
        for (let idea of reverseIdeas) {
            if(lastIdeas.length <2){
                lastIdeas.push(idea);
            }
        }
    
    
        return res.render('index.html', { ideas: lastIdeas });

    
   })


});


server.get('/ideas', (req, res) => {

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')

        }

        const reverseIdeas = [...rows].reverse();

        return res.render('ideas.html', {ideas: reverseIdeas});

    })

});
  
server.post("/", function(req, res) {
    const query = `
            INSERT INTO ideas(
            image, 
            title,
            category,
            description,
            link
            ) VALUES (?,?,?,?,?);
            `    
        const values = [  
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
      ]

    db.run(query,values, function(err){
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados!')
        }
        return res.redirect('/ideas')
    })
        
})

server.post('/delete', (req, res) => {
    const id = req.body.id;

    const query = `DELETE FROM ideas WHERE id = ?`;

    db.run(query, [id], function(err) {
        if (err) {
            console.log(err);
            return res.send('Erro no banco de dados!');
        }
        return res.redirect('/ideas'); // Redirect to the ideas page after deletion
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});