import { TeamMember } from "../types/TeamMember";
import { API_CONFIG } from "../config";

export const api = {
  getMembers: async (): Promise<TeamMember[]> => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}`
    );
    if (!response.ok) throw new Error("Failed to fetch members");
    return response.json();
  },

  getMember: async (id: number): Promise<TeamMember> => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}${id}/`
    );
    if (!response.ok) throw new Error("Failed to fetch member");
    return response.json();
  },

  createMember: async (member: Omit<TeamMember, "id">): Promise<TeamMember> => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      }
    );
    if (!response.ok) throw new Error("Failed to create member");
    return response.json();
  },

  updateMember: async (
    id: number,
    member: Partial<TeamMember>
  ): Promise<TeamMember> => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      }
    );
    if (!response.ok) throw new Error("Failed to update member");
    return response.json();
  },

  deleteMember: async (id: number): Promise<void> => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}${id}/`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete member");
  },
};
