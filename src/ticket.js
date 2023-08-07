export class Ticket {
    /** 
     * Contiene la definición de un ticket para imprimir.
     * @param {Object} ticket 
     * @param {'INGRESO' | 'EXTRACCION' | 'PRESTAMO' | 'DEVOLUCION'} ticket.tipo 
     * @param {String} ticket.folio 
     * @param {Object} ticket.expediente 
     * @param {String} ticket.matricula 
     * @param {String} ticket.nombreUsuario 
     * @param {Date} ticket.fecha 
    */
    constructor({ tipo, folio, expediente, matricula, nombreUsuario, fecha }) {
        this.tipo = tipo;
        this.folio = folio;
        this.expediente = expediente;
        this.matricula = matricula;
        this.nombreUsuario = nombreUsuario;
        this.fecha = fecha;
        this.leyenda = 'FAVOR DE CONSERVAR ESTE TICKET COMO EVIDENCIA DE SU OPERACION.';
    }
}

export class TicketNormal extends Ticket {
    /** 
     * Contiene la definición de un ticket de tipo normal para imprimir.
     * @param {Object} ticketNormal
     * @param {'INGRESO' | 'EXTRACCION'} ticketNormal.tipo 
     * @param {String} ticketNormal.folio 
     * @param {Object} ticketNormal.expediente 
     * @param {String} ticketNormal.matricula 
     * @param {String} ticketNormal.nombreUsuario 
     * @param {Date} ticketNormal.fecha 
    */
    constructor({ tipo, folio, expediente, matricula, nombreUsuario, fecha }) {
        super({ tipo, folio, expediente, matricula, nombreUsuario, fecha });
        this.subleyenda = `USTED ES RESPONSABLE DEL EXTRAVIO, MODIFICACION, DAÑO O CUALQUIER USO INDEBIDO DEL EXPEDIENTE MIENTRAS NO SE REGISTRE EL INGRESO. EN CASO DE ENCONTRAR CUALQUIER DEFECTO FAVOR DE REPORTAR.`;
    }
}

export class TicketPrestamo extends Ticket {
    /** 
     * Contiene la definición de un ticket de tipo préstamo para imprimir.
     * @param {Object} ticketPrestamo
     * @param {'PRESTAMO' | 'DEVOLUCION'} ticketPrestamo.tipo 
     * @param {String} ticketPrestamo.folio 
     * @param {Object} ticketPrestamo.expediente 
     * @param {String} ticketPrestamo.matricula 
     * @param {String} ticketPrestamo.nombreUsuario 
     * @param {Date} ticketPrestamo.fecha
     * @param {String} ticketPrestamo.matriculaReceptor
     * @param {String} ticketPrestamo.nombreReceptor
    */
    constructor({ tipo, folio, expediente, matricula, nombreUsuario, fecha, matriculaReceptor, nombreReceptor }) {
        super({ tipo, folio, expediente, matricula, nombreUsuario, fecha });
        this.matriculaReceptor = matriculaReceptor;
        this.nombreReceptor = nombreReceptor;
        this.subleyenda = `USTED ES RESPONSABLE DEL EXTRAVIO, MODIFICACION, DAÑO O CUALQUIER USO INDEBIDO DE LOS EXPEDIENTES MIENTRAS NO SE REGISTRE LA DEVOLUCION. EN CASO DE ENCONTRAR CUALQUIER DEFECTO FAVOR DE REPORTAR.`;
    }
}

export default Ticket;