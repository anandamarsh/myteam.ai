import { useState, useEffect } from "react";
import { TeamMember } from "../types/TeamMember";
import { api } from "../services/api";

export const useMembers = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    loadMembers();
  }, []);

  return { members, loading, error, loadMembers };
};
