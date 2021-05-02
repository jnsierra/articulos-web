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

    baseTo64File(file){
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
        });
    }

    identificaTipoDocumento(name:string):string{
        var n = name.search("pdf");
        if(n>=0){
          return "pdf";
        }
        n = name.search("docx");
        if(n>=0){
          return "docx";
        }
        return "";
    }

    generateInputFile(legend:string, idInput: string, acceptFiles: string): string{
        const html = `<legend>${legend}</legend>
                      <input type="file" class="form-control" id="${idInput}" accept="${acceptFiles}" />`;
        return html;
    }

    
}