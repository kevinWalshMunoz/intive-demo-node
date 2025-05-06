# Node.js Project with TypeScript

This is a basic Node.js project using TypeScript.

## 📌 Requirements

- Node.js installed (recommended version: LTS)
- npm or yarn

## 🚀 Installation

Clone the repository and run:

```sh
npm install
```

## 🔧 Configuration

### Available Scripts

- `npm run dev` – Runs the project in development mode with `ts-node`.
- `npm run build` – Compiles the TypeScript code into the `build` folder.
- `npm start` – Runs the compiled code from `build/index.js`.
- `npm test` – Runs unit tests.

## 📁 Project Structure

```
my-project/
|—— src/             # Source code in TypeScript
|   ├—— index.ts     # Main file
|   ├—— Controllers  # Controllers
|   ├—— Models       # Models used by TypeScript
|   ├—— Repositories # Repositories to handle DB manipulation
|   ├—— Routes       # Server routes
|   ├—— Services     # Services
|   ├—— Validators   # Joi validators
|—— build/           # Compiled code (generated after `npm run build`)
|—— node_modules/    # Dependencies
|—— .gitignore       # Files to ignore in Git
|—— package.json     # npm configuration
|—— jest.config.js   # Jest config
|—— openapi.yaml     # OpenAPI documentation
|—— nodemon.json     # Nodemon config
|—— tsconfig.json    # TypeScript configuration
|—— README.md        # Documentation
```

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime environment
- **TypeScript** – Typed superset of JavaScript
- **Tsyringe** - Dependency injection
- **Mongoose** - Handles the database
- **Jest** - Testing
- **Joi** - Data validation
- **Redis** - Caching
- **OpenAPI** - Documenting

## 📝 Testing the API

You can test the API using **Postman** by sending a **POST** request to the following URL:

```
http://ec2-3-95-155-9.compute-1.amazonaws.com/api/calculator
```

With the following **JSON body**:

```json
{
  "number1": 24,
  "number2": 6,
  "operation": "/"
}
```

## 📈 API Documentation

You can view the API documentation at:

- **Endpoints documentation:** [http://ec2-3-95-155-9.compute-1.amazonaws.com/docs](http://ec2-3-95-155-9.compute-1.amazonaws.com/docs)
- **Swagger UI:** [http://ec2-3-95-155-9.compute-1.amazonaws.com/api-docs](http://ec2-3-95-155-9.compute-1.amazonaws.com/api-docs)

## 🌜 License

This project is licensed under the MIT License. Feel free to contribute! 🎉

