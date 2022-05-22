# Shopify-Backend

## To run application: 

### Build backend dependencies:
1. `python -m venv env` 
2. `. env/bin/activate`
3. `pip install -r backend/requirements.txt`
4. `npm install --prefix frontend` 

## Run the application: 
1. `npm start --prefix frontend`

#### Submission details: 
I wasn't able to accurately deploy on Replit using this distinct frontend/backend approach. The reasoning is two fold: 

1) FastAPI has some open CORs middle where issues present. I attempted to route traffic through a dev server [reverse proxy](https://parceljs.org/features/development/#api-proxy) so the front end can accurately call the back end, but was unable to figure out the remaining details or pull the code away to start over with a Node.js backend

2) Replit does some fancy route shitfing [described here](https://docs.replit.com/hosting/deploying-http-servers) about how they route local host IP addresses to private and public addresses. This made it difficult have the front end spreak to the backend with out tracking down the public IP address for the given replit. 


Public Replit - [here](https://replit.com/@jaredtconnor/shopify-backend#.replit)
