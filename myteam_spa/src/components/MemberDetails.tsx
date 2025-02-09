import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { TeamMember } from "../types/TeamMember";
import { api } from "../services/api";

interface Props {
  member?: TeamMember | null;
  onClose: () => void;
}

const MemberDetails: React.FC<Props> = ({ member, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: member?.firstName || "",
    lastName: member?.lastName || "",
    email: member?.email || "",
    phoneNo: member?.phoneNo || "",
    role: member?.role || "Regular",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (member) {
        await api.updateMember(member.id, formData);
      } else {
        await api.createMember(formData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save member:", error);
    }
  };

  return (
    <div style={{ margin: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        {member ? "Edit team member" : "Add a team member"}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {member
          ? "Edit contact info, location and role"
          : "Set email, location and role"}
      </Typography>
      <hr
        style={{
          margin: "2rem 0",
          border: "none",
          borderTop: "1px solid #ddd",
        }}
      />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "500px",
        }}
      >
        <TextField
          autoFocus
          label="First Name"
          fullWidth
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <TextField
          label="Last Name"
          fullWidth
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          label="Phone Number"
          fullWidth
          value={formData.phoneNo}
          onChange={(e) =>
            setFormData({ ...formData, phoneNo: e.target.value })
          }
        />
        <FormControl>
          <FormLabel>Role</FormLabel>
          <RadioGroup
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <FormControlLabel
              value="Regular"
              control={<Radio />}
              label="Regular - Can't delete members"
            />
            <FormControlLabel
              value="Admin"
              control={<Radio />}
              label="Admin - Can delete members"
            />
          </RadioGroup>
        </FormControl>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "space-between",
          }}
        >
          <div>
            {member && (
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  try {
                    await api.deleteMember(member.id, member.email);
                    onClose();
                  } catch (error) {
                    alert(
                      error instanceof Error
                        ? error.message
                        : "Failed to delete member"
                    );
                  }
                }}
              >
                Delete
              </Button>
            )}
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MemberDetails;
