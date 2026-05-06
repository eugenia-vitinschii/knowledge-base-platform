## Internal Knowledge Platform (Fullstack)

A high-performance internal platform for corporate knowledge management with Role-Based Access Control (RBAC).

#### Tech Stack:
- **Frontend:** Vue 3 (Composition API), TypeScript, Pinia, Sass (Mixins/Variables), Zod.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Authentication.

### Key Engineering Solutions Implemented:
- **RBAC System:** Designed and implemented 3 user roles (Admin, Editor, Viewer) with specific permissions and private routes.
- **Dynamic Content:** Integrated a Markdown editor for article creation with live preview functionality.
- **Architecture:** Followed a modular structure on both Frontend and Backend, ensuring code reusability (e.g., generic form components, shared mappers).
- **Data Integrity:** Implemented strict schema validation using Zod and password hashing (bcrypt) for secure authentication.
- **Analytics Dashboard:** Developed a statistics module with data visualization (charts) for tracking popular content and user activity.

---
#### Project setup /, /backend, /frontend
```
npm install
```

#### Compile and Hot-Reload for Development

```
npm run dev
```

#####  /backend create .env (example + read data base)
```
PORT=4000
SECRET=your_jwt_secret
MONGO_URI=mongodb+srv://tester:CH2vaGB6mgHoIRWx@knowledge-base.lakfycb.mongodb.net/?appName=knowledge-base
```

#####  /frontend create .env (example)
```
VITE_API_URL=http://localhost:4000/api
```
