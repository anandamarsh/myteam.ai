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

const handleApiError = async (response: Response, defaultMessage: string) => {
  try {
    const data = await response.json();
    if (data.email) {
      throw new Error(data.email[0]);
    }
    if (data.error) {
      throw new Error(data.error);
    }
    throw new Error(defaultMessage);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(defaultMessage);
  }
};

export const api = {
  async getMembers(): Promise<TeamMember[]> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS}`
    );
    if (!response.ok) {
      await handleApiError(response, "Failed to fetch members");
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
      await handleApiError(response, "Failed to create member");
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
      await handleApiError(response, "Failed to update member");
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
      await handleApiError(response, "Failed to delete member");
    }
  },
};
