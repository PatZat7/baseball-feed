import type { NextApiRequest, NextApiResponse } from "next";
import policies from "../../../policies.json";
import type { Policy } from "../../../types/policy";
import fs from "fs";
import path from "path";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Policy>>
) {
  if (req.method === "POST") {
    const newPolicy = req.body;

    // Read the current policies
    const filePath = path.join(process.cwd(), "policies.json");
    const fileData = fs.readFileSync(filePath);
    const policies = JSON.parse(fileData.toString());

    // Add the new policy
    policies.push({ ...newPolicy, id: policies.length + 1 }); // Generate a new ID
    fs.writeFileSync(filePath, JSON.stringify(policies));

    res.status(201).json(newPolicy);
  } else if (req.method === "GET") {
    res.status(200).json(policies);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
