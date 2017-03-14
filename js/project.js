$( document ).ready(function() {

	$('.modify-btn').each(function(index) {
		var id = $(this).data('id');
		$(this).on("click", function() {
			$.ajax({
				url: "user_api.php",
				type: 'POST',
			    data: { id: id },
				success: function(data) {
	                $('#row_'+id).find('.access').html(data.count);
					$('#row_'+id).find('.modify').html(data.modify);
	            },
	            error: function(xhr, textStatus, thrownError, data) {
	                alert("Error: " + thrownError);
	            }
			});
		})
	})

});