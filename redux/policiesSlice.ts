import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Policy } from "../types/policy";

interface PoliciesState {
  policies: Policy[];
}

const initialState: PoliciesState = {
  policies: [],
};

export const fetchPolicies = createAsyncThunk(
  "policies/fetchPolicies",
  async () => {
    const response = await fetch("/api/policies");
    if (!response.ok) {
      throw new Error("Failed to fetch policies");
    }
    return await response.json();
  }
);

export const addPolicy = createAsyncThunk<
  Policy,
  Policy,
  { rejectValue: string }
>("policies/addPolicy", async (newPolicy: Policy, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/policies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPolicy),
    });
    if (!response.ok) {
      throw new Error("Failed to add policy");
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deletePolicy = createAsyncThunk(
  "policies/deletePolicy",
  async (policy: Policy, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/policies/${policy.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete policy");
      }
      return await response.json(); // Return the ID of the deleted policy
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updatePolicy = createAsyncThunk(
  "policies/updatePolicy",
  async (policy: Policy, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/policies/${policy.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(policy),
      });
      if (!response.ok) {
        throw new Error("Failed to update policy");
      }
      return policy; // Return the updated policy
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const policiesSlice = createSlice({
  name: "policies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        // Handle loading state
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.policies = action.payload;
      })
      .addCase(fetchPolicies.rejected, (state) => {
        // Handle error state
      })

      .addCase(addPolicy.fulfilled, (state, action: PayloadAction<Policy>) => {
        state.policies.push(action.payload);
      })
      .addCase(addPolicy.rejected, (state, action) => {
        // Handle the error
        console.error("Failed to add policy:", action.payload);
      })
      .addCase(updatePolicy.fulfilled, (state, action) => {
        const index = state.policies.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.policies[index] = action.payload;
        }
      })
      .addCase(
        deletePolicy.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.policies = state.policies.filter(
            (policy) => policy.id !== action.payload
          );
        }
      )
      .addCase(deletePolicy.rejected, (state, action) => {
        // Handle the error
        console.error("Failed to delete policy:", action.payload);
      });
  },
});

export default policiesSlice.reducer;
