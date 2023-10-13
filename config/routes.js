const express = require('express');
const routes = express.Router();

let db = [
    { '1': { Nome: 'Cliente 1', Idade: 20 } },
    { '2': { Nome: 'Cliente 2', Idade: 20 } },
    { '3': { Nome: 'Cliente 3', Idade: 20 } }
];

// Buscar dados
routes.get('/', (req, res) => {
    return res.json(db);
});

// Inserindo dados
routes.post('/add', (req, res) => {
    const body = req.body;

    if (!body)
        return res.status(400).end();

    const newId = (db.length + 1).toString();
    db.push({ [newId]: body });
//Adição de mensagem de sucesso
    return res.json({ success: 'Dados inseridos com sucesso' });
});

// Deletando dados, fiz mudanças a lógica de exclusão de dados na rota routes.delete, onde agora passamos a verificar o item com o ID correspondente existente no banco de dados antes de tentar excluí-lo. Se o item não for encontrado, ele retornará um status 404 com uma mensagem de erro.

routes.delete('/:id', (req, res) => {
    const id = req.params.id;

    // Filtrar o item com o ID correspondente
    let itemToDelete = db.find(item => item[id]);

    if (!itemToDelete) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }

    // Remover o item do banco de dados
    db = db.filter(item => !itemToDelete[id]);

    return res.json({ success: 'Dados deletados com sucesso' });
});

module.exports = routes;
