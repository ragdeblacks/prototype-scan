import { Injectable  } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AlgorithmHelper {

  findKey(searchElem: string, arrayList: any){
    let dataResponse: any;
    if(searchElem === 'NOMB'){
      arrayList.forEach((element, key) => {
        const cad = element.toLocaleLowerCase();
        const search =  cad.indexOf(searchElem.toLocaleLowerCase());
        if(search !== -1){
          const keyName = (key+2);
          dataResponse = {
            nameComplete: arrayList[keyName+2]+' '+arrayList[keyName]+' '+arrayList[keyName+1],
            name: arrayList[keyName+2],
            lastName: arrayList[keyName],
            surname: arrayList[keyName+1]
          };
        }
      });
    }else if(searchElem === 'DOMIC'){
      arrayList.forEach((element, key) => {
        const cad = element.toLocaleLowerCase();
        const search =  cad.indexOf(searchElem.toLocaleLowerCase());
        if(search !== -1){
          const keySerch = (key+3);
          const searchStreet =  arrayList[keySerch].indexOf('CLAVE DE ELEC');
          if (searchStreet !== -1){
            const keyName = (key+1);
            const divMuni = arrayList[keyName+1].split(' ');
            dataResponse = {
              street: '',
              state: divMuni[1],
              colony: arrayList[keyName],
              municipality: divMuni[0].replace(',','')
            }; 
          }else{
            const keyName = (key+1);
            const divMuni = arrayList[keyName+2].split(' ');
            dataResponse = {
              street: arrayList[keyName],
              state: divMuni[1],
              colony: arrayList[keyName+1],
              municipality: divMuni[0]
            }; 
          }
        }
      });
    }else if (searchElem === 'FECHA DE NACIM'){
      arrayList.forEach((element, key) => {
        const cad = element.toLocaleLowerCase();
        const search =  cad.indexOf(searchElem.toLocaleLowerCase());
        if(search !== -1){
          const keyName = (key+1);
          dataResponse = arrayList[keyName];
        }
      });
    } else if(searchElem === 'CURP') {
      arrayList.forEach((element, key) => {
        const cad = element.toLocaleLowerCase();
        const search =  cad.indexOf(searchElem.toLocaleLowerCase());
        if(search !== -1){
          const searchSpace =  cad.indexOf(' ');
          if(searchSpace !== -1){
            const divide = element.split(' ');
            dataResponse = divide[1];
          }else{
            const keyName = (key+1);
            dataResponse = arrayList[keyName];
          }
          
        }
      });
    }
    return dataResponse;
  }
  
  findKeyAlterA(searchElem: string, arrayList: any){
    let dataResponse: any;
    if(searchElem === 'NOMB'){
      arrayList.forEach((element, key) => {
        const cad = element.toLocaleLowerCase();
        const search =  cad.indexOf(searchElem.toLocaleLowerCase());
        if(search !== -1){
          const keyName = (key+1);
          dataResponse = {
            nameComplete: arrayList[keyName+2]+' '+arrayList[keyName]+' '+arrayList[keyName+1],
            name: arrayList[keyName+2],
            lastName: arrayList[keyName],
            surname: arrayList[keyName+1]
          };
        }
      });
    }else if(searchElem === 'DOMIC'){
      arrayList.forEach((element, key) => {
        const cad = element.toLocaleLowerCase();
        const search =  cad.indexOf(searchElem.toLocaleLowerCase());
        if(search !== -1){
          const keySerch = (key+3);
          const searchStreet =  arrayList[keySerch].indexOf('CLAVE DE ELEC');
          if (searchStreet !== -1){
            const keyName = (key+1);
            const divMuni = arrayList[keyName+1].split(' ');
            dataResponse = {
              street: '',
              state:divMuni[1],
              colony: arrayList[keyName],
              municipality: divMuni[0].replace(',','')
            }; 
          }else{
            const keyName = (key+1);
            const divMuni = arrayList[keyName+2].split(' ');
            dataResponse = {
              street: arrayList[keyName],
              state: divMuni[1],
              colony: arrayList[keyName+1],
              municipality: divMuni[0].replace(',','')
            }; 
          }
        }
      });
    }
    return dataResponse;
  }
  
}
