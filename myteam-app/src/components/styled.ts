import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";

export const StyledCard = styled(Card)({
  display: "flex",
  marginBottom: "10px",
  border: "none",
  boxShadow: "none",
  borderRadius: "0px",
  borderTop: "1px solid lightgrey",
});

export const StyledAvatar = styled(Avatar)({
  margin: "10px",
});

export const StyledFab = styled(Fab)({
  position: "fixed",
  top: "1rem",
  right: "1rem",
  backgroundColor: "transparent",
  boxShadow: "none",
  color: "#1976d2",
  cursor: "pointer",
  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
  },
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.04)",
  },
  "&.MuiButtonBase-root": {
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.04)",
    },
  },
  "& .MuiTouchRipple-root": {
    color: "rgba(25, 118, 210, 0.2)",
  },
});
