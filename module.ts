// This file extends the NextAuth.js Session type to include a custom 'id' property.

// Extend Session type to include 'id'
declare module 'next-auth' {
  interface Session {
    id: string;
  }
}