#/bin/bash

#TODO: Build out validation
echo "IP Address: ${1}"
echo "Port: ${2}"
echo "Python version: ${3}"

protoc_version="3.17.3"
echo "protoc version: ${protoc_version}"

sed "s/<IPADDR>/${1}/g;s/<PORT>/${2}/g;s/<PYTHONVER>/${3}/g" Web_Controller.service.template > /etc/systemd/system/Web_Controller.service

sudo apt-get -y install python3-pip
pip3 install -r requirements.txt

cd /home/pi && wget https://github.com/protocolbuffers/protobuf/releases/download/v3.17.3/protobuf-python-${protoc_version}.zip
unzip protobuf-python-${protoc_version}.zip
cd protobuf-python-${protoc_version}.zip && sudo ./configure
sudo make install
sudo ldconfig # refresh shared library cache.

systemctl daemon-reload
systemctl start Web_Controller.service
systemctl status Web_Controller.service
