# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.test import BaseTestCase


class TestMovementController(BaseTestCase):
    """MovementController integration test stubs"""

    def test_move_robot(self):
        """Test case for move_robot

        Move the robot
        """
        data = dict(axis_name='axis_name_example',
                    axis_value=1.2,
                    controller_type=1.2)
        response = self.client.open(
            '/v2/move',
            method='POST',
            data=data,
            content_type='application/x-www-form-urlencoded')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
