export class ProfesorModel{
    
    id: number;
    nombre: number;

    constructor(){}

    public of(objeto: any):ProfesorModel{
        let prof = new ProfesorModel();
        prof.id = objeto.id;
        prof.nombre = objeto.nombre;
        return prof;
    }
}