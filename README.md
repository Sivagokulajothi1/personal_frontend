# Personal Portfolio - Frontend

This is the public-facing React frontend for the personal developer portfolio.

## Architecture
- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion, React Bits
- **Backend Connection:** Firebase Web SDK (Firestore, Storage)

## Setup & Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Create a `.env` file in the root of the frontend project:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```
   **IMPORTANT:** Do NOT place any Firebase Admin Service Account JSON or private keys here.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Dynamic Data
All content (Profile, Projects, Skills, Experience, Education, Certifications) is loaded dynamically from Firebase Firestore. There is no hardcoded personal content in the UI.

The UI relies entirely on Firebase for its data. The backend security rules enforce that public visitors can only read documents where `published == true` or `visible == true`. There is no admin panel or content editing capability within this application.

## Future Plans
A separate, private `personal_admin` application will be created to manage the portfolio content securely via Firebase Authentication.
