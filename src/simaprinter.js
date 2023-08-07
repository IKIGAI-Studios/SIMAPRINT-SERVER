import escpos from 'escpos';
import Device from './device.js';
import { Ticket, TicketNormal, TicketPrestamo } from './ticket.js';
import { ticketTypes } from './constants.js';

class Simaprinter {
    /**
     * Contiene la definición de una impresora térmica con sus métodos de impresión.
     * @param {Object} data
     * @param {number} [data.vid] Vendor Id de la impresora
     * @param {number} [data.pid] Product Id de la impresora
     */
    constructor({vid = null, pid = null}) {
        // * CAMBIAR CON CADA IMPRESORA
        this.vid = vid;
        this.pid = pid;

        /**
         * @type {Device} Propiedad que almacena el dispositivo usb.
         */
        this.device = null;

        /**
         * @type {escpos.Printer} Propiedad que almacena la impresora térmica.
         */
        this.printer = null;
    }

    /**
     * Método para inicializar la impresora. Es necesario llamarlo una vez construído el objeto.
     * @returns {Promise<escpos.Printer>} Devuelve el objeto tipo Printer que contiene la impresora
     */
    async inicializar() {
        return new Promise(async (resolve, reject) => {
            // Si se tiene la información de vid y pid, entonces se inicializa con eso
            try {
                if (this.vid && this.pid) {
                    this.device = new Device(this.vid, this.pid);
                    await this.device.setDevice();
                }
                // Si no se tiene la información de vid y pid, entonces se busca la primera impresora conectada y se inicializa con eso
                else {
                    this.device = Device.getPrinter();
                }

                // Intentar abrir el dispositivo
                this.device.open();
                
                // Se declara un objeto printer de escpos en la clase para poder imprimir.
                this.printer = new escpos.Printer(this.device);

                resolve(this.printer);
            } 
            catch (error) {
                reject('Error al inicializar la impresora');
            }
        });
    }
    
    /**
     * Método para imprimir un ticket
     * @param {TicketPrestamo | TicketNormal} ticket Ticket a imprimir
     * @returns {Promise} Retorna el propio ticket impreso
     */
    async imprimirTicket(ticket) {
        return new Promise((resolve) => {
            this.device.open(() => {
                this.printer
                    .encode('cp437')
                    .font('A')
                    .align('CT')
                    .size(2, 2)
                    .text('SIMAPE')
                    .newLine()
                    .size(1, 1)
                    .text(ticket.tipo)
                    .newLine()
                    .newLine()
                    .size(0.5, 0.5)
                    .text(`------------------------`)
                    .style('B')
                    .text(`Folio: ${ticket.folio}`)
                    .text(`Expediente: ${ticket.expediente.nss}`)
                    .text(`Nombre: ${ticket.expediente.nombre}`)
                    .text(`------------------------`)
                    .text(`Matricula: ${ticket.matricula}`)
                    .text(`Responsable: ${ticket.nombreUsuario}`)
                    .text(`Fecha: ${ticket.fecha.toLocaleString()}`)
                    .text(`------------------------`);
                    

                if (ticket instanceof TicketPrestamo) {
                    this.printer.text(`Matricula del receptor : ${ticket.matriculaReceptor}`);
                    this.printer.text(`Nombre del receptor: ${ticket.nombreReceptor}`);
                }

                this.printer
                    .newLine()
                    .text(ticket.leyenda)

                if (ticket.tipo === ticketTypes.EXTRACCION || ticket.tipo === ticketTypes.PRESTAMO) {
                    this.printer.text(ticket.subleyenda);
                }
        
                this.printer.cut().close();
            });

            resolve(ticket);
        });
    }
}

export default Simaprinter;
