function consultar(){
    $.ajax({
        url: 'http://168.138.144.131:80/api/Client/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#cuerpoTabla').empty();
            $.each(data, function(index, value){
                $('#cuerpoTabla').append(
                    '<tr>'+
                        '<td>'+value.idClient+'</td>'+
                        '<td>'+value.name+'</td>'+
                        '<td>'+value.email+'</td>'+
                        '<td>'+value.age+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-info" onclick="editar('+value.idClient+')"> <i class="fa fa-pencil"></i>Editar</button>'+
                            '<button type="button" class="btn btn-danger" onclick="eliminar('+value.idClient+')"><i class="fa fa-times"></i>Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}


$("#btnAgregarCliente").click(function(){
    console.log("hola");
    //http://'+window.location.host+'/api/Machine/add
    if($('#name').val() == "" || $('#email').val() == "" || $('#password').val() == "" || $('#description').val() == "" || $('#category').val() == "0"){
        alert("Todos los campos son obligatorios, excepto el ID");
    }else{
        var name = $('#name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var age = $('#age').val();
        var data = {
            name: name,
            email: email,
            password: password,
            age: age
        
        };
        $.ajax({
            url: 'http://168.138.144.131:80/api/Client/save',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: {
                201: function(data){
                    $('#name').val('');
                    $('#email').val('');
                    $('#year').val('');
                    $('#password').val('');
                    $('#age').val();
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
    consultarCatgorias();
});