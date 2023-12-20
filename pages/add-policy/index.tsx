import React from "react";
import PolicyForm from "@/components/PolicyForm";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { addPolicy } from "../../redux/policiesSlice";
import { Typography, Link as MUILink } from "@mui/material";
import { Policy } from "../../types/policy";

interface AddPolicyPageProps {
  policyData?: Policy;
  onSubmit: (policyData: Policy) => void;
}

const AddPolicyPage: React.FC<AddPolicyPageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (policyData: Policy) => {
    dispatch(addPolicy(policyData));
  };

  return (
    <div>
      <Typography variant="h1">Add Policies</Typography>

      <PolicyForm onSubmit={handleSubmit} mode="add" />

      <MUILink href="/">
        <h4>Return Home</h4>
      </MUILink>
    </div>
  );
};

export default AddPolicyPage;
