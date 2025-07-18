import { useQuery } from "@tanstack/react-query";

interface AuthStatus {
  isAuthenticated: boolean;
  userId?: number;
}

export function useAuth() {
  const { data: authStatus, isLoading } = useQuery<AuthStatus>({
    queryKey: ["/api/auth/check"],
    queryFn: async () => {
      const response = await fetch("/api/auth/check");
      if (!response.ok) {
        throw new Error("Failed to check authentication status");
      }
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isAuthenticated: authStatus?.isAuthenticated ?? false,
    userId: authStatus?.userId,
    isLoading,
  };
}