#/bin/bash

#TODO: Build out validation
echo "IP Address: ${1}"
echo "Port: ${2}"
echo "Python version: ${3}"

sed "s/<IPADDR>/${1}/g;s/<PORT>/${2}/g;s/<PYTHONVER>/${3}/g" Web_Controller.service.template > /etc/systemd/system/Web_Controller.service

sudo apt-get -y install python3-pip
pip3 install -r requirements.txt

systemctl daemon-reload
systemctl start Web_Controller.service
systemctl status Web_Controller.service
