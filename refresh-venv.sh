rm -rf bin include lib
python3 -m venv .
source bin/activate
python3 -m pip install django uwsgi mysqlclient
