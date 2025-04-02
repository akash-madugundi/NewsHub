# NewsHub

**NewsHub** is a full-stack web application that provides users with the latest news from various categories and countries while allowing admins to manage editorial content. It features *authentication*, *dynamic news fetching*, and a *chatbot* for user engagement.

---

## Features
### User Features
- **User Authentication**: Sign-up, login, and JWT-based authentication.
- **User Dashboard**: Users can view their profile and logout.
- **News Sections**:
  - **All News**: Displays general news.
  - **Category News**: Allows users to filter news by category.
  - **Country News**: Enables users to choose news based on country.
  - **Editorial News**: News added by the admin.
- **Rule-Based FAQ Bot**: Provides instant answers to common user queries.
- **Responsive Design**: Optimized for different screen sizes.

### **Admin Features**:
- All Features of Users, plus:
- **Editorial News Management**:
  - Add news with title, description, image (via URL or upload), date, news URL, author, and source.
  - Stores the news in the database for users to view.

### **Backend Features**:
- NewsAPI.org Integration for fetching live news.
- Implemented Sequelize and Pool for PostgreSQL database management.
- JWT-Based Authentication for secure access control.
- Secure /news routes, ensuring only authenticated users can access.
- Cloudinary Integration for storing and retrieving images.
- Botpress AI Bot for answering FAQs.

---

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- PostgreSQL database setup

### Steps to Run Locally
#### Clone the Repository
```bash
git clone <repository-url>
cd NewsHub
```

#### Install dependencies: *(in frontend and backend folders)*
```
npm install
```

#### Set up environment variables (.env file): *(in backend folder)*
```bash
API_KEY=your_newsapi_key
PORT=8081
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=NewsHub
DB_PORT=5432
DB_HOST=your_db_host
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=6h
ADMIN_EMAIL = admin@gmail.com
ADMIN_PASSWORD_HASH = $2b$10$JzHsrlb5Ysiu5HWA2M7B8uFSQSjFfkNpSnX2F7l2NsIeZlqfMYRpm
```

#### Run the backend: *(in backend folder)*
```
node server.js
```

#### Run the frontend: *(in frontend folder)*
```
npm run dev
```

---

## Technologies Stack
  - **Frontend**: React.js
  - **Backend**: Node.js, Express.js
  - **Database**: PostgreSQL
  - **News Fetching**: NewsAPI.org
  - **Authentication**: JWT
  - **Cloud Storage**: Cloudinary
  - **Bot**: Botpress
  - **Testing**: Postman

---

## Future Enhancements
- **"Read Later" Feature**: Allow users to save news articles.
- **Google Sign-In**: Enable easy authentication using Google accounts.
- **Personalized AI Chatbot**: Enhance user engagement with an AI-powered assistant.

## License
  - This project is licensed under the MIT License
