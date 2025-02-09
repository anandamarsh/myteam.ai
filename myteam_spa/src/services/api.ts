import { API_CONFIG } from "../config";
import { TeamMember } from "../types/TeamMember";

const transformMemberFromAPI = (data: any): TeamMember => ({
  id: data.id,
  firstName: data.first_name,
  lastName: data.last_name,
  email: data.email,
  phoneNo: data.phone_no,
  role: data.role,
});

const transformMemberToAPI = (member: Omit<TeamMember, "id">) => ({
  first_name: member.firstName,
  last_name: member.lastName,
  email: member.email,
  phone_no: member.phoneNo,
  role: member.role,
});

export const api = {
  async getMembers(): Promise<TeamMember[]> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    const data = await response.json();
    return data.map(transformMemberFromAPI);
  },

  async createMember(member: Omit<TeamMember, "id">): Promise<TeamMember> {
    const apiData = transformMemberToAPI(member);
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create member");
    }

    const data = await response.json();
    return transformMemberFromAPI(data);
  },

  async updateMember(
    id: number,
    member: Omit<TeamMember, "id">
  ): Promise<TeamMember> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformMemberToAPI(member)),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update member");
    }
    const data = await response.json();
    return transformMemberFromAPI(data);
  },

  async deleteMember(id: number, userEmail: string): Promise<void> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}${id}/`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-User-Email": userEmail,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Only admins can delete members");
      }
      throw new Error("Failed to delete member");
    }
  },
};
