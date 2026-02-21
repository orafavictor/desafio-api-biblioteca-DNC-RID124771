const express  = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', bookRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API da Biblioteca!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});