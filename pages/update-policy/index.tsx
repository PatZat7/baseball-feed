import Link from "next/link";
import React from "react";
import PolicyForm from "@/components/PolicyForm";
import { useDispatch } from "react-redux";
import { updatePolicy } from "../../redux/policiesSlice";
import type { AppDispatch } from "../../redux/store";
import { Policy } from "../../types/policy";
import { Typography, Link as MUILink } from "@mui/material";

const UpdatePolicyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (policy: Policy) => {
    dispatch(updatePolicy(policy));
  };

  return (
    <div>
      <Typography variant="h1">Update Policies</Typography>

      <PolicyForm onSubmit={handleSubmit} mode="update" />

      <MUILink href="/">
        <h4>Return Home</h4>
      </MUILink>
    </div>
  );
};

export default UpdatePolicyPage;
