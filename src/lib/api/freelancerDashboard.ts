export interface DashboardStats {
  totalProposals: {
    count: number;
    trend: number;
  };
  pendingProposals: {
    count: number;
  };
  acceptedProposals: {
    count: number;
    rate: number;
  };
  totalEarnings: {
    amount: number;
  };
}

export interface RecentActivity {
  id: string;
  type: "ACCEPTED" | "VIEWED" | "FEEDBACK";
  title: string;
  description: string;
  timestamp: string;
  projectValue?: number;
}

export interface ProfileStrength {
  percentage: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  actionText: string;
  actionButtonText: string;
}

export interface EarningsDataPoint {
  month: string;
  amount: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return {
    totalProposals: { count: 24, trend: 12 },
    pendingProposals: { count: 8 },
    acceptedProposals: { count: 12, rate: 50 },
    totalEarnings: { amount: 12450.00 },
  };
};

export const getRecentActivities = async (): Promise<RecentActivity[]> => {
  return [
    {
      id: "1",
      type: "ACCEPTED",
      title: "Proposal Accepted",
      description: "Your proposal for \"Modern SaaS Dashboard Design\" was accepted by TechFlow Systems.",
      timestamp: "2h ago",
      projectValue: 4200,
    },
    {
      id: "2",
      type: "VIEWED",
      title: "Proposal Viewed",
      description: "A hiring manager from CreativePulse viewed your application for \"Mobile App Prototypes\".",
      timestamp: "5h ago",
    },
    {
      id: "3",
      type: "FEEDBACK",
      title: "Feedback Requested",
      description: "Client requested a revision on the milestone 1 deliverables.",
      timestamp: "Yesterday",
    },
  ];
};

export const getProfileStrength = async (): Promise<ProfileStrength> => {
  return {
    percentage: 85,
    level: "Advanced",
    actionText: "Complete your portfolio to unlock \"Top Rated\" status and reach more clients.",
    actionButtonText: "Add Portfolio Item",
  };
};

export const getEarningsTrend = async (): Promise<EarningsDataPoint[]> => {
  return [
    { month: "JAN", amount: 4500 },
    { month: "FEB", amount: 6200 },
    { month: "MAR", amount: 5800 },
    { month: "APR", amount: 7500 },
    { month: "MAY", amount: 10200 },
    { month: "JUN", amount: 12450 },
  ];
};
