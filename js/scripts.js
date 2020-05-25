$(document).ready(function(){


})

$('.add-to-cart button').click(function(){
	
	if($(this).parent().find('input').val()>0){
		permiso=true;
		cantidad=$(this).parent().find('input').val();
		id=$(this).parent().attr('data-id');
			
		if($('.shopping-cart table .id-product').length!=0){
	
			$('.shopping-cart table .id-product').each(function(){
					if($(this).text()==id){
						permiso=false;
						cantTotal=parseInt($('.id-'+id).parent().find('.cant').text().replace('Cantidad: ','')) + parseInt(cantidad);
						$('.id-'+id).parent().find('.cant').text('Cantidad: '+cantTotal.toString());
					}
			})
			
		}	
				
		if(permiso){
			
				$('.mensaje p').hide(500)
				$('.shopping-cart table').prepend('<tr><td><img src="'+ $(this).parent().parent().find('picture img:nth-child(1)').attr('src')+'" style="width: 80px;margin: auto;" /></td> <td> <div>' + $(this).parent().parent().find('.nombre').text()+ '</div> <div class="price">'+$(this).parent().parent().find('.precio').text()+'</div> <div class="cant">Cantidad: '+$(this).parent().find('input').val()+'</div> </td><td style="display:none" class="id-product id-'+id+' ">'+id+'</td> <td><img src="img/delete.png" alt="" style="cursor:pointer; width: 25px" class="delete-'+id+'" /></td></tr>')
				
				$('.delete-'+id).click(function(){
					$(this).parent().parent().remove();
					subtotal()
				})
				
				$(this).parent().find('input').val('0')
				$(this).parent().parent().find('.mensaje').html('<p>Producto agregado con exito</p>')
				$(this).parent().parent().find('.mensaje p').show(500);
				setTimeout(function(){
					$('.mensaje p').hide(500)
				}, 2500);
		}else{
			$(this).parent().parent().find('input').val('0');
						$(this).parent().parent().find('.mensaje').html('<p>Se ha añadido la cantidad seleccionada</p>');
						$(this).parent().parent().find('.mensaje p').show(500);
						setTimeout(function(){
							$('.mensaje p').hide(500)
						}, 2500);
		}
		
		subtotal()
	
	}else{
		
		$(this).parent().parent().find('.mensaje').html('<p>Ingrese una cantidad válida</p>')
		$(this).parent().parent().find('.mensaje p').show(500);
		setTimeout(function(){
			$('.mensaje p').hide(500)
		}, 2500);
		
	}
})


function subtotal(){
	total=0
	$('.shopping-cart table .price').each(function(){
		valor=parseInt($(this).text().replace('$','').replace('.',''))
		cantidadProducto=parseInt($(this).parent().find('.cant').text().replace('Cantidad: ',''))
		subtotalP=cantidadProducto*valor;
		total+=subtotalP;
	})
	
	total=total.toString()
	if(total.length<=6 && total.length>3){
		totalCopy=total.slice(-3);
		total= total.slice(0,-3)+'.'+totalCopy;
	}else if(total.length>6){		
		totalCopy=total.slice(-3);
		total= total.slice(0,-3)+'.'+totalCopy;
		totalCopy="'"+total.slice(-7);
		total= total.slice(0,-7)+totalCopy
	}
	$('.subtotal-val, .total').text('$'+total)
}


$('.newsletter button').click(function(){
	
		emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
		if($('.newsletter input.nombre').val().trim()){
			if (emailRegex.test($('.newsletter .correo').val())) {
				$('.newsletter .red-back').html('<div style="color: white; font-size: 25px; line-height: 80px; vertical-align: middle;">¡Muchas gracias por suscribirte!</div>')
			} else {
				$('.mensaje').addClass('error').html('¡Por favor ingresa un correo válido!');
				setTimeout(function(){$('.mensaje').html('').removeClass('error')},2500);
			}			
		}else {
				$('.mensaje').addClass('error').html('¡Por favor ingresa los datos faltantes!');
				setTimeout(function(){$('.mensaje').html('').removeClass('error')},2500);
			}			
})

$('.menu').click(function(){
	$('nav, .sombra').toggleClass('active');
	$('.shopping-cart').fadeOut()
})
$('.sombra').click(function(){
	$('nav, .sombra').removeClass('active')
	$('.shopping-cart').fadeOut()
})

$('.shopping-cart-mob').click(function(){
	$('body').append($('.shopping-cart'));
	$('.shopping-cart').fadeToggle();
	$('nav, .sombra').removeClass('active')
})











