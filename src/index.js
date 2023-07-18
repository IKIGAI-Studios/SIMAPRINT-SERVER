import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import Simaprinter from "./simaprinter.js";
import Ticket, { TicketNormal, TicketPrestamo, TicketSupervision } from './ticket.js';
import { ticketTypes } from './constants.js';

// Configurar uso de .env
dotenv.config();

// Variables de servidor
process.env.TZ = 'America/Mexico_City';
const PORT = process.env.PORT;
const app = express();
const routes = express.Router();

// Definir expresiones de uso
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use('/', routes);



routes.post('/imprimir', async (req, res) => {
    try {
        console.log('a', req.body);
        const { tipo, folio, expedientes, matricula, nombreUsuario } = req.body;

        //const { data, tipo } = req.body;
        const simaprinter = new Simaprinter({
            vid: 10473,
            pid: 649
        });

        await simaprinter.inicializar();

        // 'INGRESO' | 'EXTRACCION' | 'SUPERVISION ENTRADA' | 'SUPERVISION SALIDA' | 'PRESTAMO' | 'DEVOLUCION'
        const ticketData = {
            tipo,
            folio,
            expedientes,
            matricula,
            nombreUsuario,
            fecha: new Date(req.body.fecha)
        };

        let ticket;

        if (tipo === ticketTypes.EXTRACCION || tipo === ticketTypes.INGRESO) {
            ticket = new TicketNormal(ticketData);
        }
        else if (tipo === ticketTypes.SUPERVISION_ENTRADA || tipo === ticketTypes.SUPERVISION_SALIDA) {
            const { supervisor } = req.body;
            
            const ticketSupervisorData = {
                ...ticketData,
                supervisor
            }
            ticket = new TicketSupervision(ticketSupervisorData);
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
            ticket = new Ticket(ticketData);
        }

        console.log(ticket);
        await simaprinter.imprimirTicket(ticket)

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



// 10473, 649