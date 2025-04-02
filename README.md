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

#### Install dependencies:
```
yet_to_write
```

#### Set up environment variables (.env file):
```bash
yet_to_write
```
#### Run the backend:
```
node server.js
```

#### Run the frontend:
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

## License
  - This project is licensed under the MIT License
