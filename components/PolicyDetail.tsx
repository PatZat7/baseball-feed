import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Policy } from "../types/policy";

const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    fetch("/api/policies")
      .then((res) => res.json())
      .then(setPolicies);
  }, []);

  return (
    <div>
      <h2>Policies</h2>
      <ul>
        {policies.map((policy) => (
          <li key={policy.id}>
            <Link href={`/policies/${policy.id}`}>
              <a>
                {policy.policyHolderName} - {policy.coverage}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyList;
