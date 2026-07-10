# 90-Day DSA Placement Sprint Tracker

A static DSA interview-prep tracker with Firebase Auth + Firestore sync.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server.

## Firebase setup

1. In Firebase Console, enable Authentication → Email/Password.
2. Create a Firestore database.
3. Use the rules in `firestore.rules`.
4. Deploy as a static site through GitHub Pages, Netlify, Vercel, or Firebase Hosting.

The tracker saves to `localStorage` first. When signed in, it syncs progress to:

```text
dsaTrackerUsers/{uid}/trackers/dsa90
```

## Notes

- `index.html` uses Firebase CDN compat scripts so it can remain a single static page.
- `firebase` is also installed through npm for future migration to a bundled app if needed.
