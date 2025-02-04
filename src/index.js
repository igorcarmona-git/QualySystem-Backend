require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const os = require('os');
const { networkInterfaces } = os;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Obtendo o IP local da máquina
const getLocalIP = () => {
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
};

const localIP = getLocalIP();
const agora = new Date().toLocaleString();
console.log(`Servidor iniciado em: ${agora}`);

// Inicialização do servidor
const PORT = process.env.PORT || 5067;
app.listen(PORT, () => console.log(`Server is running on http://${localIP}:${PORT}...`));
