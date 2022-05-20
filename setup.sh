echo
echo "Installing Python 3.9..."
install-pkg python3.9

echo
echo "Installing Python dependencies..."
cd backend && poetry install

echo
echo "Installing JavaScript dependencies..."
cd ../frontend && npm install

echo
