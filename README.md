# Prequesite
Nodejs version 16.16.0

Docker (optional)

# Local Installation guide
Follow the steps below for a step-by-step installation:

Clone the Source from Repository

Navigate to server folder and Install Modules for the Server
```bash
cd server && npm install
```

Wait until the installation process finishes, then run the server
```bash
npm run dev
```

Open a New Terminal and Set Up for the Client
```bash
cd client && npm install
```

Still wait until the installation process finishes, then run the client
```bash
npm run serve
```

The site will be available at `localhost:8080`

# Run with docker
Navigate to server folder and run the following command
```bash
docker-compose up
```

Wait until the installation process finishes

Navigate to client folder and run `docker-compose up` again

the site will be available at `localhost:8080` after finish installation
