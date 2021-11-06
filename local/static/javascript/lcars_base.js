function button_press_test() {
    alert("The button works");
  }
  function button_select(id) {
    dark = 'dark'
  
    if (($(id))[0].classList.contains(dark))
    {
        $(id).removeClass(dark)
    } else {
        $(id).addClass(dark)
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
      for(var i = 1, j = 22; i < j; i++) {
          if (($("#"+String(i)))[0].classList.contains(dark))
          {
              $("#"+String(i)).removeClass(dark)
          }
      }
  }
  function add_array(dict) {
    api_call_axis = {};
    for(var key in dict) {
      if (dict[key] == "") {
          continue;
      }
      var array = dict[key];
      var total = 0;
      for (i = 0, j = array.length; i < j; i++) {
        total += array[i];
      }
      api_call_axis[key] = total.toFixed(2);
    }
    return api_call_axis;
  }
  function execute() {
      /* Used to execute the current movement plans */
  
      // First, determine which API calls will be made based on state
      var api_call_axis = {
          "Axis 1": [],
          "Axis 0": []
      };

      if (($("#1"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(0.20);
      }
      if (($("#2"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(0.10);
      }
      if (($("#3"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(0.05);
      }
      if (($("#4"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(0);
      }
      if (($("#5"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(-0.05);
      }
      if (($("#6"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(-0.10);
      }
      if (($("#7"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(-0.20);
      }
      // BOTH
      if (($("#8"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(0.20);
        api_call_axis["Axis 0"].push(0.20);
      }
      if (($("#9"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(0.10);
        api_call_axis["Axis 0"].push(0.10);
      }
      if (($("#10"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(0.05);
        api_call_axis["Axis 0"].push(0.05);
      }
      if (($("#11"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(0);
        api_call_axis["Axis 0"].push(0);
      }
      if (($("#12"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(-0.05);
        api_call_axis["Axis 0"].push(-0.05);
      }
      if (($("#13"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(-0.10);
        api_call_axis["Axis 0"].push(-0.10);
      }
      if (($("#14"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 1"].push(-0.20);
        api_call_axis["Axis 0"].push(-0.20);
      }
      // RIGHT
      if (($("#15"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 0"].push(0.20);
      }
      if (($("#16"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 0"].push(0.10);
      }
      if (($("#17"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 0"].push(0.05);
      }
      if (($("#18"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 0"].push(0);
      }
      if (($("#19"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 0"].push(-0.05);
      }
      if (($("#20"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 0"].push(-0.10);
      }
      if (($("#21"))[0].classList.contains(dark))
      {
        api_call_axis["Axis 0"].push(-0.20);
      }
      api_call_axis = add_array(api_call_axis);
  
      construct_api_call(api_call_axis);
  
      // Then, clear all UX element states
      button_clear();
  }
  function construct_api_call(api_call_axis) {
      for (var key in api_call_axis) {
        $.ajax({
          type: "POST",
          url: 'http://192.168.1.9:5500/v2/move',
          contentType: 'application/x-www-form-urlencoded',
          data: {
              axis_name: key,
              axis_value: api_call_axis[key],
              controller_type: '1'
          },    
          timeout: 1000,
          crossDomain: true,
          success: function(result) {
              log("API call succeeded. Data returned: " + result, "INFO");
          },
          error: function(jqXHR, textStatus, errorThrown) {
              if(textStatus==="timeout") {
                 log("API call timeout! Please Retry.", "ERROR");
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