import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { TeamMember } from "../types/TeamMember";
import { StyledCard, StyledAvatar } from "./styled";

interface MemberProps {
  member: TeamMember;
  onClick: () => void;
}

const Member: React.FC<MemberProps> = ({ member, onClick }) => {
  return (
    <StyledCard onClick={onClick} sx={{ cursor: "pointer" }}>
      <StyledAvatar sx={{ marginTop: "1.5rem" }}>
        <PersonIcon />
      </StyledAvatar>
      <CardContent>
        <Typography variant="h6">
          {member.first_name} {member.last_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {member.phone_no}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {member.email}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Member;
