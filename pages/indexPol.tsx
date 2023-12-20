import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPolicies } from "../redux/policiesSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { Policy } from "../types/policy";
import {
  styled,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Paper,
  Link as MUILink,
} from "@mui/material";
import { ModeOutlined, ClearOutlined, AddOutlined } from "@mui/icons-material";
import { deletePolicy } from "../redux/policiesSlice";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  // background: theme.palette.secondary.main,
  color: "#fff",
}));

const HomePage: React.FC = () => {
  const [policies, setPolicyState] = useState<Policy[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const policyData = useSelector((state: any) => state.policies.policies);

  //sync mock json database with redux when app loads
  useEffect(() => {
    dispatch(fetchPolicies());
  }, []);

  //pull from redux
  useEffect(() => {
    if (policyData) {
      setPolicyState(policyData);
    }
  }, [policyData]);

  const handleDelete = async (policy: Policy) => {
    await dispatch(deletePolicy(policy));
    setPolicyState(policies.filter((p) => p.id !== policy.id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Insurance App
          </Typography>
          <Button color="inherit">version no.1</Button>
        </Toolbar>
      </AppBar>

      <Typography
        color="secondary"
        sx={{ fontSize: "2.5rem", margin: "2rem auto" }}
        className="font-sans"
      >
        Insurance Policies
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            border: "0.25px solid",
            borderColor: "secondary.main",
            padding: "3rem",
            borderRadius: "4px",
          }}
        >
          {policies.map((policy) => (
            <Item
              key={policy.id}
              sx={{
                minWidth: "60vw",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <MUILink
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                }}
                color="secondary"
                className="font-sans"
                href={`/policies/${policy.id}`}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: "1.5rem", marginRight: "1rem" }}>
                    {policy.id}
                  </Typography>
                  <Typography sx={{ fontSize: "1.5rem" }}>
                    {policy.policyHolderName}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: "1.25rem" }}>
                    Coverage: {policy.coverage}
                  </Typography>
                </Box>
              </MUILink>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleDelete(policy)}
              >
                <ClearOutlined sx={{ marginRight: "10px" }} />
                Delete Policy
              </Button>
            </Item>
          ))}
        </Stack>
      </Box>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Paper
          sx={{
            display: "flex",
            width: "80vw",
            margin: "1rem auto",
            padding: "1rem",
            justifyContent: "space-around",
          }}
        >
          <Button color="secondary" variant="outlined" size="large">
            <AddOutlined color="secondary" sx={{ marginRight: "10px" }} />
            <MUILink color="secondary" href="/add-policy">
              Add New Policy
            </MUILink>
          </Button>
          <Button color="secondary" variant="outlined" size="large">
            <ModeOutlined color="secondary" sx={{ marginRight: "10px" }} />
            <MUILink color="secondary" href="/update-policy">
              Edit Policy
            </MUILink>
          </Button>
          <Button variant="outlined" size="large">
            <ClearOutlined color="primary" sx={{ marginRight: "10px" }} />
            <MUILink href="/delete-policy">delete Policy</MUILink>
          </Button>
        </Paper>
      </AppBar>
    </Box>
  );
};

export default HomePage;
