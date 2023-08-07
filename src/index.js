import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import Simaprinter from "./simaprinter.js";
import { TicketNormal, TicketPrestamo } from './ticket.js';
import { ticketTypes } from './constants.js';

// Configurar uso de .env
dotenv.config();

// Variables de servidor
process.env.TZ = 'America/Mexico_City';
const PORT = process.env.PORT || 3001;
const app = express();
const routes = express.Router();

// Definir expresiones de uso
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use('/', routes);


routes.get('/testServer', (req, res) => {
    return res.status(200).json('Servidor iniciado con éxito');
});

routes.get('/testPrinter', async (req, res) => {
    try {
        const simaprinter = new Simaprinter({});

        const printer = await simaprinter.inicializar();

        return res.status(200).json('Impresora conectada');
    }
    catch(e) {
        return res.status(400).json(e);
    }
});

routes.get('/testPrint', async (req, res) => {
    try {
        const simaprinter = new Simaprinter({});

        await simaprinter.inicializar();

        simaprinter.device.open(() => {
            simaprinter.printer
            .encode('cp437')
                .font('A')
                .align('CT')
                .size(2, 2)
                .text('Prueba')
                .newLine()
                .newLine()
                .close();
        });

        return res.status(200).json('Impresión realizada con éxito');
    }
    catch(e) {
        return res.status(400).json(e);
    }
});

routes.post('/imprimir', async (req, res) => {
    try {
        const { tipo, folio, expediente, matricula, nombreUsuario } = req.body;

        // 10473, 649
        const simaprinter = new Simaprinter({});

        await simaprinter.inicializar();

        // 'INGRESO' | 'EXTRACCION' | 'SUPERVISION ENTRADA' | 'SUPERVISION SALIDA' | 'PRESTAMO' | 'DEVOLUCION'
        const ticketData = {
            tipo,
            folio,
            expediente,
            matricula,
            nombreUsuario,
            fecha: new Date(req.body.fecha)
        };

        let ticket;

        if (tipo === ticketTypes.EXTRACCION || tipo === ticketTypes.INGRESO) {
            ticket = new TicketNormal(ticketData);
        }
        else if (tipo === ticketTypes.PRESTAMO || tipo === ticketTypes.DEVOLUCION) {
            const { matriculaReceptor, nombreReceptor } = req.body;
            
            const ticketPrestamoData = {
                ...ticketData,
                matriculaReceptor,
                nombreReceptor
            }

            ticket = new TicketPrestamo(ticketPrestamoData);
        }
        else {
            ticket = new TicketNormal(ticketData);
        }

        console.log(ticket);

        //await simaprinter.imprimirTicket(ticket);

        return res.status(200).json('Impresión realizada con éxito');
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});



// Escuchar
const server = app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});