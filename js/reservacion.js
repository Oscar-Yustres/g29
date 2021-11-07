function consultar(){
    $.ajax({
        url: 'http://168.138.144.131:80/api/Reservation/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#cuerpoTabla').empty();
            $.each(data, function(index, value){
                $('#cuerpoTabla').append(
                    '<tr>'+
                        '<td>'+value.idReservation+'</td>'+
                        '<td>'+value.startDate+'</td>'+
                        '<td>'+value.devolutionDate+'</td>'+
                        '<td>'+value.status+'</td>'+
                        //'<td>'+value.machine.name+'</td>'+
                        //'<td>'+value.client.name+'</td>'+
                        '<td>'+value.score+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-info" onclick="editar('+value.idReservation+')">Editar</button>'+
                            '</td>'+
                    '</tr>'
                );
            });
        }
    });
}
function consultarClientes(){
    $.ajax({
        url: 'http://168.138.144.131:80/api/Client/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#client').append('<option value="0">Seleccione un Cliente</option>');
            $.each(data, function(index, value){
                $('#client').append(
                    '<option value="'+value.idClient+'">'+value.name+'</option>'
                );
            });
        }
    });
}

function consultarMaquinaria(){
    $.ajax({
        url: 'http://168.138.144.131:80/api/Machine/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#machine').append('<option value="0">Seleccione una Maquina</option>');
            $.each(data, function(index, value){
                $('#machine').append(
                    '<option value="'+value.id+'">'+value.name+'</option>'
                );
            });
        }
    });
}


$("#btnAgregarReservacion").click(function(){
    console.log("hola");
    //http://'+window.location.host+'/api/Machine/add
    if($('#startDate').val() == ""){
        alert("La fecha de inicio es necesaria");
    }else{
        var startDate = $('#startDate').val();
        var devolutionDate = $('#devolutionDate').val();
        var status = $('#status').val();
        //var machine = $('#machine').val();       
        //var client = $('#client').val();
        //var score = $('#score').val();
        var data = {
            startDate: startDate,
            devolutionDate: devolutionDate,
            status: status,
            machine: {
               id: machine
            },
            client: {
                id: client
            }
            //score: score
        
        };
        $.ajax({
            url: 'http://168.138.144.131:80/api/Reservation/save',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: {
                201: function(data){
                    $('#startDate').val('');
                    $('#devolutionDate').val('');
                    $('#status').val('');
                    $('#client').val(0);
                    $('#machine').val(0);
                    // $('#score').val(0);
                    consultar();
                },
                415: function(data){
                    alert("Error en los datos");
                }
            }
        });
    }
});


$(document).ready(function(){
    consultar();
    consultarClientes();
    consultarMaquinaria();
});