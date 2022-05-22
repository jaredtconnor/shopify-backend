echo "Checking Python version..."
python3.9 --version
retVal=$?
if [ $retVal -ne 0 ]
then
    echo "Running initial setup..." 

    echo "Installing Python 3.9..."
    install-pkg python3.9

    echo
    echo "Installing Python dependencies..."
    pip install -r backend/requirements.txt

    echo
    echo "Installing JavaScript dependencies..."
    npm install --prefix frontend

    echo
    retVal=$?
    if [ $retVal -ne 0 ]
    then
      exit 1
    fi
fi
