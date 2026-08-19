# ExpenseAI — AI-Powered Personal Finance Dashboard

ExpenseAI is a MERN full-stack personal finance, salary, and expense dashboard that leverages the Gemini API to analyze user transactional history and render advisory financial insights. It is structured cleanly, prioritizing modern code isolation, stateless JWT authentication, scoped DB collections, and advanced Mongo aggregate calculations.

Designed for modern web environments with a premium SaaS glassmorphism visual aesthetic.

---

## 🚀 Key Features

*   **Secure Authentication**: Registers and logs in accounts with Bcryptjs password hashing and stateless JSON Web Tokens.
*   **Income Management (CRUD)**: Log monthly net take-home salary, with compound database indexes enforcing a single salary log per user for any given month/year.
*   **Expense Management (CRUD)**: Log, edit, and delete transactions. Sort, filter, and search transaction ledgers by categories or date ranges.
*   **Aggregated Analytics**: Render responsive Recharts visualizations (pie/bar) evaluating category distributions and historical income-to-outgoing comparisons.
*   **Gemini AI Financial Insights**: An automated advisory service parsing transaction ratios, identifying overspending vectors, establishing recommended budget caps, and highlighting red flags.
*   **Responsive UI/UX**: Custom glassmorphism cards, full sidebar layout, responsive layout adaptations, and interactive alerts.

---

## 🛠 Tech Stack

### Frontend
*   **React + Vite**: Fast, scaffolded client-side SPA.
*   **Tailwind CSS**: Premium CSS styling utility.
*   **React Router Dom**: Dynamic client routing and route guards.
*   **Axios**: Custom-intercepted HTTP client injecting active JWT tokens.
*   **Recharts**: Interactive canvas visualizations.
*   **Lucide React**: Premium UI iconography.

### Backend
*   **Node.js & Express.js**: Asynchronous REST framework.
*   **MongoDB & Mongoose**: Flexible document store and schema validation.
*   **JWT & Bcryptjs**: Token signature validation and cryptographic hashing.
*   **Gemini SDK (`@google/generative-ai`)**: Official API integration.

---

## 📁 Repository Directory Structure

```
ExpenseAI/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB Mongoose connection handler
│   ├── controllers/
│   │   ├── aiController.js        # Gathers financial context & parses Gemini response
│   │   ├── authController.js      # Register, Login, & Active Session profile endpoints
│   │   ├── dashboardController.js # Gathers aggregations for graphs & cards
│   │   ├── expenseController.js   # CRUD handlers for expenses
│   │   └── salaryController.js    # CRUD handlers for salaries
│   ├── middleware/
│   │   ├── authMiddleware.js      # Verifies JWTs & injects request user contexts
│   │   └── errorMiddleware.js     # Standardized JSON error response handler
│   ├── models/
│   │   ├── User.js                # Name, email, hashed password fields
│   │   ├── Salary.js              # Scoped amount, unique month/year index
│   │   └── Expense.js             # Scoped amount, category, date, timestamps
│   ├── routes/
│   │   └── *Routes.js             # Route endpoints matching API specs
│   ├── services/
│   │   └── aiService.js           # Gemini API structured JSON prompter
│   ├── .env                       # Local environment variables definitions
│   └── server.js                  # Main API server entry point
│
├── src/
│   ├── components/
│   │   ├── AIInsights.jsx         # AI analysis widgets and refresh button
│   │   ├── ExpenseChart.jsx       # Recharts graphs (Pie/Bar)
│   │   ├── ExpenseForm.jsx        # Transaction modal editor
│   │   ├── ExpenseTable.jsx       # Colored category transaction lists
│   │   ├── Navbar.jsx             # Breadcrumb titler and greetings
│   │   ├── SalaryCard.jsx         # Dual income tracker grid
│   │   ├── Sidebar.jsx            # Responsive navigation panel
│   │   └── StatCard.jsx           # Metric dashboard indicators
│   ├── pages/
│   │   ├── Dashboard.jsx          # Core landing cockpit
│   │   ├── Expenses.jsx           # Filters, summaries, and ledger table
│   │   ├── Login.jsx              # Session log in portal
│   │   ├── Register.jsx           # Create account portal
│   │   └── Salary.jsx             # Adjust incomes interface
│   ├── routes/
│   │   └── ProtectedRoute.jsx     # Auth-restricted routing shield
│   ├── services/
│   │   └── api.js                 # Axios HTTP client configuration
│   ├── store/
│   │   └── store.jsx              # Global state management using Context API
│   ├── App.jsx                    # Primary app router configuration
│   └── main.jsx                   # Render entry target
│
├── tailwind.config.js             # Custom colors config
├── vite.config.js
└── index.html                     # SEO parameters configuration
```

---

## ⚙️ Installation & Setup

### Prerequisites
*   NodeJS (v16+) installed.
*   MongoDB Server running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI.
*   Gemini API Key (Get from [Google AI Studio](https://aistudio.google.com/)).

### 1. Setup Backend
```bash
# Navigate to backend directory
cd backend

# Install server packages
npm install
```

Configure Environment Variables:
Create or edit `backend/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/expenseai
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the API server:
```bash
# Start in hot-reload development mode
npm run dev
```

The backend server runs at `http://localhost:5000`.

### 2. Setup Frontend
```bash
# Navigate to the root directory
cd ..

# Install frontend packages
npm install
```

Start the Vite development client:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 💬 Technical Interview Talking Points (Key Engineering Decisions)

Be prepared to explain these architectural details in your interview:

1.  **MongoDB Aggregation Pipeline**:
    Instead of fetching massive raw transaction arrays and looping through them in JavaScript to get totals or categories, ExpenseAI uses MongoDB's native aggregation frameworks (`$match`, `$group`, `$sort`). This aggregates, sums, and compiles trends directly inside the database engine.
    *Talking Point*: "This reduces payload size across the network and leverages indexed database lookups, ensuring O(1) processing times for the API server."

2.  **Compound Unique Indexes**:
    The Salary collection uses a compound index `{ user: 1, month: 1, year: 1 }` set to `unique: true`.
    *Talking Point*: "This prevents duplicate salary logs per month/year at the database schema level. If the server receives race conditions or duplicate clicks, the database rejects the insert, ensuring data integrity."

3.  **Strict Security Scopes (JWT vs Request Parameters)**:
    Endpoints do not accept client-provided `userId` parameters when fetching, updating, or creating records.
    *Talking Point*: "We never trust user IDs coming from the client. All operations fetch the user ID directly from the decoded JWT payload stored securely on `req.user` in the `authMiddleware`. This mitigates IDOR (Insecure Direct Object Reference) vulnerabilities."

4.  **Deterministic JSON Responses from Gemini AI**:
    Rather than receiving markdown text streams, we configure the Gemini API SDK with `responseMimeType: "application/json"` and supply system prompts instructing it to match a strict JSON schema structure.
    *Talking Point*: "This guarantees that the API response is parsed cleanly by our backend, allowing the frontend React components to render recommendations in structured components (budget lists, tip lists) without crashing."
