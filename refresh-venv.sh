rm -rf bin include lib lib64 pyvenv.cfg
python3 -m venv .
source bin/activate
pip install --upgrade pip
python3 -m pip install django uwsgi mysqlclient
