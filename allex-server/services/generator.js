require('dotenv').config({path:'.env'});

const fs = require('fs');
var styles = fs.readFileSync('./services/styles.css', 'utf8');
var options = { format: 'Legal' };

let months = ['ENERO', 'FEBERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO',
  'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

const HOST = process.env.HOST;
const PORT = process.env.PORT;

function renderPDF(contrato){
  return new Promise((resolve, reject)=>{
    var pdf = require('html-pdf');
    let test = "xd"
    var content = `
      <html>
      <head>
        <meta charset="utf-8">
        <title>Contrato</title>
        <style>
          ${styles}
        </style>
      </head>
      <body>
      <div class="DocHeader"> 
        <h4 class="DocTitle">CONTRATO DE COMPRA VENTA DE VEHICULO AUTOMOTOR</h3>
        <h5 class="DocLemma">Allex Motos - Cl 7 #123-45 Piendamó Cauca</h5>
      </div>
      <div class="DocBody">
        <div class="DocB1">
          <p>LUGAR Y FECHA DE CELEBRACIÓN DEL CONTRATO: ${contrato.place}, ${contrato.date}<p/>
          <table class="DocVehicleTable">
            <tr class="DocVehicleRow">
              <th class="DocVehicleColumn">
                <h4>Datos del vendedor</h4>
                <p class="DocDefP">
                  Nombre: ${contrato.seller_fullname}<br>
                  Identicicación: C.C. ${contrato.seller_id}<br>
                  Dirección: ${contrato.seller_address}</p>
              </th>
              <th class="DocVehicleColumn">
                <h4>Datos del comprador</h4>
                <p class="DocDefP">
                  Nombre: ${contrato.buyer_fullname}<br>
                  Identicicación: C.C. ${contrato.buyer_id}<br>
                  Domicilio contractual: ${contrato.buyer_address}</p>
              </th>
            </tr>
          </table>
          
          <p class="DocArticle">
            Las partes convienen celebrar el presente contrato de compraventa, que se regirá por las
            anteriores estípulaciones, las normas legales aplicables a la materia y en especial por las
            siguientes cláusulas: <b>PRIMERA.-<i> OBJETO DEL CONTRATO: </i></b> mediante el presente contrato,
            EL VENDEDOR transfiere a titulo de venta y EL COMPRADOR adquiere la propiedad del vehículo automotor
            que a continuación se identifica:
          </p>
          <table class="DocVehicleTable">
            <tr class="DocVehicleRow">
              <th class="DocVehicleColumn">
                <b>CLASE:</b> ${contrato.vehicle_class}
              </th>
              <th class="DocVehicleColumn">
                <b>MARCA:</b> ${contrato.vehicle_brand}
              </th>
              <th class="DocVehicleColumn">
                <b>MODELO:</b> ${contrato.vehicle_model}
              </th>
            </tr>
            <tr class="DocVehicleRow">
              <th class="DocVehicleColumn">
                <b>TIPO DE CARROCERÍA:</b> ${contrato.vehicle_carroceria}
              </th>
              <th class="DocVehicleColumn">
                <b>COLOR:</b> ${contrato.vehicle_color}
              </th>
              <th class="DocVehicleColumn">
                <b>NÚMERO DE MOTOR:</b> ${contrato.vehicle_motor_id}
              </th>
            </tr>
            <tr class="DocVehicleRow">
              <th class="DocVehicleColumn">
                <b>NÚMERO DE CHASIS:</b> ${contrato.vehicle_chasis_id}
              </th>
              <th class="DocVehicleColumn">
                <b>NÚMERO DE SERIES:</b> ${contrato.vehicle_series_id}
              </th>
              <th class="DocVehicleColumn">
                <b>PUERTAS:</b> ${contrato.vehicle_doors}
              </th>
            </tr>
            <tr class="DocVehicleRow">
              <th class="DocVehicleColumn">
                <b>CAPACIDAD:</b> ${contrato.vehicle_capacity}
              </th>
              <th class="DocVehicleColumn">
                
              </th>
              <th class="DocVehicleColumn">
                
              </th>
            </tr>
            <tr class="DocVehicleRow">
              <th class="DocVehicleColumn">
                <b>MANIFIESTO N°:</b> ${contrato.vehicle_acta_id}
              </th>
              <th class="DocVehicleColumn">
                <b>CIUDAD:</b> ${contrato.vehicle_city}
              </th>
              <th class="DocVehicleColumn">
                <b>FECHA:</b> ${contrato.vehicle_date}
              </th>
            </tr>
            <tr class="DocVehicleRow">
              <th class="DocVehicleColumn">
                <b>SITIO DE MATRICULA:</b> ${contrato.vehicle_place}
              </th>
              <th class="DocVehicleColumn">
                <b>NÚMERO DE PLACA:</b> ${contrato.vehicle_placa}
              </th>
              <th class="DocVehicleColumn">
                <b>SERVICIO:</b> ${contrato.vehicle_services}
              </th>
            </tr>
          </table>
          <p>
            <b><i>SEGUNDA.- PRECIO:</b></i> Como precio del automotor descrito las partes acuerdan la suma de
            $${contrato.price}
          </p>
          <p>
            <b><i>TERCERA.- OBLIGACIONES DEL VENDEDOR: EL VENDEDOR</b></i> hace entrega del vehiculo estado actual,
            libre de gravamenes, embargos, multas, impuestos, comparendos de tránsito, pactos de reserva de
            dominío y cualquiera otra circunstancia que afecte el libre comercio del bien objeto del presente
            contrato. Igualmente, EL VENDEDOR (o EL COMPRADOR) se obligan a realizar las gestiones de traspaso
            ante las autoridades de transido dentro de los <b>20</b> días hábiles posteriores a la firma del
            presente contrato.
          </p>
          <p>
            <b>QUINTA.-</b> El vendedor se reserva la propiedad del vehiculo hasta la cancelación total del mismo.
          </p>
          <p>
            <b><i>SEXTA.- EL COMPRADOR</b></i> se hace responsable por el uso y tenencia del vehiculo exonerando al
            propietario actual de multas, comparendos. El comprador declara haber recibido el vehiculo materia de 
            esta negociación a entera satisfacción y renuncia a cualquier tipo de reclamació mecánica ya que se trata de un
            vehiculo usado.
          </p>
          <h4 class="DocCenterTitle">CLAUSULA PENAL</h4>
          <p>
            El contratante que incumpliere alguna o varias de las clausulas aquí consignadas, pagará al contratante
            cumplido, a titulo de multa la suma de <b>${contrato.price*0.2}</b> la cual podrá hacerse efectiva desde el día
            siguiente a su incumplimiento o infracción, por la vía ejecutiva, sin que haya lugar a requerimiento, 
            ni constitución en mora.
          </p>
          <p>
            En constancia de lo anterior, los contratantes suscriben este documento ante testigos hábiles, en la ciudad
            de ${contrato.place} el día <b>${contrato.date.split('-')[2]}</b>, del mes de 
            <b>${months[Number(contrato.date.split('-')[1])]}</b>,
            del año <b>${contrato.date.split('-')[0]}</b>
          </p><br>
          <table class="DocVehicleTable">
            <tr class="DocVehicleRow">
              <th class="DocVehicleColumn">
                <p>
                  VENDEDOR<br><br><br>
                  ________________________________________________ <br>
                  C.C. No. ${contrato.seller_id}
                </p>
              </th>
              <th class="DocVehicleColumn">
                <p>
                  COMPRADOR<br><br><br>
                  ________________________________________________ <br>
                  C.C. No. ${contrato.buyer_id}
                </p>
              </th>
            </tr>
          </table>
          <p>
            <b>CLAUSULAS ADICIONALES:</b> ${contrato.clausula_adicional || ''}
          </p>
        </div>
      </div>
      </body>
      </html>
    `;

    let now = new Date();
    let timestamp = now.getTime();

    pdf.create(content, options).toFile('./assets/'+timestamp+'.pdf', (err, res)=>{
      if(err){
        reject(err);
      } else{
        resolve('http://'+HOST+':'+PORT+'/download?file='+timestamp+'.pdf');
      }
    });
  });
}

module.exports = {
  generatePDF : renderPDF
}