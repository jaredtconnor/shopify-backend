echo "Checking Python version..."
python3.9 --version
retVal=$?
if [ $retVal -ne 0 ]
then

    . ./setup.sh
    retVal=$?
    if [ $retVal -ne 0 ]
    then
      exit 1
    fi
fi


echo 
echo "Building application..." 
cd home/runner/shopfiy-backend/frontend && npm start
