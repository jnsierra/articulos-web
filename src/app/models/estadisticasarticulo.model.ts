export class EstadisticaArticuloModel{
    PUBLICADO: number;
    ENVIADO_POR_CORRECCIONES: number;
    CREADA: number;

    public of(objeto: any): EstadisticaArticuloModel{
        let aux = new EstadisticaArticuloModel();
        aux.PUBLICADO = objeto.PUBLICADO;
        aux.ENVIADO_POR_CORRECCIONES = objeto.ENVIADO_POR_CORRECCIONES;
        aux.CREADA = objeto.CREADA;
        return aux;
    }
}