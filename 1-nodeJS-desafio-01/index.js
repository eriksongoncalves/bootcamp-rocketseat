const express = require('express');
const server = express();
const projects = [];
let countRequests = 0;

server.use(express.json());

function counter(req, res, next) {
    countRequests++;
    console.log(`Requests: ${countRequests}`);
    return next();
}

server.use(counter);

function checkIdExists(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send("Invalid params");
    }

    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).send("Project not found");
    }

    return next();
}

// ROTAS 
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    if (!id || !title) {
        return res.status(400).send("Invalid params");
    }

    let project = {
        id,
        title,
        tasks: []
    }

    projects.push(project);

    return res.status(200).json(project);
});

server.get('/projects', (req, res) => {
    return res.status(200).json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.status(200).json(projects);

});

server.delete('/projects/:id', checkIdExists, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    return res.status(200).send(projects);
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
        return res.status(400).send("Invalid params");
    }

    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.status(200).json(project);
});

server.listen(3333, () => {
    console.log('SERVER OK');
});