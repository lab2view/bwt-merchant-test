## BeWallet Project (AngularJS - Frontend, Express & SQLite - Backend)

This web application uses AngularJS for the frontend and Express.js with SQLite (for testing) on the backend.

**Environment Configuration:**

1. Create the `.env` file with your specific environment variables inside the `client` folder (**note the leading dot**).

The `.env` file should have the following format:

```
APPLICATION_ID=your_application_id
APPLICATION_SECRET=your_application_secret
CALLBACK_URL=http://localhost:3000  # Adjust for your deployment URL
SUCCESS_URL=http://localhost:8000     # Adjust for success redirect URL
BWT_URL=your_bewallet_url            # Adjust for BeWallet API URL
```

**Prerequisites:**

* Node.js and npm installed on your system

**Setup:**

1. Navigate to the project root directory in your terminal.
2. Navigate to the `client` folder:

```bash
cd client
```

3. Install dependencies for the frontend (AngularJS):

```bash
npm install
```

**Building and Running:**

1. Inside the `client` folder, run `npm run grunt` (assuming you have Grunt configured) to generate an `env.js` file that injects the environment variables into your AngularJS application.
2. Open a separate terminal window (or tab) and navigate to the project root directory.
3. Install dependencies for the backend (Express & SQLite):

```bash
cd server
npm install
cd ..  # Navigate back to the root directory
```

4. Start the server using `node server/index.js`.
5. Run the AngularJS application using your preferred development server (e.g., `ng serve` for Angular CLI).

**Frontend (AngularJS):**

* `client/app/bewallet.app.js`: Core application module, defines dependencies & bootstraps logic.
* `client/app/controllers/bewallet.ctrl.js`: Handles core BeWallet functionalities (payment processing, success redirection, backend interaction).
* `client/components/`: Custom UI components with HTML templates and controller logic (e.g., bewallet-form.component).
* `client/index.html`: Bootstraps the AngularJS application and includes references.
* `client/styles/` (optional): Stylesheets for the application (e.g., main.css).

**Backend (Express & SQLite):**

* `server/db.js`: Handles database connection and defines the SQLite schema.
* `server/index.js`: Configures the Express server and defines API routes.
* `server/package.json`: Lists dependencies required for the backend.

**Important Notes:**

* Adjust URLs in the `.env` file according to your deployment environment.