from flask import Flask, Response
from flask import request
from flask import render_template
from flask_cors import cross_origin

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
    @cross_origin()
    def move():
      data = request.form
      axis_name = data['axis_name']
      axis_value = data['axis_value']
      controller_type = data['controller_type']

      output = self.m.move_robot(
        axis_name=axis_name,
        axis_value=float(axis_value),
        controller_type=controller_type)
      return Response(output, mimetype='text/HTML')

    @app.route("/v2sandbox/move", methods=['POST'])
    @cross_origin()
    def move_sandbox():
      data = request.form
      axis_name = data['axis_name']
      axis_value = data['axis_value']
      controller_type = data['controller_type']

      output = "axis_name: {}, axis_value: {}".format(
        axis_name,
        axis_value)
      return Response(output, mimetype='text/HTML')

    @app.route("/lcars", methods=['GET'])
    def serve_frontend():
      return render_template('lcars.html')

    return app

s = Server()
app = s.start_webserver()
app.debug=True
print("Starting up thread...")
