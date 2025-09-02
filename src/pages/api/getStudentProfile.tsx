import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Databases, Query } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);
const databases = new Databases(client);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    const result = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_STUDENTSPROFILE_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    if (result.documents.length > 0) {
      return res.status(200).json(result.documents[0]);
    } else {
      return res.status(200).json({});
    }
  } catch (err: any) {
    console.error("❌ Error fetching profile:", err.message, err);
    return res.status(500).json({ error: err.message });
  }
}
