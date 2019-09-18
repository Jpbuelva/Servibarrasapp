
function Cls_Pick() {

    this.ConsultarBahias = function () {
       
        var html = "";


            html += "<select id=\"CambioBahia\">" +
                "<option value=\"0\">Seleccione la bahia</option>";

            for (var i = 0; i < 6; i++) {
                html += "<option value=\"" + "bahia"+[i] + "\">" + "bahia"+[i] + "</option>";
            }

            html += "</select>";

            $("#SelectBahia").html(html);
            $('#ModalCambiarOrdenBahia').modal('show');
    }


    this.ConsultarProductos = function () {
                
        var html = "";

        html += "<select id=\"CambioProducto\">" +
            "<option value=\"0\">Seleccione el producto</option>";

        for (var i = 0; i < 10; i++) {
            html += "<option>productoCodigo"+[i] + "</option>";
        }

        html += "</select>";
        $("#txtfiltroproducto").val("");
        alert(html);
        $("#SelectProducto").html(html);
        $('#ModalCambiarOrdenProducto').modal('show');
                
    }
        
}

var Obj_Pick = new Cls_Pick();
// /*
//  Autor: Fraider Ferley Gutierrez Areiza
//  Fecha: 27 de Enero de 2018
//  Descripción:  Realiza Picking RFID
 
// Copyright (c) 2018 Gestisol S.A.S
// All Rights Reserved
 
//  */
// ///<summary>
// ///Clase despliegue de Picking RFID
// ///</summary>
// function Cls_Pick() {
//     ///<summary>
//     ///Acciones al ejecutar PostBack
//     ///</summary>
//     this.Acciones = {
//         /// <summary>
//         /// Consultar bandeja
//         /// </summary>
//         ConsultaBandeja: "ConsultaBandeja",
//         /// <summary>
//         /// Consultar captura
//         /// </summary>
//         ConsultarCaptura: "ConsultarCaptura",
//         /// <summary>
//         /// Capturar
//         /// </summary>
//         Capturar: "Capturar",
//         /// <summary>
//         /// Capturar Consultar Edicion
//         /// </summary>
//         ConsultarEdicion: "ConsultarEdicion",
//         /// <summary>
//         /// Cancelar Estiba
//         /// </summary>
//         CancelarEstiba: "CancelarEstiba",
//         /// <summary>
//         /// LeerRFID
//         /// </summary>
//         LeerRFID: "LeerRFID",
//         /// <summary>
//         /// ConsultarBahia
//         /// </summary>
//         ConsultarBahia: "ConsultarBahia",
//         /// <summary>
//         /// ConsultarBahia
//         /// </summary>
//         ConsultarProductos: "ConsultarProductos", 
//         /// <summary>
//         /// Dato
//         /// </summary>
//         Dato: "Dato",
//         /// <summary>
//         /// Novedad
//         /// </summary>
//         Novedad: "Novedad"
//     }

//     ///<summary>
//     /// Ruta solicitudes
//     ///</summary>
//     this.UrlRequest = "../../ASPXForm/PickingRFID/PickingRFID.ashx?GUID=" + ObjMenuUsuario.AtraparParametrorl("GUID") + '&Dcto=' + ObjMenuUsuario.AtraparParametrorl("Docto")

//     this.ProductoPreferencia = 0;
//     this.BahiaPreferencia = 0;
//     this.jsonProducto = null;
//     this.RuteoIdActivo = 0;
//     ///<summary>
//     ///Cargar Pagina
//     ///</summary>
//     this.CargarControl = function (valor) {
//         try {
//             $.ajax({
//                 url: Obj_Pick.UrlRequest,
//                 type: "POST",
//                 data: {
//                     accion: Obj_Pick.Acciones.Dato
//                 },
//                 success: function (res) {
//                     if (res == "") {
//                         $('#tabs a[href="#nav-cabeza"]').tab('show');
//                         $("#nav-captura").css("visibility", "");
//                     } else {
//                         Obj_Pick.SeleccionarRuteo();
//                         $('#tabs a[href="#nav-captura"]').tab('show');
//                         $("#nav-captura").css("visibility", "");
//                     }
//                 },
//                 error: function (res) {
//                     alert(res.statusText)
//                 }
//             });

//             Obj_Pick.ConsultaBandeja();
//             $('#tabs a[href="#nav-cabeza"]').tab('show');
//             $("#nav-captura").css("visibility", "");
//         } catch (e) {
//             alert(e);
//         }
//     }
//     /// <summary>
//     /// Consultar bandeja
//     /// </summary>
//     this.ConsultaBandeja = function () {
//         try {
//             document.getElementById("txtResultadoCabeza").innerHTML = "";
//             $.ajax({
//                 url: Obj_Pick.UrlRequest,
//                 type: "POST",
//                 data: {
//                     accion: Obj_Pick.Acciones.ConsultaBandeja
//                 },
//                 success: function (res) {
//                     res = eval(res);
//                     if (res.Error == true) {
//                         document.getElementById("txtResultadoCabeza").innerHTML = res.Mensaje;
//                     }
//                     else {
//                         var json = eval(res);
//                         Obj_Pick.Ruteos = json;

//                         var html = "";
//                         for (var i = 0; i < Obj_Pick.Ruteos.length; i++) {
//                             html += "<tr>";
//                             html += "<td>";
//                             html += "<button type='button' class='btn btn-primary btn-100 btn-lg ' onclick='javascript:Obj_Pick.SeleccionarRuteo(" + Obj_Pick.Ruteos[i].RuteoId + ");'>";
//                             html += Obj_Pick.Ruteos[i].RuteoConsecutivo;
//                             html += "</button>";
//                             html += "</td>";
//                             html += "</tr>";
//                         }

//                         if (Obj_Pick.Ruteos.length == 0) {
//                             document.getElementById("txtResultadoCabeza").innerHTML = "No se encontraron Ruteos para activos para el usuario";
//                         }

//                         $("#tblRuteosBody").html(html);
//                     }
//                 },
//                 error: function (res) {
//                     console.log(res.statusText)
//                 }
//             });


//         } catch (e) {
//             document.getElementById("txtResultadoCabeza").innerHTML = e;
//         }
//     }


//     /// <summary>
//     /// Consultar captura
//     /// </summary>
//     this.SeleccionarRuteo = function (ruteoId, limpiartxtRes) {
//         try {
//             document.getElementById("txtResultado").innerHTML = "";
//             if (ruteoId != -1) {
//                 Obj_Pick.RuteoIdActivo = ruteoId;
//             }
//             $.ajax({
//                 url: Obj_Pick.UrlRequest,
//                 type: "POST",
//                 data: {
//                     accion: Obj_Pick.Acciones.ConsultarCaptura,
//                     ruteoId: Obj_Pick.RuteoIdActivo,
//                     bahia: Obj_Pick.BahiaPreferencia,
//                     Producto: Obj_Pick.ProductoPreferencia
//                 },
//                 success: function (res) {

//                     if (res != "No hay mas registros para esta configuracion del picking") {
//                         res = (res == "(null)" ? ({}) : eval(res));
//                         if (res.Error == true) {
//                             if (limpiartxtRes == undefined) {
//                                 document.getElementById("txtResultado").innerHTML = res.Mensaje;

//                                 $("#txtUbi").html("00");
//                                 $("#txtUbiB").html("00");
//                                 $("#txtUbiA").html("00");
//                                 $("#txtUbiC").html("00");
//                                 $("#txtUbiM").html("00");
//                                 $("#txtUbiN").html("00");
//                                 $("#txtUbiF").html("00");
//                                 $("#txtUbiK").html("00");
//                                 $("#txtUbiP").html("00");

//                                 $("#txtRes").html("");
//                                 $("#divRes").css("display", "none");

//                             }
//                         }
//                         else {
//                             var json = eval(res);
//                             Obj_Pick.RuteoDetalle = json;

//                             if (json.RuteoId != null) {
//                                 $("#divUbi").css("display", "");
//                                 $("#divProd").css("display", "");
//                                 $("#divBtn").css("display", "");

//                                 $("#txtUbi").html(json.Ubicacion);
//                                 $("#txtUbiB").html(json.Ubicacion.length >= 2 ? json.Ubicacion.substr(0, 2) : "");
//                                 $("#txtUbiA").html(json.Ubicacion.length >= 4 ? json.Ubicacion.substr(2, 2) : "");
//                                 $("#txtUbiC").html(json.Ubicacion.length >= 6 ? json.Ubicacion.substr(4, 2) : "");
//                                 $("#txtUbiM").html(json.Ubicacion.length >= 8 ? json.Ubicacion.substr(6, 2) : "");
//                                 $("#txtUbiN").html(json.Ubicacion.length >= 10 ? json.Ubicacion.substr(8, 2) : "");
//                                 $("#txtUbiF").html(json.Ubicacion.length >= 12 ? json.Ubicacion.substr(10, 2) : "");
//                                 $("#txtUbiK").html(json.Ubicacion.length >= 14 ? json.Ubicacion.substr(12, 2) : "");
//                                 $("#txtUbiP").html(json.Ubicacion.length >= 16 ? json.Ubicacion.substr(14, 2) : "");

//                                 $("#txtProd").html(json.Presentacion);
//                                 if (limpiartxtRes == undefined) {
//                                     $("#txtRes").html("");
//                                     $("#divRes").css("display", "none");
//                                 } else {
//                                     $("#divRes").css("display", "");
//                                 }

//                                 $('#tabs a[href="#nav-captura"]').tab('show');
//                                 $("#nav-captura").css("visibility", "visible");
//                                 $("#btnCapturar").focus();

//                             }
//                             else {
//                                 $("#divUbi").css("display", "none");
//                                 $("#divProd").css("display", "none");
//                                 $("#divBtn").css("display", "none");
//                                 if (limpiartxtRes == undefined) {
//                                     $("#divRes").css("display", "none");
//                                 }
//                                 else {
//                                     $("#divRes").css("display", "");
//                                     $("#txtResultado").html($("#txtResultado").html() +
//                                         "<br/>Ruteo terminado")
//                                 }
//                             }
//                             $('#btnNovedad').attr("disabled", false);
//                         }
//                     } else {
//                         document.getElementById("txtResultado").innerHTML = res;
//                     }
//                 },
//                 error: function (res) {
//                     console.log(res.statusText)
//                 }
//             });


//         } catch (e) {
//             document.getElementById("txtResultado").innerHTML = e;
//         }
//     }

//     /// <summary>
//     /// Registrar captura
//     /// </summary>
//     this.Capturar = function (ruteoId) {
//         try {
//             $('#btnProcesar').attr("disabled", true);
//             ObjMenuUsuario.AbrirCargando("([]))", "Cargando datos...");
//             if (Obj_Pick.UbicacionCodigo != "") {
//                 $.ajax({
//                     url: Obj_Pick.UrlRequest,
//                     type: "POST",
//                     data: {
//                         accion: Obj_Pick.Acciones.Capturar,
//                         ruteoDetalleId: Obj_Pick.RuteoDetalle.RuteoDetalleId,
//                         presentacionId: Obj_Pick.RuteoDetalle.PresentacionId,
//                         UbicacionCodigoRFID: Obj_Pick.UbicacionCodigo
//                     },
//                     success: function (res) {
//                         res = eval(res);
//                         if (res.Error == true) {
//                             document.getElementById("txtResultado").innerHTML = res.Mensaje;
//                             $("#txtRes").html
//                             $("#divRes").css("display", "none");
//                             ObjMenuUsuario.CerrarCargando();
//                             $('#btnProcesar').attr("disabled", false);
//                         }
//                         else {
//                             ObjMenuUsuario.CerrarCargando();
//                             $('#btnProcesar').attr("disabled", false);
//                             parent.document.getElementById('ContenedorMenu').src = '../../HTMLForm/PackingRFID/PackingRFID.html?Docto1=' + ObjMenuUsuario.AtraparParametrorl('Docto') + '&Docto=' + ObjMenuUsuario.AtraparParametrorl('Docto1') + '&GUID=' + ObjMenuUsuario.AtraparParametrorl('GUID') + '&PuntoOperacionId=' + ObjMenuUsuario.AtraparParametrorl('PuntoOperacionId') + '&IdUsuario=' + ObjMenuUsuario.AtraparParametrorl('IdUsuario');
//                             /*  var html = "";
//                               document.getElementById("txtResultado").innerHTML = res.Mensaje;
//                               html += "RESULTADO<br/>";
//                               html += "UBICACIÓN<br/>";
//                               html += "<h4 style='margin: 0!important'>" + res.RespuestaUbicacion + "</h4>";
//                               html += "PRODUCTO<br/>";
//                               html += "<h4 style='margin: 0!important'>" + res.RespuestaProducto + "</h4>";
//                               html += "BAHÍA<br/>";
//                               html += "<!--<h4 style='margin: 0!important'>" + res.RespuestaBahia + "</h4>-->";
//                               html += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-12 text-center'>";
//                               html += "</div>";
//                               html += "<button type='button' class='btn btn-primary btn-lg btn-100' id='btnIrBahia' onclick=\"parent.document.getElementById('ContenedorMenu').src = '../../HTMLForm/PackingRFID/PackingRFID.html?Docto1=' + ObjMenuUsuario.AtraparParametrorl('Docto') + '&Docto=' + ObjMenuUsuario.AtraparParametrorl('Docto1') + '&GUID=' + ObjMenuUsuario.AtraparParametrorl('GUID') + '&PuntoOperacionId=' + ObjMenuUsuario.AtraparParametrorl('PuntoOperacionId') + '&IdUsuario=' + ObjMenuUsuario.AtraparParametrorl('IdUsuario');\">";
//                               html += "<h4 style='margin: 0!important;color:white'>" + res.RespuestaBahia + "</h4>";
//                               html += "</button>";
//                               $("#txtRes").html(html);
//                               $("#divRes").css("display", "");
//                               Obj_Pick.SeleccionarRuteo(res.RuteoId, false);
  
//                               var P = "00";
  
//                               $("#B").html(P);
  
//                               $("#A").html(P);
  
//                               $("#C").html(P);
  
//                               $("#M").html(P);
  
//                               $("#N").html(P);
  
//                               $("#F").html(P);
  
//                               $("#K").html(P);
  
//                               $("#P").html(P);
  
  
//                               Obj_Pick.UbicacionCodigo = "";*/
//                         }
//                     },
//                     error: function (res) {
//                         console.log(res.statusText)
//                         ObjMenuUsuario.CerrarCargando();
//                         $('#btnProcesar').attr("disabled", false);
//                     }
//                 });

//             } else {
//                 document.getElementById("txtResultado").innerHTML = "Debe capturar primero la ubicacion";
//                 ObjMenuUsuario.CerrarCargando();
//                 $('#btnProcesar').attr("disabled", false);
//             }
//         } catch (e) {
//             document.getElementById("txtResultado").innerHTML = e;
//             ObjMenuUsuario.CerrarCargando();
//             $('#btnProcesar').attr("disabled", false);
//         }
//     }

//     /// <summary>
//     /// Consultar bandeja
//     /// </summary>
//     this.ConsultarEdicion = function () {
//         try {
//             $.ajax({
//                 url: Obj_Pick.UrlRequest,
//                 type: "POST",
//                 data: {
//                     accion: Obj_Pick.Acciones.ConsultarEdicion
//                 },
//                 success: function (res) {
//                     res = eval(res);
//                     if (res.Error == true) {
//                         document.getElementById("txtResultadoCabeza").innerHTML = res.Mensaje;
//                     }
//                     else {
//                         var json = eval(res);
//                         var html = "";
//                         for (var i = 0; i < json.length; i++) {
//                             html += "<tr>";
//                             html += "<td style='min-width:130px !important'>";
//                             html += "<button type='button' class='btn btn-warning btn-100' onclick=\"javascript:Obj_Pick.CancelarPick('" + json[i].EstibaCodigo + "');\">";
//                             html += "<img src='../../Images/Utilidades/Eliminar.png'/ style='width:100%;max-width:32px'>"
//                             html += "</button>";
//                             html += "</td>";
//                             html += "<td>";
//                             html += json[i].ProductoNombre;
//                             html += "</td>";
//                             html += "<td>";
//                             html += json[i].EstibaCodigo;
//                             html += "</td>";
//                             html += "</tr>";
//                         }
//                         $("#tblEdicionBody").html(html);
//                         $('#tabs a[href="#nav-edicion"]').tab('show');
//                         $("#nav-edicion").css("visibility", "visible");
//                     }
//                 },
//                 error: function (res) {
//                     console.log(res.statusText)
//                 }
//             });


//         } catch (e) {
//             document.getElementById("txtResultadoCabeza").innerHTML = e;
//         }
//     }

//     /// <summary>
//     /// Registrar captura
//     /// </summary>
//     this.CancelarPick = function (estibaCodigo) {
//         try {
//             if (confirm("Esta seguro que desea cancelar la linea?")) {
//                 $.ajax({
//                     url: Obj_Pick.UrlRequest,
//                     type: "POST",
//                     data: {
//                         accion: Obj_Pick.Acciones.CancelarEstiba,
//                         estibaCodigo: estibaCodigo
//                     },
//                     success: function (res) {
//                         res = eval(res);
//                         document.getElementById("txtResultadoElm").innerHTML = res.Mensaje;
//                         if (res.Error == true) {
//                             Obj_Pick.ConsultarEdicion();
//                         }
//                     },
//                     error: function (res) {
//                         console.log(res.statusText)
//                     }
//                 });
//             }
//         } catch (e) {
//             document.getElementById("txtResultadoElm").innerHTML = e;
//         }
//     }

//     this.LeerRFID = function () {
//         try {
//             Obj_Pick.UbicacionCodigo = "";
//             $.ajax({
//                 url: Obj_Pick.UrlRequest,
//                 type: "POST",
//                 data: {
//                     accion: Obj_Pick.Acciones.LeerRFID
//                 },
//                 success: function (res) {
//                     res = eval(res);
//                     if (res.Error == true) {
//                         $("#txtResultadoElm").html("No se capturo ubicacion");

//                         Obj_Pick.UbicacionCodigo = "";
//                         $("#txtResultadoElm").html(res.Mensaje);
//                     } else {
//                         $("#txtResultadoElm").html(res.Mensaje);
//                         var codigo = res.antena1;

//                         codigo = codigo.substring(4);

//                         Obj_Pick.UbicacionCodigo = codigo;

//                         var B = codigo.substring(0, 2);

//                         var A = codigo.substring(2, 4);

//                         var C = codigo.substring(4, 6);

//                         var M = codigo.substring(6, 8);

//                         var N = codigo.substring(8, 10);

//                         var F = codigo.substring(10, 12);

//                         var K = codigo.substring(12, 14);

//                         var P = codigo.substring(14, 16);


//                         $("#B").html(B);

//                         $("#A").html(A);

//                         $("#C").html(C);

//                         $("#M").html(M);

//                         $("#N").html(N);

//                         $("#F").html(F);

//                         $("#K").html(K);

//                         $("#P").html(P);
//                     }
//                 },
//                 error: function (res) {
//                     alert(res.statusText)
//                 }
//             });
//         } catch (e) {
//             document.getElementById("txtResultadoElm").innerHTML = e;
//         }
//     }

//     /*this.ConsultarBahias = function () {
//         try {
//             var html = "";

//             $.ajax({
//                 url: Obj_Pick.UrlRequest,
//                 type: "POST",
//                 data: {
//                     accion: Obj_Pick.Acciones.ConsultarBahia,
//                     ruteoId: Obj_Pick.RuteoIdActivo
//                 },
//                 success: function (res) {
//                     res = eval(res);
//                     html += "<select id=\"CambioBahia\">" +
//                         "<option value=\"0\">Seleccione la bahia</option>";

//                     for (var i = 0; i < res.length; i++) {
//                         html += "<option value=\"" + res[i].UbicacionId + "\">" + res[i].UbicacionNombre + "</option>";
//                     }

//                     html += "</select>";

//                     $("#SelectBahia").html(html);
//                     $('#ModalCambiarOrdenBahia').modal('show');
//                 },
//                 error: function (res) {
//                     alert(res.statusText)
//                 }
//             });

//         } catch (e) {
//             document.getElementById("txtResultadoElm").innerHTML = e;
//         }

//     }*/

//     this.ConsultarBahias = function () {
         
//         alert("entre");
//         var html = "";

    
//             html += "<select id=\"CambioBahia\">" +
//                 "<option value=\"0\">Seleccione la bahia</option>";

//             for (var i = 0; i < 3; i++) {
//                 html += "<option value=\"" + "bahia"+[i] + "\">" + "bahia"+[i] + "</option>";
//             }

//             html += "</select>";

//             $("#SelectBahia").html(html);
//             $('#ModalCambiarOrdenBahia').modal('show');
//     }

//     this.ConsultarProductos = function () {
//         try {
//             var html = "";

//             $.ajax({
//                 url: Obj_Pick.UrlRequest,
//                 type: "POST",
//                 data: {
//                     accion: Obj_Pick.Acciones.ConsultarProductos,
//                     ruteoId: Obj_Pick.RuteoIdActivo,
//                     bahia: Obj_Pick.BahiaPreferencia
//                 },
//                 success: function (res) {
//                     Obj_Pick.jsonProducto = res;
//                     res = eval(res);

//                     html += "<select id=\"CambioProducto\">" +
//                         "<option value=\"0\">Seleccione el producto</option>";

//                     for (var i = 0; i < res.length; i++) {
//                         html += "<option value=\"" + res[i].ProductoId + "\">" + res[i].productoCodigo + " " + res[i].ProductoNombre + "</option>";
//                     }

//                     html += "</select>";
//                     $("#txtfiltroproducto").val("");
//                     $("#SelectProducto").html(html);
//                     $('#ModalCambiarOrdenProducto').modal('show');
//                 },
//                 error: function (res) {
//                     alert(res.statusText)
//                 }
//             });

//         } catch (e) {
//             document.getElementById("txtResultadoElm").innerHTML = e;
//         }

//     }


//     this.CambiarBahia = function () {
//         Obj_Pick.BahiaPreferencia = $("#SelectBahia").val();
//         Obj_Pick.SeleccionarRuteo(-1);
//     }

//     this.CambiarProducto = function () {
//         Obj_Pick.ProductoPreferencia = $("#SelectProducto").val();
//         Obj_Pick.SeleccionarRuteo(-1);
//     }

//     this.LimpiarFiltros = function () {
//         Obj_Pick.ProductoPreferencia = 0;
//         Obj_Pick.BahiaPreferencia = 0;
//         Obj_Pick.SeleccionarRuteo(-1);
//     }
    
//     this.FiltrarProducto = function () {
//         var html = "";

//         var res;
//            res = eval(Obj_Pick.jsonProducto);
//         $("#SelectProducto").html(html);

//         html += "<select id=\"CambioProducto\">" +
//             "<option value=\"0\">Seleccione el producto</option>";
        
//         for (var i = 0; i < res.length; i++) {
//             if (res[i].productoCodigo.indexOf($("#txtfiltroproducto").val().toUpperCase()) > -1 || res[i].ProductoNombre.indexOf($("#txtfiltroproducto").val().toUpperCase()) > -1 || $("#txtfiltroproducto").val()==""){
//                  html += "<option value=\"" + res[i].ProductoId + "\">" + res[i].productoCodigo + " " + res[i].ProductoNombre + "</option>";
//             }   
//         }

//         html += "</select>";
        
//         $("#SelectProducto").html(html);

//     }

//     this.GenerarNovedad = function () {
//         try {
//             $('#btnNovedad').attr("disabled", true);
//             ObjMenuUsuario.AbrirCargando("([]))", "Cargando datos...");
//             $.ajax({
//                 url: Obj_Pick.UrlRequest,
//                 type: "POST",
//                 data: {
//                     accion: Obj_Pick.Acciones.Novedad,
//                     ruteoId: Obj_Pick.RuteoIdActivo
//                 },
//                 success: function (res) {

//                     res = eval(res);

//                     ObjMenuUsuario.CerrarCargando();
//                     alert(res.Mensaje);
//                     if (res.Error == true) {

//                         $('#lblResultadoError').html("Error: " + res.Mensaje);


//                     }
//                     else {

//                         $('#lblResultado').html(res.Mensaje);

//                     }
//                     Obj_Pick.SeleccionarRuteo(-1);

//                 },
//                 error: function (res) {
//                     alert(res.statusText)
//                     $('#btnNovedad').attr("disabled", false);
//                 }
//             });
//         } catch (e) {

//             ObjMenuUsuario.CerrarCargando();
//             document.getElementById("txtResultadoElm").innerHTML = e;
//             $('#btnNovedad').attr("disabled", false);
//         }

//     }

// }
// ///<summary>
// /// Objeto de la clase Cls_Pick
// ///</summary>
// var Obj_Pick = new Cls_Pick();
