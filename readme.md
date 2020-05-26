# Simple Popup Documentation

### Installation
To install the Simple Popup depedancy first add it to your composer configuration
```sh
$ composer require supadu/simple_popup
```
Next ensure your dependancieshave been autoloaded

```sh
require __DIR__ . '/vendor/autoload.php';
```

### Enqueue Assets
Add the following line of code near the start of your themes initialization
```sh
Simple_Popup::enqueue_assets();
```

### Basic Popup
To create the default popup add the following code to your project:
```sh
$basic_popup_data = array(
    'title' => 'Simple Popup Title',
    'button-text' => 'Click Me',
    'modifiers' => array(
        'bottom-right'
    )
);

$basic_cookie_popup = new Simple_Popup($basic_popup_data);
echo $basic_cookie_popup->render_popup('Default Simple Popup Content');
```

### Custom Popup
To create the custom popup add the following code to your project:
```sh
$custom_popup_data = array(
    'title' => 'Title',
    'button-text' => 'Click Me',
    'modifiers' => array(
        'bottom-left'
    ),
    'custom-popup-id' => 'upt-gdpr',
    'custom-cookie' => array(
        'name' => 'custom-cookie-name',
        'value' => 'custom-cookie-value',
    )
);

$custom_cookie_popup = new Simple_Popup($custom_popup_data);
echo $custom_cookie_popup->render_popup('Custom Simple Popup Content');
```

### Custom Popup with Custom Event
To create the default popup with a custom event option to set the cookie, add the following code to your project:
```sh
$custom_popup_data = array(
    'title' => 'Title',
    'button-text' => 'Click Me',
    'modifiers' => array(
        'bottom-left'
    ),
    'custom-popup-id' => 'custom-event-cookie',
    'custom-cookie' => array(
        'name' => 'custom-event-cookie-name',
        'value' => 'custom-event-cookie-value',
    )
);

$custom_cookie_popup = new Simple_Popup($custom_popup_data);

ob_start(); ?>

    <form onsubmit='<?php echo $custom_cookie_popup->handle_inline_event(); ?>'>
        <input type="submit" value="Submit">
    </form>

<?php $content = ob_get_clean();

echo $custom_cookie_popup->render_popup($content);
```

### CSS Modifiers

| Modifier | Description |
| ------ | ------ |
| bottom-left | Aligns the popup to the bottom left hand corner |
| bottom-right | Aligns the popup to the bottom right hand corner |

### Other options
The assets can be included manually using their the classes static methods.
This can be can be useful if you are already including cetain depe dependancy elsewhere (i.e. npm dependancy: js.cookie)
```sh
 add_action( 'wp_enqueue_scripts', function () {

        Simple_Popup::enqueue_popup_styles();
        Simple_Popup::enqueue_cookie_scripts();
        Simple_Popup::enqueue_popup_scripts('simple-popup-cookie');

}, 1);
```

