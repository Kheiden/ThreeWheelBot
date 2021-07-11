git pull
sudo systemctl daemon-reload
sudo systemctl restart Web_Controller.service
journalctl -u Web_Controller.service -f
