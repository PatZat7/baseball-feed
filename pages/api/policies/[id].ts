import type { NextApiRequest, NextApiResponse } from "next";
import policies from "../../../policies.json";
import type { Policy } from "../../../types/policy";
import fs from "fs";
import path from "path";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Policy | { message: string }>
) {
  const {
    query: { id },
  } = req;

  if (req.method === "GET") {
    const policy = policies.find((p) => p.id === parseInt(id as string));
    if (policy) {
      res.status(200).json(policy);
    } else {
      res.status(404).json({ message: "Policy not found" });
    }
  } else if (req.method === "DELETE") {
    if (!id) {
      res.status(400).json({ message: "Policy ID is required" });
      return;
    }
    const policyId = parseInt(Array.isArray(id) ? id[0] : id, 10);
    // Path to your JSON file
    const filePath = path.join(process.cwd(), "policies.json");
    const fileData = fs.readFileSync(filePath);
    let policies: Policy[] = JSON.parse(fileData.toString());

    // Delete the policy with the given id
    policies = policies.filter((policy) => policy.id !== policyId);

    // Write the updated policies back to the file
    fs.writeFileSync(filePath, JSON.stringify(policies));

    res.status(200).json({ message: "Policy deleted" });
  } else if (req.method === "PUT") {
    if (!id) {
      res.status(400).json({ message: "Policy ID is required" });
      return;
    }
    const policyId = parseInt(Array.isArray(id) ? id[0] : id, 10);
    const updatedPolicy: Policy = req.body;
    const filePath = path.join(process.cwd(), "policies.json");
    let policies: Policy[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

    policies = policies.map((policy) =>
      policy.id === policyId
        ? { ...policy, ...updatedPolicy, id: policyId }
        : policy
    );

    fs.writeFileSync(filePath, JSON.stringify(policies));

    res.status(200).json({ message: "Policy updated" });
  } else {
    res.status(405).end();
  }
}
