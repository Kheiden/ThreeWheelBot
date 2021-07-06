#/bin/bash

#TODO: Build out validation
echo "IP Address: ${1}"
echo "Port: ${2}"
echo "Module Path: ${3}"

sed 's/<IPADDR>/${1}/g;s/<PORT>/${2}/g;s/<MODULE_PATH>/${3}' Web_Controller.service > /etc/systemd/system/Web_Controller.service
systemctl daemon-reload
systemctl start Web_Controller.service
