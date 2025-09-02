import { Client, Account, Databases, Storage, ID } from "appwrite"; // These are appwrite classes we need to make instances of these because we have to store data inside it. 

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // https://syd.cloud.appwrite.io/v1
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // setEndpoint and setProject etc. are appwrite's methods.
  // we used process.env to maintain security. Process is a global object in Node.js that provies information and control about the current running process.

export { client };   // The only reason we split export client like to reuse client in the same file before exporting.

export const account = new Account(client);
export const databases = new Databases(client)
export const storage = new Storage(client);
export { ID };

