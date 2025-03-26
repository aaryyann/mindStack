# Mind Stack

Mind Stack is a full-stack MERN application built with **TypeScript, React, Node.js, Express, and MongoDB**. It allows users to **sign up, log in, and manage their embedded social media posts** on a personalized dashboard. User authentication is handled with JWT tokens stored in cookies.

## Features

- **User Authentication**: Users can sign up and log in securely.
- **JWT Token Storage**: Authentication tokens are stored in cookies for session management.
- **Dashboard Management**: Users can add social media post links, which get embedded into their dashboard.
- **Data Persistence**: All user data, including stored posts, is managed in MongoDB.
- **Post Deletion**: Users can delete individual embedded posts from their dashboard.
- **Responsive UI**: Built with React and styled for a modern and intuitive experience.

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) stored in cookies
- **API Testing**: Postman

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/mind-stack.git
   cd mind-stack
   ```

2. **Install dependencies**
   ```sh
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLIENT_URL=http://localhost:3000
   ```

4. **Run the backend server**
   ```sh
   cd backend
   npm run dev
   ```

5. **Run the frontend**
   ```sh
   cd frontend
   npm start
   ```

6. **Access the application**
   Open `http://localhost:5173` in your browser.

## API Endpoints

### Auth Routes
| Method | Endpoint       | Description |
|--------|---------------|-------------|
| POST   | /api/auth/signup | Register a new user |
| POST   | /api/auth/login  | Log in and get JWT token |


### Post Management Routes
| Method | Endpoint       | Description |
|--------|---------------|-------------|
| GET    | /api/posts    | Fetch all user posts |
| POST   | /api/posts    | Add a new post link |
| DELETE | /api/posts/ | Delete a specific post |

## Folder Structure
```
Mind-Stack/
│── backend/  (Node.js + Express API)
│── frontend/ (React + TypeScript UI)
│── README.md
│── .gitignore
```

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-branch`)
5. Create a Pull Request

## License
This project will be  open-source 

## Contact
For any queries, feel free to reach out:
- Email: arya000045@gmail.com
- GitHub: [aaryyann](https://github.com/aaryyann)

