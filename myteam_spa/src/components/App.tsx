import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Member from "./Member";
import MemberDetails from "./MemberDetails";
import { TeamMember } from "../types/TeamMember";
import { api } from "../services/api";
import AddIcon from "@mui/icons-material/Add";
import { StyledFab } from "./styled";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"list" | "details">("list");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await api.getMembers();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError("Failed to load team members");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  if (currentView === "details") {
    return (
      <MemberDetails
        member={selectedMember}
        onClose={() => {
          setCurrentView("list");
          setSelectedMember(null);
          loadMembers();
        }}
      />
    );
  }

  return (
    <div style={{ margin: "1rem" }}>
      <Typography variant="h5">Team Members</Typography>
      <Typography variant="h6">
        You have {members.length} team members
      </Typography>
      <div style={{ marginTop: "2rem" }}>
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
        onClick={() => {
          setSelectedMember(null);
          setCurrentView("details");
        }}
      >
        <AddIcon />
      </StyledFab>
    </div>
  );
};

export default App;
