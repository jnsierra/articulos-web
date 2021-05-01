import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UtilesBase64Service {

    constructor(){}

    downloadPdf(base64String, fileName) {
        const source = `data:application/pdf;base64,${base64String}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}`;
        link.click();
    }

    
}