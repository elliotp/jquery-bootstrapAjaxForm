# jquery-bootstrapAjaxForm


A simple jquery plugin to ajax post a bootstrap 3 form, and apply bootstrap validation styles based on json data response.

This plugin requires your bootstrap form markup to be correct, specifically form-groups.

The post url is taken from the form action.

## Usage
========================

Attach to all forms on the page / site
```javascript $('form').bootstrapAjaxForm(); ```

Attach to specific form of id = "signup-form"
```javascript  $('#signup-form').bootstrapAjaxForm();  ```

//advanced use, turning some features off:
```javascript 
$('form').bootstrapAjaxForm({
  fieldFeedback: true,
  fieldHighlighting: true,
  perFieldMessages: true,
  alertMessages: false,
  hideFormOnSuccess: false,
}); 
```

## JSON Response Format
========================
The plugin requies the validation data to be returned in a specific format.  The only required objects are the fields and their status, everything else is optional.

```json
{
    fields: {
        email: {
            status: 'error',
            msg: 'Please enter an email addrress.',
        },
        password: {
            status: 'success',
            msg: 'Password is ok.',
        }
        another-field-name: {
            status: 'warn',
            msg: 'This field has a warning',
        }
    },
    messages: {
        danger: [
            'Please correct the errors and try again.',
            'This is another error'
        ],
        info: [
            'An info message', 
        ],
        success: [
            'Sucess, woohoo.', 
        ],
        warning: [
            'A warning message.', 
        ],
    },
}
```

## Basic PHP Example of creating a response with validation
========================
```php
if(empty($email))
{
    $array = array(
        'fields' => array(
            'email' => array('status' => 'error', 'msg' => 'Please enter an email addrress.')
        ),

        'messages' => array( 
            'danger' => array('Please correct the errors and try again')
        ),
    );

    echo json_encode($array);
}
```






