# Expense Recorder

Expense Recorder is a simple full-stack web application built using **Node.js**, **Express**, **SQLite**, and **EJS**. It allows users to record, edit, delete, and view expenses while automatically calculating the total amount in real time.

This project was built as a learning exercise to understand backend development, database integration, and frontend–backend interaction in a traditional server-rendered web application.

---

## Features

- Add new expense entries  
- Edit existing expenses  
- Delete expenses  
- Automatic total expense calculation  
- Persistent storage using SQLite  
- Dynamic updates using AJAX (no full page reloads)

---

## Tech Stack

- **Backend:** Node.js, Express  
- **Frontend:** EJS, HTML, CSS, JavaScript, jQuery  
- **Database:** SQLite  
- **Template Engine:** EJS  

---

## Project Structure

```
.
├── app.js
├── package.json
├── expense.db
├── views/
│   └── index.ejs
├── public/
│   └── main.js
```

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/rithikamandiv-ux/expense-recorder.git
```

### 2. Navigate to the project folder
```bash
cd expense-recorder
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the application
```bash
node app.js
```

### 5. Open in browser
```
http://localhost:3000
```

---

## Usage

- Enter an expense name and value to add a new record  
- Use the **Edit** button to update an entry  
- Use the **Delete** button to remove an entry  
- The total expense is updated automatically

---

## Learning Outcomes

- Express routing and middleware usage  
- CRUD operations with SQLite  
- Server-side rendering using EJS  
- AJAX-based frontend interactions  
- Basic MVC-style application structure  

---

## Future Improvements

- User authentication  
- Expense categories  
- Filtering and search  
- Charts and analytics  
- Responsive UI improvements  

---

## License

This project is licensed under the **MIT License**.
