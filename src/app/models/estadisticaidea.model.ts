export class EstadisticaModel{
    CREADA: number;
    APROBAR: number;
    RECHAZAR: number;

    public of(objeto: any): EstadisticaModel{
        let est = new EstadisticaModel();
        est.CREADA = objeto.CREADA;
        est.APROBAR = objeto.APROBAR;
        est.RECHAZAR = objeto.RECHAZAR;
        return est;
    }
}