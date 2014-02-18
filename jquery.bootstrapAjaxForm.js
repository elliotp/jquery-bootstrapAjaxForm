/*
 *	jQuery boostrapAjaxForm 1.0.0
 *	Demo's and documentation:
 *  https://github.com/elliotp/jquery-bootstrapAjaxForm
 *
 *	Copyright (c) 2014 Elliot Pearse
 *
 */

(function ($) {
    $.fn.bootstrapAjaxForm = function (options) {

        var settings = $.extend({
            fieldFeedback: true,
            fieldHighlighting: true,
            perFieldMessages: true,
            alertMessages: true,
            hideFormOnSuccess: true,
        }, options);

        $(this).submit(function (event) {
            var form = $(this);
            var successOnly = true;

            //stop page reload
            event.preventDefault();

            //test data
            /*
            var data = {
                "fields": {
                    "email": {
                        "status": "success",
                            "msg": "Please enter an email address."
                    },
                        "password": {
                        "status": "success",
                            "msg": "Password is ok."
                    }
                },
                    "messages": {
                        "danger": ["Please correct the errors and try again", "You tool"],
                        "info": ["This is an info message"],
                        "success": ["This is a success message"],
                        "warning": ["This is a warning message"]
                }
            };*/

            //get the url
            var url = form.attr('action');

            $.post(url, $(this).serialize(), function (data) {

				//loop through fields and do satus's
				$.each(data.fields, function (fieldName, fieldData) {
					//find the field and parent group
					var field = form.find('[name="' + fieldName + '"]');
					var group = field.parent();

					//go levels up if we're using input groups
					console.log(group.hasClass('input-group'));
					if (group.hasClass('input-group')) group = field.parent().parent();
					console.log(field.parent().parent());

					//flag if we have a validation error
					if (fieldData.status != 'success') successOnly = false;

					//apply the field highlighting
					if (settings.fieldHighlighting) {
						group.removeClass('has-success has-error has-warning').addClass('has-' + fieldData.status);
					}

					//apply the feedback icon if required
					if (settings.fieldFeedback) {
						group.addClass('has-feedback');

						//generate the icon class
						switch (fieldData.status) {
							case 'error':
								var iconClass = 'remove';
								break;
							case 'success':
								var iconClass = 'ok';
								break;
							case 'info':
								var iconClass = 'warning-sign';
								break;
						}

						//create and append the icon
						var icon = $('<span>').addClass('glyphicon glyphicon-' + iconClass + ' form-control-feedback');
						field.after(icon);
					}
					
					//append the help block error message if it exists
					if (settings.perFieldMessages) {
						var helpBlock = group.find('.help-block');

						if (!helpBlock.length && fieldData.msg) {
							//help block needs creating
							helpBlock = $('<p class="help-block">');
							group.append(helpBlock);
						}
						else
						{
							//Empty the help block as it exists
							helpBlock.empty();
						}

						//insert the message
						if(fieldData.msg)
						{
							helpBlock.html(fieldData.msg)
						}
					}
				});

				if (settings.alertMessages) {
					//remove existing overall message boxes            
					$('.alert').remove();

					//do the overall error messages
					$.each(data.messages, function (type, msgs) {
						if (type != 'success') successOnly = false;

						var alertBox = $('<div class="alert alert-' + type + '">');

						$.each(msgs, function (i, msg) {
							alertBox.append($('<p>').html(msg));
						});

						form.before(alertBox);
					});
				}

				if (successOnly && settings.hideFormOnSuccess) {
					form.hide();
				}
			});
        });
    }
}(jQuery));