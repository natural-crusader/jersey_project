'use strict';

/*
 * Constructs a UsersInfoPage instance.  
 * Displays all users with data in table format.
 *
 * @param params
 * 	{
 *		fadin_ms -- undefined: User default (250); integer: Number of ms to spend fading in asynchronous results.
 *	}
 */

// could not find "Class"
var Class = {};

Class.UsersInfoPage = function(params)
	{
		var UsersInfoPage, RequestResponse, $users_table, idents_text, users_info, params_default;

		construct.call(this);
		return;

		function construct()
			{
				params_default = {fadin_ms: 250};

				UsersInfoPage = this;
				// UsersInfoPage.Initialize = Initialize;
				Initialize();

				RequestResponse = new Class.RequestResponse();
				
				$users_table = $('div.users-table');

				// get the users
				info_get_command(RequestResponse);
			}

		function Initialize()
			{
				idents_text = 
					{
						'/user/info::UsersInfoPage::forms.h3.title' : 'Users',
						'/user/info::UsersInfoPage::forms.h3.tooltip' : 'Click to Update Access Count',
						'/user/info::UsersInfoPage::forms.th.name' : 'Name',
						'/user/info::UsersInfoPage::forms.th.user_id' : 'Id',
						'/user/info::UsersInfoPage::forms.th.modify_dt' : 'Date/Time',
						'/user/info::UsersInfoPage::forms.th.access_ct' : 'Access Ct',
						'/user/info::UsersInfoPage::forms.button.update' : 'Update'
					};

				return UsersInfoPage;
			}

		// Get page information
		function info_get_command(RequestResponse)
			{
				var get_request = {command: 'get_users', params: null};
				RequestResponse.Append(get_request, response_callback);
				return;

				function response_callback(response)
					{
						var RequestResponse = this;
						info_render(response['results']);
					}
			}
		
		// Display and update row
		function info_render(user_list_result)
			{
				if(user_list_result === undefined) return;

				/* boxed-group and header */

				var $boxed_group = $('<div class="boxed-group"></div>').appendTo($users_table),
					$boxed_group_header = $('<div class="boxed-group-head"></div>').appendTo($boxed_group),
					$bgh_h3 = $('<h3></h3>').html(idents_text['/user/info::UsersInfoPage::forms.h3.title']).appendTo($boxed_group_header),
					$datagrid_div = $('<div></div>').appendTo($boxed_group),
					$table = $('<table></table>').appendTo($datagrid_div);

				var $thead = $('<thead></thead>').appendTo($table),
					$tr = $('<tr></tr>').appendTo($thead),
					$th = $('<th></th>').html(idents_text['/user/info::UsersInfoPage::forms.th.user_id']).appendTo($tr),
					$th = $('<th></th>').html(idents_text['/user/info::UsersInfoPage::forms.th.name']).appendTo($tr),
					$th = $('<th></th>').html(idents_text['/user/info::UsersInfoPage::forms.th.modify_dt']).appendTo($tr),
					$th = $('<th></th>').html(idents_text['/user/info::UsersInfoPage::forms.th.access_ct']).appendTo($tr),
					$th = $('<th></th>').html(idents_text['/user/info::UsersInfoPage::forms.button.update']).appendTo($tr);

				var $tbody = $('<tbody></tbody>').appendTo($table);

				for (var i = 0; i < user_list_result['user_list'].length; i++) 
					{
						var user = user_list_result['user_list'][i];
						
						var $tr = $('<tr></tr>').attr('id', 'row_'+user['user_id']).appendTo($tbody), 
							$td = $('<td></td>').html(user['user_id']).appendTo($tr),
							$td = $('<td></td>').html(user['name']).appendTo($tr),
							$td = $('<td></td>').html(user['modify_dt'])
								.addClass('center modify_dt')
								.appendTo($tr),
							$td = $('<td></td>').html(user['access_ct'])
								.addClass('center access_ct')
								.appendTo($tr),
							$button = $('<button></button>')
								.attr('data-id', user['user_id'])
								.on('click', doUserUpdate)
								.attr('title',idents_text['/user/info::UsersInfoPage::forms.h3.tooltip'])
								.text(idents_text['/user/info::UsersInfoPage::forms.button.update']),
							$td = $('<td></td>').html($button)
								.addClass('center')
								.appendTo($tr);

						if(i%2 == 0) 
							{	
								$tr.addClass('odd');
							}
					}
					
				return;

				function doUserUpdate(event) 
					{
						$( event.target ).prop("disabled",true);
						var id = $(this).data('id');
		
						var get_request = {command: 'update', params: {id: id}};
						RequestResponse.Append(get_request, updateUserRow);
					}

				function updateUserRow(data) 
					{
						var el = $('#row_' + data['user_id']);
						el.find('.modify_dt').hide().html(data['modify_dt']).fadeIn(params_default['fadein_ms']);
						el.find('.access_ct').hide().html(data['access_ct']).fadeIn(params_default['fadein_ms']);
						el.find('button').prop("disabled",false);
					}
			}
	};


Class.RequestResponse = function() 
	{
		var RequestResponse;
		
		construct.call(this);
		return;

		function construct()
			{
				RequestResponse = this;
				RequestResponse.Append = Append;
			}
			
		// not sending any data, just getting update no need to POST
		function Append(get_request, response_callback) 
			{
				var url = 'user_api.php';

				$.ajax({
					url: url,
					type: 'GET',
				    data: get_request,
					success: response_callback,
		            error: function(xhr, textStatus, thrownError, data) {
		                console.log("Error: " + thrownError);
		            }
				});

			    return RequestResponse;
			}
	}
