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
          {member.firstName} {member.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {member.phoneNo}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {member.email}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Member;
