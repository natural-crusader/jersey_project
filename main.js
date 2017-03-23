var selected_seat;
var viewing_seat;
var seats = [];

/** filters **/

$(function() {

	function filter_age(data) {
		var sel = data.data.param;
		var c_old = $('#old').is(':checked');
		var c_young = $('#young').is(':checked');
		var c_mid = $('#mid').is(':checked');
	
		if($('#'+sel).is(':checked')) {
			$('.profile').each(function() {
				$(this).removeClass('age_'+sel);
			});
			if(!c_young) {
				$('[data-age_young="1"]').each(function() {
					$(this).addClass('age_young');
				});
			};
			if(!c_mid) {
				$('[data-age_mid="1"]').each(function() {
					$(this).addClass('age_mid');
				});
			};
			if(!c_old) {
				$('[data-age_old="1"]').each(function() {
					$(this).addClass('age_old');
				});
			};
			
		} else {
			if((sel == 'young' && (c_mid || c_old)) ||
			   (sel == 'mid' && (c_young || c_old)) ||
			   (sel == 'old' && (c_young || c_mid))) {
				// don't show the ones that are this one
				$('[data-age_'+sel+'="1"]').each(function() {
					$(this).addClass('age_'+sel);
				});
			} else {
				$('.profile').each(function() {
					$(this).removeClass('age_young age_mid age_old');
				});
			};
		};
	};

	function filter_gender(data) {
		var gen = data.data.param;

		var c_male = $('#male').is(':checked');
		var c_female = $('#female').is(':checked');


		if($('#'+gen).is(':checked')) {
			$('.profile').each(function() {
				$(this).removeClass('gender_'+gen);
			});
			if(!c_male) {
				$('[data-gender="Male"]').each(function() {
					$(this).addClass('gender_male');
				});
			};
			if(!c_female) {
				$('[data-gender="Female"]').each(function() {
					$(this).addClass('gender_female');
				});
			};
		} else {
			if((gen == 'male' && c_female) || (gen == 'female' && c_male)) {
				// then don't show ones that have this one
				var gen2 = gen.substr(0,1).toUpperCase()+gen.substr(1);
				$('[data-gender="'+gen2+'"]').each(function() {
					$(this).addClass('gender_'+gen);
				});
			}else {
				$('.profile').each(function() {
					$(this).removeClass('gender_male gender_female');
				});
			}
		}
	}

	$('#young').on("click", {param: 'young'}, filter_age);

	$('#mid').on("click", {param: 'mid'}, filter_age);

	$('#old').on("click", {param: 'old'}, filter_age);

	$('#male').on("click", {param: 'male'}, filter_gender);

	$('#female').on("click", {param: 'female'}, filter_gender);
})

/** end filters **/

/** those selected most often should be listed first **/

$(function(){
	$('.close').bind("click", function(event) {
		$(this).parent().parent().parent().addClass('hidden');
		$("body").removeClass("modal-open");
		 $('#view_profile').addClass('hidden');
		$('.profiles').removeClass('hidden');
		$('.modal-header').removeClass('hidden');
		$('.modal-footer').removeClass('hidden');
	});

	$('#view_profile').on("click", ".return_to_list", function(event) {
		$('#myModal').addClass('hidden');
		$("body").removeClass("modal-open");
		$('#view_profile').addClass('hidden');
		$('.profiles').removeClass('hidden');
		$('.modal-header').removeClass('hidden');
		$('.modal-footer').removeClass('hidden');
	});


});

window.onclick = function(event) {
    if (event.target.id == 'myModal') {
    	$("body").removeClass("modal-open");
    	 $('#myModal').addClass('hidden');
    	 $('#view_profile').addClass('hidden');
		$('.profiles').removeClass('hidden');
		$('.modal-header').removeClass('hidden');
		$('.modal-footer').removeClass('hidden');
    };
};


/** select profile for a seat **/
// open filter / profile selection
$(function(){
  $(".table .seat .pic").bind("click", function (event) {
    // alert($(this).parent().parent().attr('id'));
    //$(this).parent().addClass('caution');
    var id = $(this).parent().data('seat-id');
    selected_seat = id;
    // hide "table" and overlay search

    $('#myModal').removeClass('hidden');
    $("body").addClass("modal-open");
  });
});

// view profile 

$(function(){

	function ajax_update_profile(data, callback) { // add callback
		var url = 'http://villainpoker.club/classes/api/updateprofile.php';
		$.ajax({
			url: url,
			data: data,
			success: callback,
			method: 'POST'
		});
	}

	var view_profile  = $('#view_profile');

	view_profile.on("click", '#add_name', function(event) {

		event.preventDefault();
		var callback = function() {}; // create call back
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'name', value: $('#vp_name').val(), new: 1}, callback);
	});

	view_profile.on("change", "input[name='vp_names']:radio", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'names', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_ages']", function(event) {
		// send new age
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'age', value: $(this).val()},callback);
	});

	view_profile.on("click", "#add_keywords", function(event) {
		event.preventDefault();
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'keywords', value: $('#vp_keywords').val()}, callback);
	});

	view_profile.on("change", "input[name='vp_skill']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'skill', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_aggressive']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'aggression', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_range']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'range', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_straightforward']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'straightforward', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_slow']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'slow', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_drawing']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'draw', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_bettingpattern']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'bettingPattern', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_callingpattern']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'callingPattern', value: $(this).val()}, callback);
	});

	view_profile.on("click", '#add_tell', function(event) {
		event.preventDefault();
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'tell', value: $('#vp_tells').val()}, callback);
	});

	view_profile.on("change", "input[name='vp_limp']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'limp', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_limpcall']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'limpCall', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_callraisepre']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'callRaise', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_raisepre']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'raisePre', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_reraisepre']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'reraisePre', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_foldto4betpre']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'foldTo4betPre', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_cbetflop']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'cbetFlop', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_callcbetflop']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'callCbetFlop', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_raisecbetflop']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'raiseCbetFlop', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_betturnafterbetflop']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'betTurnAfterBetFlop', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_betturnwhencbetterckturn']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'betTurnWhenCbetterCkTurn', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_raiseturncbet']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'raiseTurnCbet', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_betrivturnckthrough']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'betRivTurnCkThrough', value: $(this).val()}, callback);
	});

	view_profile.on("change", "input[name='vp_betrivwhenturnbetterck']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'betRivWhenTurnBetterCk', value: $(this).val()}, callback);
	});
	
	view_profile.on("change", "input[name='vp_reraiseriver']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'reraiseRiver', value: $(this).val()}, callback);
	});

	view_profile.on("click", '.vp_location', function(event) {

		event.preventDefault();
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'location', value: $(this).val()}, callback);
	});

	view_profile.on("click", "input[name='details_image']", function(event) {
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'picture', value: $(this).val()}, callback);
	});

	view_profile.on("click", '#add_image', function(event) {
		event.preventDefault();
		var callback = function() {};
		ajax_update_profile({id: seats[viewing_seat].id, attribute: 'image', value: $('#vp_base64').val()}, callback);
	});

	view_profile.on("change", '#vp_newfile', function(e) {
		/* upload new pic */
		e.preventDefault();

		handleDrop2(e.target.files);
		
	});

	handleDrop2 = function(files){
		console.log('handling drop2');
		if(files !== undefined) {
			var file = files[0]; // Multiple files can be dropped. Lets only deal with the "first" one.
			if (file.type.match('image.*')) {
				resizeImage(file, 300, function(result) {
					$('#vp_preview').attr('src', result);
					//alert(result.replace(/^data:image\/(png|jpg);base64,/, ""));
					$('#vp_base64').val(result.replace(/^data:image\/(png|jpg);base64,/, ""));


					// make sure add image to the list of images and to select it as the 'voted one'
				});
			} else {
				alert("That file wasn't an image.");
			}
		}
	};


	$(".details").on("click", function(event){
		var seat = $(this).parent().data('seat-id');
		viewing_seat = seat;
		if(seats[seat] != undefined) {

			// clear the form and preview
			// $('#view_profile_form').trigger('reset');
			// $('#vp_preview').attr('src', '');

			// load in everything -- there will be more than what is there already
			// you have extra names and images
			$.ajax({
		    	url: 'http://villainpoker.club/classes/api/details.php',
			    data: {id: seats[seat].id},
			    success: function(data) {
			    	
			    	var view_profile = $('#view_profile');
			    	view_profile.html(data);

			        view_profile.removeClass('hidden');
					$('.profiles').addClass('hidden');
					$("body").addClass("modal-open");
					$('.modal-header').addClass('hidden');
					$('.modal-footer').addClass('hidden');

					$('#myModal').removeClass('hidden');
					
			    },
			    type: 'GET'	
	    	});
		} 
	});
});

// select a profile for the seat
$(function(){
	var profile_list = $('#profile_list');
	profile_list.on("click", '.delete', function(event) {
		event.stopPropagation();
		event.preventDefault();
		var pid = $(this).data('profile_id');
		var self = this;
		$.ajax({
	    	url: 'http://villainpoker.club/classes/api/delete.php',
		    data: {id: pid},
		    success: function(data) {
		    	//console.log(data);

		    	if(data.success = 1) {
		 		    //$(".content").find("[data-profile='" + pid + "']").toggle();
		 		    $(self).parent().closest('div').toggle();
		 		} else {
		 			alert('error');
		 		}
				
		    },
		    dataType: 'json',
		    type: 'POST'	
	    });

	    // return false
	});


	profile_list.on("click", ".profile", function(event) {
		//alert($(this).data('profile'));
		// set the profile to the seat

		// update the seat with the profile
			var seat = $('[data-seat-id="'+selected_seat+'"]');
			
			seat.find('.pic').html($(this).html());

			// add data for the other part
			var pid = $(this).data('id');
			if(pid == undefined) {
				pid = $(this).data('profile');
			}
			
			$.ajax({
		    	url: 'http://villainpoker.club/classes/api/profile.php',
			    data: {id: pid},
			    success: function(data) {
			    	//console.log(data);
			    	var my_data = data.my_profile;
			    	var avg_data = data.profile;

			    	var multiplier = 20;

			    	if(my_data != undefined) {
				    	seat.addClass('skill'+my_data.skill);
				        seat.find('.name span').html(my_data.name);
				        seat.find('.aggressive .mine').css('left', my_data.aggression * multiplier+'px');

				        seat.find('.range .mine').css('left', my_data.range * multiplier+'px');
				        seat.find('.tricky .mine').css('left', my_data.tricky * multiplier+'px');
				        seat.find('.slowplay .mine').css('left', my_data.slowplay * multiplier+'px');
				        seat.find('.drawing .mine').css('left', my_data.drawing * multiplier+'px');
				        seat.find('.bettingpat label').html('filter_'+my_data.betting);
				        seat.find('.callingpat label').html('filter_'+my_data.calling);
				        seat.find('.foldpre .mine').css('left', my_data.foldpre * multiplier+'px');
				        seat.find('.reraisepre .mine').css('left', my_data.reraisepre * multiplier+'px');
				        seat.find('.cbets .mine').css('left', my_data.cbet * multiplier+'px');
					}	
					if(avg_data != undefined) {
						avg_data.id = pid;
				        seat.find('.tells').html(avg_data.tells);
						seat.find('.aggressive .avg').css('left', avg_data.aggression * multiplier+'px');
				        seat.find('.range .avg').css('left', avg_data.range * multiplier+'px');
				        seat.find('.tricky .avg').css('left', avg_data.tricky * multiplier+'px');
				        seat.find('.slowplay .avg').css('left', avg_data.slowplay * multiplier+'px');
				        seat.find('.drawing .avg').css('left', avg_data.drawing * multiplier+'px');
				        seat.find('.foldpre .avg').css('left', avg_data.foldpre * multiplier+'px');
				        seat.find('.reraisepre .avg').css('left', avg_data.reraisepre * multiplier+'px');
				        seat.find('.cbets .avg').css('left', avg_data.cbet * multiplier+'px');
		

						seats[selected_seat] = avg_data;
					} else  {
						seats[selected_seat] = my_data;
					}
			    },
			    dataType: 'json',
			    type: 'GET'	
		    });

			// use ajax to get the data needed ?
			$('#myModal').addClass('hidden');
			$("body").removeClass("modal-open");
		
	});
});


$(function() {
	$("#addlocation").bind("click", function(event) {
		$('#location_form').slideToggle(400);
	});
});

/** end select profile for a seat **/

/** geo location **/

$(function() {
	$("#getcurrentlocation").bind("click", function(event) {
		if(myPosition == null) {
			if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(showPosition);
		    } else {
		        //x.innerHTML = "Geolocation is not supported by this browser.";
		        $(this).html("Cannot get location");
		    }
		}
	});
});

var myPosition;
if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
	myPosition = position;
	$("#lat").val(position.coords.latitude.toFixed(3));
	$("#long").val(position.coords.longitude.toFixed(3));


	$.ajax({
    	url: 'http://villainpoker.club/classes/api/location.php',
	    data: $("#new_location_form").serialize(),
	    success: function(data) {
	    	if(typeof data.error !== 'undefined') {
	    		$("#matched").addClass('hidden');
				$("#notmatched").removeClass('hidden');
				$("#info").html(data.error);
	    	} else {
	    		$("#matched").removeClass('hidden');
				$("#notmatched").addClass('hidden');

				$('#matched_location').html(data.name+', '+data.city);
	    	}
	        
	    },
	    dataType: 'json',
	    type: 'POST'	
    });
};

$(function() {
	$('#getcurrentlocation').bind("click", function(event) {
		// if (navigator.geolocation) {
  //       	navigator.geolocation.getCurrentPosition(showPosition);
		// }
		$("#matched").addClass('hidden');
		$("#notmatched").removeClass('hidden');
				
	});
});

function locationAction() {
	$(this).removeClass("act-success");
	$(this).addClass("act-loading");


/* do ajax here to create new location - on return do checkmark or not.  
Also, update locations selections options if successful */

    $.ajax({
    	url: 'http://villainpoker.club/classes/api/location.php',
	    error: function() {
  			$('#info').html('<p>An error has occurred</p>');
			},
	    dataType: 'json',
	    data: $("#new_location_form").serialize(),
	    success: function(data) {
	        
			if(typeof data.error !== 'undefined') {
	    		$("#matched").addClass('hidden');
				$("#notmatched").removeClass('hidden');
				$("#info").html(data.error);
	    	} else {
	    		setTimeout(function() {
					$('#location_form').slideToggle(400);
				}, 200);
				$('#success').removeClass("act-loading");


				$('#locations').prepend($("<option value='"+data.name+"' selected='selected'>"+data.name+" "+data.city+"</ option>"));

	    		$("#matched").removeClass('hidden');
				$("#notmatched").addClass('hidden');

				$('#matched_location').html(data.name+', '+data.city);
	    	}

	    },
	    type: 'POST'	
    });
};

$(function() {
	$('#success').bind("click", locationAction);
});

/** end geo location **/

/** new profile modal **/


$(function() {
	$('#create_new').bind("click", function() {
		$('.profiles').slideToggle();
		$('#new_profile').slideToggle();
	})

	$('.return_to_list').bind("click", function() {
		$('.profiles').slideToggle();
		$('#new_profile').slideToggle();
		$("#myModal").animate({ scrollTop: 0 }, "slow");
 

		//todo send data to server to remove img
	})

	$('.save_profile').bind("click", function(e) {
		// save profile get all data and send it
		e.preventDefault();
		var form = $('#new_profile_form');
	    var formdata = false;
	    if (window.FormData){
	        formdata = new FormData(form[0]);
	    }

		//var the_data = new FormData($('#new_profile_form')[0]);
		$.ajax({
			url: "classes/api/ajax_new_profile.php", 
			type: "POST",             
			data: formdata ? formdata : form.serialize(), 
			contentType: false,       
			cache: false,             
			processData:false,        
			success: function(data)   
			{
				$('#loading').hide();
				//$("#message").html(data);

				var preview = $("#preview");
				var x;
				if(isNaN(data) ? !1 : (x = parseFloat(data), (0 | x) === x)){
					alert('adding new profile');
				   $('#profile_list').prepend("<div class='profile' data-profile='"+data+"'><img src='"+$("#preview").attr('src')+"'></div>");
				}

				$('.profiles').slideToggle();
				$('#new_profile').slideToggle();
				$("#myModal").animate({ scrollTop: 0 }, "slow");
 				
 				$('#new_profile_form').trigger('reset');
 				$('#preview').attr('src', '');
			}
		});
	})
})

/** image resizing **/

$(function() {
	$('#newfile').on("change", function(e) {
		/* upload new pic */
		e.preventDefault();

		handleDrop(e.target.files);
		
	});

	handleDrop = function(files){
		var file = files[0]; // Multiple files can be dropped. Lets only deal with the "first" one.
		if (file.type.match('image.*')) {
			resizeImage(file, 200, function(result) {
				$('#preview').attr('src', result);
				//alert(result.replace(/^data:image\/(png|jpg);base64,/, ""));
				$('#base64').val(result.replace(/^data:image\/(png|jpg);base64,/, ""));
			});
		} else {
			alert("That file wasn't an image.");
		}
	};

	resizeImage = function(file, size, callback) {
		var fileTracker = new FileReader;
		fileTracker.onload = function() {
			var image = new Image();
			image.onload = function(){
				var canvas = document.createElement("canvas");
				
				if(image.height > size) {
					image.width *= size / image.height;
					image.height = size;
				}
				
				/*
				if(image.width > size) {
					image.height *= size / image.width;
					image.width = size;
				}
				*/
				var ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				canvas.width = image.width/2;
				canvas.height = image.height;


				

				ctx.rotate(0.5 * Math.PI);
	            ctx.translate(0, -canvas.height);
	            ctx.drawImage(image, 0, 0, image.width, image.height);

				callback(canvas.toDataURL("image/png"));
			};
			image.src = this.result;
		}
		fileTracker.readAsDataURL(file);
		fileTracker.onabort = function() {
			alert("The upload was aborted.");
		}
		fileTracker.onerror = function() {
			alert("An error occured while reading the file.");
		}
	};
})
