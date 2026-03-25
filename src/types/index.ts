export interface Member {
  id: string;
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tier: 'Member' | 'Diamond' | 'Black Diamond' | 'Infinite Blue Diamond';
  points: number;
  totalSpending: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  registeredBU: string;
  registeredDate: string;
  avatar?: string;
  memberType: 'B2C' | 'B2B';
  pointsExpiring: number;
  pointsExpiryDate: string;
  tierSpendingToNext: number;
  tierCurrentSpending: number;
}

export interface PointTransaction {
  id: string;
  memberId: string;
  type: 'earn' | 'redeem' | 'adjust_add' | 'adjust_subtract' | 'void' | 'transfer_in' | 'transfer_out';
  points: number;
  balance: number;
  description: string;
  brand: string;
  date: string;
  status: 'completed' | 'pending' | 'voided';
}

export interface Campaign {
  id: string;
  name: string;
  nameEN: string;
  code: string;
  type: 'coupon' | 'lucky_draw' | 'physical' | 'points';
  status: 'active' | 'inactive' | 'draft' | 'expired';
  startDate: string;
  endDate: string;
  targetAudience: 'all' | 'diamond' | 'black_diamond' | 'infinite_blue';
  pointsRequired: number;
  totalRedemptions: number;
  maxRedemptions: number;
  image: string;
  description: string;
  brand: string;
  category: string;
}

export interface Coupon {
  id: string;
  code: string;
  campaignId: string;
  campaignName: string;
  status: 'available' | 'used' | 'expired' | 'suspended';
  discount: string;
  expiryDate: string;
  usedDate?: string;
  image: string;
  brand: string;
  description: string;
}

export interface Reward {
  id: string;
  name: string;
  type: 'e_coupon' | 'physical' | 'lucky_draw';
  pointsCost: number;
  stock: number;
  totalRedeemed: number;
  image: string;
  brand: string;
  description: string;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  memberId: string;
  type: 'test_drive' | 'service' | 'partner';
  brand: string;
  branch: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  totalPointsIssued: number;
  totalPointsRedeemed: number;
  outstandingPoints: number;
  activeCampaigns: number;
  redemptionRate: number;
  tierDistribution: { tier: string; count: number; percentage: number }[];
  monthlyStats: { month: string; newMembers: number; pointsEarned: number; pointsRedeemed: number; revenue: number }[];
  topBrands: { brand: string; members: number; spending: number }[];
  recentTransactions: PointTransaction[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'points' | 'campaign' | 'tier' | 'system' | 'birthday';
  read: boolean;
  date: string;
}
