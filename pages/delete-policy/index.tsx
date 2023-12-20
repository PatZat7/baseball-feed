import Link from "next/link";
import React from "react";
import PolicyForm from "@/components/PolicyForm";
import { useDispatch } from "react-redux";
import { deletePolicy } from "../../redux/policiesSlice";
import type { AppDispatch } from "../../redux/store";
import { Policy } from "../../types/policy";
import { Typography, Link as MUILink } from "@mui/material";

const DeletePolicyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (policy: Policy) => {
    dispatch(deletePolicy(policy));
  };

  return (
    <div>
      <Typography variant="h1">Delete Policies</Typography>

      <PolicyForm onSubmit={handleSubmit} mode="delete" />

      <MUILink href="/">
        <h4>Return Home</h4>
      </MUILink>
    </div>
  );
};

export default DeletePolicyPage;
