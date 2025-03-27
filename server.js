const express = require('express');
const server = express();


server.use(express.static('public'));

const nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: server,
    noCache: true
});


const ideas = [
    {
        img: "/movies-app.png",
        title: "Videos Edition",
        category: "Learning",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
        url: "http://eidm.com.br"
    },
    {
        img: "/bank.png",
        title: "Finance Management",
        category: "Personal",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
        url: "http://eidm.com.br"
    },
    {
        img: "/spotify.png",
        title: "Music Creation",
        category: "Listening",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
        url: "http://eidm.com.br"
    },
    {
        img: "/camera.png",
        title: "Photography Course",
        category: "Photo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
        url: "http://eidm.com.br"
    },
    {
        img: "/translate.png",
        title: "Learning new Language",
        category: "Language",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
        url: "http://eidm.com.br"
    },
    {
        img: "/daily-health-app.png",
        title: "Health Care",
        category: "Health",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error ipsa, eos et placeat a doloremque odit itaque debitis corporis unde sed fuga impedit minus fugiat reiciendis ea rem dicta modi?",
        url: "http://eidm.com.br"
    }
]
server.get('/', (req, res) => {

    const reverseIdeas = [...ideas].reverse();


    let lastIdeas = [];
    for (let idea of reverseIdeas) {
        if(lastIdeas.length <2){
            lastIdeas.push(idea);
        }
    }


    return res.render('index.html', { ideas: lastIdeas });

});


server.get('/ideas', (req, res) => {

    const reverseIdeas = [...ideas].reverse();

    return res.render('ideas.html', {ideas: reverseIdeas});

});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});