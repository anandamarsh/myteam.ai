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
import { Notification } from "../types/Notification";
import NotificationAlert from "./NotificationAlert";

interface Props {
  member?: TeamMember | null;
  onClose: (wasModified?: boolean) => void;
  onNotification: (notification: Notification) => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNo?: string;
}

const MemberDetails: React.FC<Props> = ({
  member,
  onClose,
  onNotification,
}) => {
  const [formData, setFormData] = useState({
    firstName: member?.firstName || "",
    lastName: member?.lastName || "",
    email: member?.email || "",
    phoneNo: member?.phoneNo || "",
    role: member?.role || "Regular",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [notification, setNotification] = useState<Notification | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phoneNo)) {
      newErrors.phoneNo = "Phone number must be exactly 10 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please fix the errors in the form",
      });
      return;
    }

    try {
      if (member) {
        await api.updateMember(member.id, formData);
        onNotification({
          type: "success",
          message: "Member updated successfully",
        });
        onClose(true);
      } else {
        await api.createMember(formData);
        onNotification({
          type: "success",
          message: "New member created successfully",
        });
        onClose(true);
      }
    } catch (error) {
      console.error("Save error:", error);
      setNotification({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to save member",
      });
    }
  };

  const handleDelete = async () => {
    if (!member) return;

    try {
      await api.deleteMember(member.id, member.email);
      onNotification({
        type: "success",
        message: "Member deleted successfully",
      });
      onClose(true);
    } catch (error) {
      console.error("Delete error:", error);
      setNotification({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to delete member",
      });
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
        data-testid="member-form"
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
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
            setErrors({ ...errors, firstName: undefined });
          }}
          error={!!errors.firstName}
          helperText={errors.firstName}
          data-testid="firstName-input"
          margin="normal"
        />
        <TextField
          label="Last Name"
          fullWidth
          value={formData.lastName}
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
            setErrors({ ...errors, lastName: undefined });
          }}
          error={!!errors.lastName}
          helperText={errors.lastName}
          data-testid="lastName-input"
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            setErrors({ ...errors, email: undefined });
          }}
          error={!!errors.email}
          helperText={errors.email}
          data-testid="email-input"
          margin="normal"
        />
        <TextField
          label="Phone Number"
          fullWidth
          value={formData.phoneNo}
          onChange={(e) => {
            setFormData({ ...formData, phoneNo: e.target.value });
            setErrors({ ...errors, phoneNo: undefined });
          }}
          error={!!errors.phoneNo}
          helperText={errors.phoneNo}
          data-testid="phoneNo-input"
          margin="normal"
          placeholder="10 digit number"
        />
        <FormControl>
          <FormLabel>Role</FormLabel>
          <RadioGroup
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <FormControlLabel
              value="Regular"
              control={<Radio data-testid="role-regular-radio" />}
              label="Regular - Can't delete members"
            />
            <FormControlLabel
              value="Admin"
              control={<Radio data-testid="role-admin-radio" />}
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
                data-testid="delete-button"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button
              onClick={() => onClose(false)}
              variant="outlined"
              data-testid="cancel-button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="save-button"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </form>

      <NotificationAlert
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </div>
  );
};

export default MemberDetails;
