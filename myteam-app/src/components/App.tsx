import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Member from "./Member";
import teamMembers, { TeamMember } from "../types/TeamMember";
import MemberDetails from "./MemberDetails";
import { StyledFab } from "./styled";
import AddIcon from "@mui/icons-material/Add";

const App: React.FC = () => {
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberDetails(true);
  };

  if (showMemberDetails) {
    return (
      <MemberDetails
        member={selectedMember}
        onClose={() => {
          setShowMemberDetails(false);
          setSelectedMember(null);
        }}
      />
    );
  }

  return (
    <div style={{ margin: "1rem" }}>
      <Typography variant="h5">Team Members</Typography>
      <Typography variant="h6">
        You have {teamMembers.length} team members
      </Typography>
      <div style={{ marginTop: "2rem" }}>
        {teamMembers.map((member: TeamMember, index: number) => (
          <Member
            key={index}
            member={member}
            onClick={() => handleMemberClick(member)}
          />
        ))}
      </div>
      <StyledFab
        onClick={() => {
          setSelectedMember(null);
          setShowMemberDetails(true);
        }}
      >
        <AddIcon />
      </StyledFab>
    </div>
  );
};

export default App;
