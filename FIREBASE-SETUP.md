# Firebase Visitor Counter Setup Guide

This guide will help you set up Firebase Realtime Database for the visitor counter feature.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select your existing project
3. Follow the setup wizard

## Step 2: Enable Realtime Database

1. In the Firebase Console, go to **Build** > **Realtime Database**
2. Click **Create Database**
3. Choose a location (preferably closest to your users)
4. Start in **Test Mode** for now (we'll secure it later)

## Step 3: Get Your Firebase Configuration

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Scroll down to **Your apps** section
3. Click on the **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "Portfolio")
5. Copy the `firebaseConfig` object

## Step 4: Add Configuration to Environment Variables

Update your `.env.local` file with the values from the `firebaseConfig`:

```bash
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Step 5: Set Up Database Rules (Security)

1. In Realtime Database, go to the **Rules** tab
2. Replace the rules with:

```json
{
  "rules": {
    "visitorCount": {
      ".read": true,
      ".write": true
    }
  }
}
```

For production, use more secure rules:

```json
{
  "rules": {
    "visitorCount": {
      ".read": true,
      ".write": "!data.exists() || newData.val() === data.val() + 1"
    }
  }
}
```

This allows:
- Anyone to **read** the visitor count
- Only **increment by 1** operations (prevents tampering)

## Step 6: Initialize the Counter (Optional)

1. Go to **Realtime Database** > **Data** tab
2. Hover over your database name and click the **+** icon
3. Add:
   - Name: `visitorCount`
   - Value: `0`
4. Click **Add**

## Step 7: Restart Your Dev Server

```bash
npm run dev
```

## How It Works

- **First Visit**: The counter initializes at 0 and increments to 1
- **Every Visit**: The counter increments by 1 atomically (no race conditions)
- **Real-time**: All viewers see the same count in real-time
- **Persistent**: The count persists across deployments and server restarts

## Viewing Analytics

1. Go to your Firebase Console
2. Navigate to **Realtime Database** > **Data**
3. You'll see the `visitorCount` node with the current count
4. You can manually reset it or adjust it if needed

## Troubleshooting

### Error: "Permission denied"
- Check your database rules in Firebase Console
- Make sure `.read` and `.write` are set to `true` for `visitorCount`

### Counter not incrementing
- Verify all environment variables are set correctly
- Check browser console for errors
- Ensure Firebase Realtime Database is enabled in your project

### Counter shows 0 or doesn't load
- Check that `VITE_FIREBASE_DATABASE_URL` is correct
- Ensure you're using the Realtime Database URL, not Firestore URL
- Restart your dev server after changing `.env.local`

## Cost

Firebase Realtime Database has a generous free tier:
- **10 GB stored**: More than enough for a simple counter
- **1 GB downloaded/day**: Plenty for personal portfolios
- **100 simultaneous connections**: Great for small to medium traffic

Your visitor counter will likely stay within the free tier! 🎉
