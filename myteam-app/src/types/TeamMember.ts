export interface TeamMember {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  role: string;
  avatar?: string;
}

const teamMembers: TeamMember[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNo: "123-456-7890",
    role: "Admin",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNo: "098-765-4321",
    role: "User",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phoneNo: "234-567-8901",
    role: "User",
  },
  {
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    phoneNo: "345-678-9012",
    role: "Admin",
  },
  {
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.davis@example.com",
    phoneNo: "456-789-0123",
    role: "User",
  },
  {
    firstName: "Diana",
    lastName: "Evans",
    email: "diana.evans@example.com",
    phoneNo: "567-890-1234",
    role: "Admin",
  },
  {
    firstName: "Eve",
    lastName: "Foster",
    email: "eve.foster@example.com",
    phoneNo: "678-901-2345",
    role: "User",
  },
];

export default teamMembers;
