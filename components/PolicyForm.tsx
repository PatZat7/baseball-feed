import React, { useState } from "react";
import { Button, Box, Typography, Paper, TextField } from "@mui/material";
import { Policy } from "../types/policy";
import { useRouter } from "next/router";

interface PolicyFormProps {
  policy?: Policy;
  onSubmit: (data: Policy) => void;
  mode: "add" | "update" | "delete";
}

const PolicyForm: React.FC<PolicyFormProps> = ({ policy, onSubmit, mode }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(
    policy || { id: undefined, policyHolderName: "", coverage: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    router.push("/");
  };

  return (
    <div>
      <Typography
        color="secondary"
        sx={{ fontSize: "1.5rem", margin: "2rem auto" }}
      >
        {mode === "add" ? "Add New" : mode === "update" ? "Update" : "Delete"}
        Policy
      </Typography>

      <form onSubmit={handleSubmit}>
        {mode === "delete" && (
          <Paper
            sx={{
              maxWidth: "400px",
              padding: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "baseline",
                justifyContent: "space-between",
                margin: "1rem 0",
              }}
            >
              <Typography>
                <label>Policy ID:</label>
              </Typography>
              <TextField
                label="Enter Unique ID"
                variant="standard"
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </Box>
          </Paper>
        )}

        {mode !== "delete" && (
          <Paper
            sx={{
              maxWidth: "400px",
              padding: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "baseline",
                justifyContent: "space-between",
                margin: "1rem 0",
              }}
            >
              <Typography>
                <label htmlFor="id">Policy ID:</label>
              </Typography>
              <TextField
                label="Enter Unique ID"
                variant="standard"
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "baseline",
                justifyContent: "space-between",
                margin: "1rem 0",
              }}
            >
              <Typography>
                <label htmlFor="policyHolderName">Policy Holder Name:</label>
              </Typography>
              <TextField
                label="Enter Name"
                variant="standard"
                type="text"
                name="policyHolderName"
                value={formData.policyHolderName}
                onChange={handleChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "baseline",
                justifyContent: "space-between",
                margin: "1rem 0",
              }}
            >
              <Typography>
                <label htmlFor="coverage">Coverage:</label>
              </Typography>
              <TextField
                label="Enter coverage type"
                variant="standard"
                type="text"
                name="coverage"
                value={formData.coverage}
                onChange={handleChange}
              />
            </Box>
          </Paper>
        )}

        <Button
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          sx={{ margin: "1rem 0" }}
        >
          {mode === "add"
            ? "Add New Policy"
            : mode === "update"
            ? "Update Policy"
            : "Delete Policy"}
        </Button>
      </form>
    </div>
  );
};

export default PolicyForm;
