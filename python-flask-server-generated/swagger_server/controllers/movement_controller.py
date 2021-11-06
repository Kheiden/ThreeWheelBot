import connexion
import six

from swagger_server import util


def move_robot(axis_name, axis_value, controller_type):  # noqa: E501
    """Move the robot

    Returns responses, and sends signal to the motors (if applicable) # noqa: E501

    :param axis_name: 
    :type axis_name: str
    :param axis_value: 
    :type axis_value: float
    :param controller_type: 
    :type controller_type: float

    :rtype: str
    """
    return 'do some magic!'
