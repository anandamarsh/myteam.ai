export interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  role: "Regular" | "Admin";
  location: string;
  interests: string;
  info: string;
}
