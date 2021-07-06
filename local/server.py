from flask import Flask, Response
from flask import request

import movement

class Server():

  def __init__(self):
    """
    This class is used to control the web server hosted on the RPi.
    """
    self.m = movement.Movement()

  def start_webserver(self):
    """
    The below code is used to start the Robot's webserver. It is run locally on
    the RPi itself.
    """
    print("Initializing Server")
    app = Flask(__name__)

    @app.route("/v2/move", methods=['POST'])
    def move():
      axis_name = request.form['axis_name']
      axis_value = request.form['axis_value']
      controller_type = request.form['controller_type']

      output = self.m.move_robot(
        axis_name=axis_name,
        axis_value=float(axis_value),
        controller_type=controller_type)
      return Response(output, mimetype='text/HTML')

  return app

s = Server()
app = s.start_webserver()
app.debug=True
print("Starting up thread...")
