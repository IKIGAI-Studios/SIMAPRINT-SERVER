export class Ticket {
    /** 
     * Contiene la definición de un ticket para imprimir.
     * @param {Object} ticket 
     * @param {'INGRESO' | 'EXTRACCION' | 'SUPERVISION_ENTRADA' | 'SUPERVISION_SALIDA' | 'PRESTAMO' | 'DEVOLUCION'} ticket.tipo 
     * @param {String} ticket.folio 
     * @param {Array} ticket.expedientes 
     * @param {String} ticket.matricula 
     * @param {String} ticket.nombreUsuario 
     * @param {Date} ticket.fecha 
    */
    constructor({ tipo, folio, expedientes, matricula, nombreUsuario, fecha }) {
        this.tipo = tipo;
        this.folio = folio;
        this.expedientes = expedientes;
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
     * @param {Array} ticketNormal.expedientes 
     * @param {String} ticketNormal.matricula 
     * @param {String} ticketNormal.nombreUsuario 
     * @param {Date} ticketNormal.fecha 
    */
    constructor({ tipo, folio, expedientes, matricula, nombreUsuario, fecha }) {
        super({ tipo, folio, expedientes, matricula, nombreUsuario, fecha });
        this.subleyenda = `USTED ES RESPONSABLE DEL EXTRAVIO, MODIFICACION, DAÑO O CUALQUIER USO INDEBIDO DEL EXPEDIENTE MIENTRAS NO SE REGISTRE EL INGRESO. EN CASO DE ENCONTRAR CUALQUIER DEFECTO FAVOR DE REPORTAR.`;
    }
}

export class TicketSupervision extends Ticket {
    /** 
     * Contiene la definición de un ticket de tipo supervision para imprimir.
     * @param {Object} ticketSupervision
     * @param {'SUPERVISION_ENTRADA' | 'SUPERVISION_SALIDA'} ticketSupervision.tipo 
     * @param {String} ticketSupervision.folio 
     * @param {Array} ticketSupervision.expedientes 
     * @param {String} ticketSupervision.matricula 
     * @param {String} ticketSupervision.nombreUsuario 
     * @param {Date} ticketSupervision.fecha 
     * @param {String} ticketSupervision.supervisor 
    */
    constructor({ tipo, folio, expedientes, matricula, nombreUsuario, fecha, supervisor }) {
        super({ tipo, folio, expedientes, matricula, nombreUsuario, fecha });
        this.supervisor = supervisor;
        this.subleyenda = `USTED ES RESPONSABLE DEL EXTRAVIO, MODIFICACION, DAÑO O CUALQUIER USO INDEBIDO DE LOS EXPEDIENTES MIENTRAS NO SE REGISTRE EL INGRESO. EN CASO DE ENCONTRAR CUALQUIER DEFECTO FAVOR DE REPORTAR.`;
    }
}

export class TicketPrestamo extends Ticket {
    /** 
     * Contiene la definición de un ticket de tipo préstamo para imprimir.
     * @param {Object} ticketPrestamo
     * @param {'PRESTAMO' | 'DEVOLUCION'} ticketPrestamo.tipo 
     * @param {String} ticketPrestamo.folio 
     * @param {Array} ticketPrestamo.expedientes 
     * @param {String} ticketPrestamo.matricula 
     * @param {String} ticketPrestamo.nombreUsuario 
     * @param {Date} ticketPrestamo.fecha
     * @param {String} ticketPrestamo.matriculaReceptor
     * @param {String} ticketPrestamo.nombreReceptor
    */
    constructor({ tipo, folio, expedientes, matricula, nombreUsuario, fecha, matriculaReceptor, nombreReceptor }) {
        super({ tipo, folio, expedientes, matricula, nombreUsuario, fecha });
        this.matriculaReceptor = matriculaReceptor;
        this.nombreReceptor = nombreReceptor;
        this.subleyenda = `USTED ES RESPONSABLE DEL EXTRAVIO, MODIFICACION, DAÑO O CUALQUIER USO INDEBIDO DE LOS EXPEDIENTES MIENTRAS NO SE REGISTRE LA DEVOLUCION. EN CASO DE ENCONTRAR CUALQUIER DEFECTO FAVOR DE REPORTAR.`;
    }
}

export default Ticket;