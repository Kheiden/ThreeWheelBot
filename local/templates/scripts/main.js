function button_press_test() {
  alert("The button works");
}
function button_select(id) {
  dark = 'dark'
  bright = 'bright'

  if (($(id))[0].classList.contains(bright))
  {
      $(id).addClass(dark)
      $(id).removeClass(bright)
  } else {
      $(id).addClass(bright)
      $(id).removeClass(dark)
  }
  log("Button pressed", "INFO")
}
function reload_page()
{
  location.reload()
  log_to_div("Console Reloaded", "INFO")
  return false;
}
function button_clear(){
    for(var i = 1, j = 8; i < j; i++) {
        if (($("#"+String(i)))[0].classList.contains(bright))
        {
            $("#"+String(i)).addClass(dark)
            $("#"+String(i)).removeClass(bright)
        }
    }
}
function add_array(array) {
    var total = 0;
    for (i = 0, j = array.length; i < j; i++) {
      total += array[i];
    }
    return total.toFixed(2)
}
function execute() {
    /* Used to execute the current movement plans */

    // First, determine which API calls will be made based on state
    var api_call_axis = [];
    var api_call_value = [];
    if (($("#1"))[0].classList.contains(bright))
    {
      api_call_axis.push('Axis 1');
    }
    if (($("#2"))[0].classList.contains(bright))
    {
      api_call_axis.push('Axis 0');
    }
    if (($("#3"))[0].classList.contains(bright))
    {
      api_call_value.push(0.20);
    }
    if (($("#4"))[0].classList.contains(bright))
    {
      api_call_value.push(0.10);
    }
    if (($("#5"))[0].classList.contains(bright))
    {
      api_call_value.push(0.00);
    }
    if (($("#6"))[0].classList.contains(bright))
    {
      api_call_value.push(-0.10);
    }
    if (($("#7"))[0].classList.contains(bright))
    {
      api_call_value.push(-0.20);
    }
    value = add_array(api_call_value);
    log("Value: " + value, "INFO");

    construct_api_call(api_call_axis, value);

    // Then, clear all UX element states
    button_clear();
}
function construct_api_call(api_call_axis, value) {
    call_count = api_call_axis.length
    for (i = 0; i < call_count; i++) {

      $.ajax({
        type: "POST",
        url: 'http://192.168.1.23:5500/v2/move',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            axis_name: api_call_axis[i],
            axis_value: value,
            controller_type: '1'
        },    
        timeout: 1000,
        crossDomain: true,
        success: function(result) {
            log("Success!", "INFO");
            log(result, "INFO");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if(textStatus==="timeout") {
               log("timeout error!", "INFO");
            } else {
                log("error!", "ERROR");
                log("testStatus: " + textStatus, "ERROR");
                log("errorThrown: " + errorThrown, "ERROR");
                console.log(jqXHR);
            }
        }});
    }
}
function log(text, type){
    if (type == "VERB") {
        return
    }

    d = new Date();
    document.getElementById('console').innerHTML = document.getElementById('console').innerHTML
    + d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    + " | "
    + type + " | "
    + text + "<br \>"

    var elem = document.getElementById('console');
    elem.scrollTop = elem.scrollHeight;
    return
}