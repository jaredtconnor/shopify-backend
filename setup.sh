echo
echo "Installing Python 3.9..."
install-pkg python3.9

echo
echo "Installing Python dependencies..."
poetry install

echo
echo "Installing JavaScript dependencies..."
npm install

echo
