import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Box,
  Container,
} from "@mui/material";
import { TeamMember } from "../types/TeamMember";

interface MemberDetailsProps {
  member?: TeamMember | null;
  onClose: () => void;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    role: "regular",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        role: member.role.toLowerCase(),
      });
    }
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  const handleDelete = () => {
    // Handle delete here
    console.log("Deleting member:", member);
    onClose();
  };

  const isEditing = Boolean(member);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {isEditing ? "Edit Team Member" : "Add a team member"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {isEditing
            ? "Edit contact Info, location and role"
            : "Set Email, location and role"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Info
            </Typography>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Phone Number"
              margin="normal"
              value={formData.phoneNo}
              onChange={(e) =>
                setFormData({ ...formData, phoneNo: e.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 4 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="Regular - can't delete members"
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin - can delete members"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            {isEditing && (
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Box sx={{ display: "flex", gap: 2, marginLeft: "auto" }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default MemberDetails;
