import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Policy } from "../../types/policy";

const PolicyDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [policy, setPolicy] = useState<Policy | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      fetch(`/api/policies/${id}`)
        .then((res) => res.json())
        .then(setPolicy);
    }
  }, [id]);

  if (!policy) return <p>Loading...</p>;

  return (
    <div>
      <h2>{policy.policyHolderName}</h2>
      <p>Coverage: {policy.coverage}</p>
    </div>
  );
};

export default PolicyDetailPage;
