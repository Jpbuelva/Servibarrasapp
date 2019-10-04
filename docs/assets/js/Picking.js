
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
                
        // var html = "";

        // html += "<select id=\"CambioProducto\">" +
        //     "<option value=\"0\">Seleccione el producto</option>";

        // for (var i = 0; i < 10; i++) {
        //     html += "<option>productoCodigo"+[i] + "</option>";
        // }

        // html += "</select>";
        // $("#txtfiltroproducto").val("");       
        // $("#SelectProducto").html(html);
        $('#ModalCambiarOrdenProducto').modal('show');
                
    }
        
}

var Obj_Pick = new Cls_Pick();