    let btn =document.querySelector('#processFiles')
    
  
    btn.addEventListener('click', () => {
      const input = document.getElementById('directoryInput');
      const files = input.files;

      if (!files.length) {
        alert('Espere el total de sus archivos '+'\n'+' O selecciona un directorio valido.');
        return;
      }

    
      // Limpiar resultados previos
      var conse =0;
      Array.from(files).forEach(file => {
        if (file.type === 'text/xml') {
          const reader = new FileReader();
          
          reader.onload = () => {
            conse= conse+1
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(reader.result, 'application/xml');
            const uuidElement =  xmlDoc.querySelector('TimbreFiscalDigital').getAttribute('UUID');  
            const fecha=xmlDoc.querySelector('Comprobante').getAttribute('Fecha')
            const serie=xmlDoc.querySelector('Comprobante').getAttribute('Serie')
            const folio=xmlDoc.querySelector('Comprobante').getAttribute('Folio')
            const mpago=xmlDoc.querySelector('Comprobante').getAttribute('MetodoPago')
            const tipocomprobante=xmlDoc.querySelector('Comprobante').getAttribute('TipoDeComprobante')
            const ucfdi=xmlDoc.querySelector('Receptor').getAttribute('UsoCFDI')

            const subtotal=xmlDoc.querySelector('Comprobante').getAttribute('SubTotal')
            const total=xmlDoc.querySelector('Comprobante').getAttribute('Total')
            const forma=xmlDoc.querySelector('Comprobante').getAttribute('FormaPago')
            const metodo=xmlDoc.querySelector('Comprobante').getAttribute('MetodoPago')
            
            

            const emisor = xmlDoc.querySelector('Emisor').getAttribute('Nombre');
            const emisorRFC = xmlDoc.querySelector('Emisor').getAttribute('Rfc');
            const emisorREGIMEN = xmlDoc.querySelector('Emisor').getAttribute('RegimenFiscal');

            const receptor = xmlDoc.querySelector('Receptor').getAttribute('Nombre');
            const receptorRFC = xmlDoc.querySelector('Receptor').getAttribute('Rfc');
            const receptorREGIMEN = xmlDoc.querySelector('Receptor').getAttribute('RegimenFiscalReceptor');
            const receptorCFDI = xmlDoc.querySelector('Receptor').getAttribute('UsoCFDI');


            const concepto = xmlDoc.querySelector('Concepto').getAttribute('ClaveProdServ');
            const conceptoD = xmlDoc.querySelector('Concepto').getAttribute('Descripcion');
            const conceptoI = xmlDoc.querySelector('Concepto').getAttribute('Importe');
            const conceptoDES = xmlDoc.querySelector('Concepto').getAttribute('Descuento');

           


            let datos={conse,
              uuidElement, fecha,serie,folio,ucfdi,mpago,
              total,
              subtotal,
              forma,
              metodo,
              tipocomprobante,
              emisor,
              emisorRFC,
              emisorREGIMEN,
              receptor,
              receptorRFC,
              receptorREGIMEN,
            receptorCFDI,
            concepto,
            conceptoD,
            conceptoI,
            conceptoDES 
            }
            const datos2={uuidElement,receptor,emisor}
             //SI HAY DOCTO
            var docto = xmlDoc.querySelector('DoctoRelacionado');
            if(docto!==null){
            try {
            FILLINGT2(xmlDoc,uuidElement,emisor)  
            } catch (error) {
            console.log('ERROR EN: '+uuidElement+'  ')  
            }
            
            }
            //SI HAY DOCTO

            const tbody = document.querySelector("#TABLA1 tbody");

                // Función para generar filas dinámicamente
            const fila = document.createElement("tr");

                 // Crear celdas para cada propiedad
            Object.values(datos).forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
            });
            // Agregar la fila al cuerpo de la tabla
            tbody.appendChild(fila);

            // Aquí puedes analizar el contenido del archivo XML
            const rootElement = xmlDoc.documentElement.nodeName;
            
          };

          reader.onerror = () => {
           
          };

          reader.readAsText(file);
        } else {
          
        }
      });
    });