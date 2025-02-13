import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Member from "./components/Member";
import MemberDetails from "./components/MemberDetails";
import { TeamMember } from "./types/TeamMember";
import AddIcon from "@mui/icons-material/Add";
import { StyledFab } from "./components/styled";
import { useMembers } from "./hooks/useMembers";
import { Notification } from "./types/Notification";
import NotificationAlert from "./components/NotificationAlert";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"list" | "details">("list");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const { members, loading, error, loadMembers } = useMembers();

  const handleCloseNotification = () => {
    setNotification(null);
  };

  // Create a shared notification handler
  const showNotification = (notification: Notification) => {
    setNotification(notification);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  if (currentView === "details") {
    return (
      <MemberDetails
        member={selectedMember}
        onClose={(wasModified = false) => {
          setCurrentView("list");
          setSelectedMember(null);
          if (wasModified) {
            loadMembers();
          }
        }}
        onNotification={showNotification}
      />
    );
  }

  return (
    <div style={{ margin: "1rem" }}>
      <Typography variant="h5">Team Members</Typography>
      <Typography variant="h6" data-testid="member-count">
        You have {members.length} team members
      </Typography>
      <div style={{ marginTop: "2rem" }} data-testid="member-list">
        {members.map((member) => (
          <Member
            key={member.id}
            member={member}
            onClick={() => {
              setSelectedMember(member);
              setCurrentView("details");
            }}
          />
        ))}
      </div>
      <StyledFab
        data-testid="add-member-button"
        onClick={() => {
          setSelectedMember(null);
          setCurrentView("details");
        }}
      >
        <AddIcon />
      </StyledFab>

      <NotificationAlert
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </div>
  );
};

export default App;
