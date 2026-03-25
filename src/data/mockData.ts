import type { Member, PointTransaction, Campaign, Coupon, Reward, Appointment, DashboardStats, Notification } from '../types';

// Color mapping for brands
export const brandColors: Record<string, string> = {
  'BMW': '#0066B1',
  'MINI': '#007C41',
  'Rolls-Royce': '#680021',
  'Honda': '#CC0000',
  'Harley-Davidson': '#FF6600',
  'Maserati': '#003366',
  'Aston Martin': '#006847',
  'Peugeot': '#1F3B73',
  'JEEP': '#2E4722',
  'Xpeng': '#00B3B3',
  'Zeekr': '#4169E1',
  'Sixt': '#FF5F00',
  'Azimut': '#003B5C',
};

export const tierConfig = {
  'Member': { color: '#94a3b8', bg: '#1e293b', icon: '⬜', minSpending: 0, maxSpending: 999999 },
  'Diamond': { color: '#60a5fa', bg: '#1e3a5f', icon: '💎', minSpending: 1, maxSpending: 999999 },
  'Black Diamond': { color: '#a78bfa', bg: '#2d1b69', icon: '🖤', minSpending: 1000000, maxSpending: 4999999 },
  'Infinite Blue Diamond': { color: '#06b6d4', bg: '#0c4a6e', icon: '🔷', minSpending: 5000000, maxSpending: Infinity },
};

// Create 20 realistic members with Thai names
export const members: Member[] = [
  {
    id: '1', memberId: 'MOB-2024-00001', firstName: 'สมชาย', lastName: 'วัฒนศิริ',
    email: 'somchai.w@gmail.com', phone: '081-234-5678', tier: 'Infinite Blue Diamond',
    points: 125000, totalSpending: 8500000, status: 'Active', registeredBU: 'BMW',
    registeredDate: '2024-01-15', memberType: 'B2C', pointsExpiring: 15000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 0, tierCurrentSpending: 8500000,
  },
  {
    id: '2', memberId: 'MOB-2024-00002', firstName: 'พิมพ์ใจ', lastName: 'ลิ้มประเสริฐ',
    email: 'pimjai.l@hotmail.com', phone: '089-876-5432', tier: 'Black Diamond',
    points: 78500, totalSpending: 3200000, status: 'Active', registeredBU: 'Rolls-Royce',
    registeredDate: '2024-02-20', memberType: 'B2C', pointsExpiring: 8000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 1800000, tierCurrentSpending: 3200000,
  },
  {
    id: '3', memberId: 'MOB-2024-00003', firstName: 'ธนาคาร', lastName: 'เพิ่มทอง',
    email: 'thanakan.p@corp.com', phone: '062-345-6789', tier: 'Diamond',
    points: 45200, totalSpending: 850000, status: 'Active', registeredBU: 'MINI',
    registeredDate: '2024-03-10', memberType: 'B2C', pointsExpiring: 5000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 150000, tierCurrentSpending: 850000,
  },
  {
    id: '4', memberId: 'MOB-2024-00004', firstName: 'อริสรา', lastName: 'จิตรดำรงค์',
    email: 'arisara.j@gmail.com', phone: '095-111-2233', tier: 'Black Diamond',
    points: 92000, totalSpending: 2100000, status: 'Active', registeredBU: 'Maserati',
    registeredDate: '2024-01-28', memberType: 'B2C', pointsExpiring: 12000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 2900000, tierCurrentSpending: 2100000,
  },
  {
    id: '5', memberId: 'MOB-2024-00005', firstName: 'ชัยวัฒน์', lastName: 'สุขเจริญ',
    email: 'chaiwat.s@outlook.com', phone: '083-444-5566', tier: 'Diamond',
    points: 32100, totalSpending: 620000, status: 'Active', registeredBU: 'Honda',
    registeredDate: '2024-04-05', memberType: 'B2C', pointsExpiring: 3000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 380000, tierCurrentSpending: 620000,
  },
  {
    id: '6', memberId: 'MOB-2024-00006', firstName: 'นภัสวรรณ', lastName: 'ภูมิพัฒน์',
    email: 'napatsawan.p@gmail.com', phone: '091-777-8899', tier: 'Infinite Blue Diamond',
    points: 210000, totalSpending: 12000000, status: 'Active', registeredBU: 'Rolls-Royce',
    registeredDate: '2023-11-01', memberType: 'B2C', pointsExpiring: 25000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 0, tierCurrentSpending: 12000000,
  },
  {
    id: '7', memberId: 'MOB-2024-00007', firstName: 'ปิยะ', lastName: 'ทองมาก',
    email: 'piya.t@company.co.th', phone: '086-222-3344', tier: 'Member',
    points: 5200, totalSpending: 180000, status: 'Active', registeredBU: 'Honda',
    registeredDate: '2024-06-15', memberType: 'B2C', pointsExpiring: 1000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 820000, tierCurrentSpending: 180000,
  },
  {
    id: '8', memberId: 'MOB-2024-00008', firstName: 'กรกนก', lastName: 'ศรีสว่าง',
    email: 'kornkanok.s@gmail.com', phone: '064-555-6677', tier: 'Diamond',
    points: 38900, totalSpending: 780000, status: 'Active', registeredBU: 'BMW',
    registeredDate: '2024-02-28', memberType: 'B2C', pointsExpiring: 4000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 220000, tierCurrentSpending: 780000,
  },
  {
    id: '9', memberId: 'MOB-2024-00009', firstName: 'วิทยา', lastName: 'มั่งมี',
    email: 'wittaya.m@hotmail.com', phone: '097-888-9900', tier: 'Black Diamond',
    points: 68300, totalSpending: 1800000, status: 'Active', registeredBU: 'Harley-Davidson',
    registeredDate: '2024-03-22', memberType: 'B2C', pointsExpiring: 7000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 3200000, tierCurrentSpending: 1800000,
  },
  {
    id: '10', memberId: 'MOB-2024-00010', firstName: 'สุภาพร', lastName: 'ดีเลิศ',
    email: 'supaporn.d@gmail.com', phone: '082-333-4455', tier: 'Member',
    points: 2800, totalSpending: 95000, status: 'Active', registeredBU: 'Peugeot',
    registeredDate: '2024-07-10', memberType: 'B2C', pointsExpiring: 500,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 905000, tierCurrentSpending: 95000,
  },
  // B2B Members
  {
    id: '11', memberId: 'MOB-2024-B0001', firstName: 'บจก. ทรานส์พอร์ต', lastName: 'โซลูชั่น',
    email: 'fleet@transport-sol.co.th', phone: '02-123-4567', tier: 'Black Diamond',
    points: 155000, totalSpending: 4500000, status: 'Active', registeredBU: 'BMW',
    registeredDate: '2024-01-05', memberType: 'B2B', pointsExpiring: 20000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 500000, tierCurrentSpending: 4500000,
  },
  {
    id: '12', memberId: 'MOB-2024-B0002', firstName: 'บจก. พรีเมียม', lastName: 'ออโต้',
    email: 'info@premiumauto.co.th', phone: '02-987-6543', tier: 'Diamond',
    points: 42000, totalSpending: 920000, status: 'Active', registeredBU: 'Honda',
    registeredDate: '2024-04-18', memberType: 'B2B', pointsExpiring: 5000,
    pointsExpiryDate: '2026-12-31', tierSpendingToNext: 80000, tierCurrentSpending: 920000,
  },
];

// Generate point transactions for members
export const pointTransactions: PointTransaction[] = [
  { id: 'pt-1', memberId: '1', type: 'earn', points: 8500, balance: 125000, description: 'BMW 520d Sport Purchase', brand: 'BMW', date: '2026-03-20', status: 'completed' },
  { id: 'pt-2', memberId: '1', type: 'redeem', points: -5000, balance: 120000, description: 'Redeem: BMW Lifestyle Package', brand: 'BMW', date: '2026-03-18', status: 'completed' },
  { id: 'pt-3', memberId: '1', type: 'earn', points: 3200, balance: 125000, description: 'Annual Service Package', brand: 'BMW', date: '2026-03-15', status: 'completed' },
  { id: 'pt-4', memberId: '2', type: 'earn', points: 45000, balance: 78500, description: 'Rolls-Royce Ghost Extended', brand: 'Rolls-Royce', date: '2026-03-19', status: 'completed' },
  { id: 'pt-5', memberId: '2', type: 'earn', points: 2500, balance: 33500, description: 'Insurance Renewal', brand: 'Howden Maxi', date: '2026-03-10', status: 'completed' },
  { id: 'pt-6', memberId: '3', type: 'earn', points: 4500, balance: 45200, description: 'MINI Cooper S Purchase', brand: 'MINI', date: '2026-03-12', status: 'completed' },
  { id: 'pt-7', memberId: '3', type: 'redeem', points: -2000, balance: 43200, description: 'Coupon: Free Car Wash x5', brand: 'MINI', date: '2026-03-08', status: 'completed' },
  { id: 'pt-8', memberId: '4', type: 'earn', points: 12000, balance: 92000, description: 'Maserati Grecale Purchase', brand: 'Maserati', date: '2026-03-05', status: 'completed' },
  { id: 'pt-9', memberId: '5', type: 'earn', points: 1500, balance: 32100, description: 'Honda Civic e:HEV Service', brand: 'Honda', date: '2026-03-22', status: 'completed' },
  { id: 'pt-10', memberId: '6', type: 'earn', points: 85000, balance: 210000, description: 'Rolls-Royce Spectre EV', brand: 'Rolls-Royce', date: '2026-02-28', status: 'completed' },
  { id: 'pt-11', memberId: '7', type: 'earn', points: 800, balance: 5200, description: 'Honda Service Center Visit', brand: 'Honda', date: '2026-03-21', status: 'completed' },
  { id: 'pt-12', memberId: '8', type: 'earn', points: 6500, balance: 38900, description: 'BMW M4 Competition', brand: 'BMW', date: '2026-03-01', status: 'completed' },
  { id: 'pt-13', memberId: '9', type: 'earn', points: 8000, balance: 68300, description: 'Harley-Davidson Street Glide', brand: 'Harley-Davidson', date: '2026-02-25', status: 'completed' },
  { id: 'pt-14', memberId: '9', type: 'redeem', points: -3000, balance: 65300, description: 'Redeem: HD Riding Gear Set', brand: 'Harley-Davidson', date: '2026-03-15', status: 'completed' },
  { id: 'pt-15', memberId: '11', type: 'earn', points: 25000, balance: 155000, description: 'Fleet Purchase: 5x BMW 320d', brand: 'BMW', date: '2026-03-10', status: 'completed' },
  { id: 'pt-16', memberId: '1', type: 'transfer_out', points: -2000, balance: 123000, description: 'Transfer to Point X (SCB)', brand: 'System', date: '2026-03-22', status: 'completed' },
  { id: 'pt-17', memberId: '4', type: 'earn', points: 1500, balance: 93500, description: 'Sixt Rent A Car - 7 days', brand: 'Sixt', date: '2026-03-18', status: 'completed' },
  { id: 'pt-18', memberId: '6', type: 'earn', points: 5000, balance: 215000, description: 'Birthday Bonus Points', brand: 'System', date: '2026-03-01', status: 'completed' },
];

// Create campaigns
export const campaigns: Campaign[] = [
  {
    id: 'c1', name: 'BMW Summer Drive Experience', nameEN: 'BMW Summer Drive Experience',
    code: 'BMW-SDE-2026', type: 'coupon', status: 'active',
    startDate: '2026-03-01', endDate: '2026-05-31',
    targetAudience: 'all', pointsRequired: 5000, totalRedemptions: 234, maxRedemptions: 500,
    image: '', description: 'รับ E-Coupon ส่วนลดค่าเซอร์วิส BMW สูงสุด 20% เมื่อใช้ 5,000 คะแนน',
    brand: 'BMW', category: 'Service'
  },
  {
    id: 'c2', name: 'Rolls-Royce Black Badge Lucky Draw', nameEN: 'Rolls-Royce Black Badge Lucky Draw',
    code: 'RR-BBLD-2026', type: 'lucky_draw', status: 'active',
    startDate: '2026-03-01', endDate: '2026-06-30',
    targetAudience: 'black_diamond', pointsRequired: 10000, totalRedemptions: 89, maxRedemptions: 200,
    image: '', description: 'ลุ้นรับ Private Dinner กับ Rolls-Royce Design Team ที่ Goodwood, England',
    brand: 'Rolls-Royce', category: 'Experience'
  },
  {
    id: 'c3', name: 'MINI Lifestyle Collection', nameEN: 'MINI Lifestyle Collection',
    code: 'MINI-LC-2026', type: 'physical', status: 'active',
    startDate: '2026-02-15', endDate: '2026-04-30',
    targetAudience: 'all', pointsRequired: 3000, totalRedemptions: 456, maxRedemptions: 1000,
    image: '', description: 'แลกรับ MINI Lifestyle Merchandise — กระเป๋า, หมวก, เสื้อ Limited Edition',
    brand: 'MINI', category: 'Merchandise'
  },
  {
    id: 'c4', name: 'Honda Service Point x3', nameEN: 'Honda Triple Points Service',
    code: 'HND-3X-2026', type: 'points', status: 'active',
    startDate: '2026-03-15', endDate: '2026-04-15',
    targetAudience: 'all', pointsRequired: 0, totalRedemptions: 1250, maxRedemptions: 5000,
    image: '', description: 'รับคะแนน x3 เมื่อเข้ารับบริการที่ Honda Summit ทุกสาขา',
    brand: 'Honda', category: 'Points Multiplier'
  },
  {
    id: 'c5', name: 'Harley-Davidson Riding Camp', nameEN: 'Harley-Davidson Riding Camp',
    code: 'HD-RC-2026', type: 'coupon', status: 'active',
    startDate: '2026-04-01', endDate: '2026-06-30',
    targetAudience: 'diamond', pointsRequired: 8000, totalRedemptions: 45, maxRedemptions: 100,
    image: '', description: 'สิทธิ์เข้าร่วม HD Riding Experience Camp ที่ Khao Yai — 2D1N',
    brand: 'Harley-Davidson', category: 'Experience'
  },
  {
    id: 'c6', name: 'MGC Birthday Special', nameEN: 'MGC Birthday Special',
    code: 'MGC-BD-2026', type: 'coupon', status: 'active',
    startDate: '2026-01-01', endDate: '2026-12-31',
    targetAudience: 'all', pointsRequired: 0, totalRedemptions: 890, maxRedemptions: 99999,
    image: '', description: 'รับ E-Coupon พิเศษในเดือนเกิด — ส่วนลด After-Sales Service 15%',
    brand: 'All Brands', category: 'Birthday'
  },
  {
    id: 'c7', name: 'Sixt Weekend Getaway', nameEN: 'Sixt Weekend Getaway',
    code: 'SIXT-WG-2026', type: 'coupon', status: 'active',
    startDate: '2026-03-01', endDate: '2026-05-31',
    targetAudience: 'diamond', pointsRequired: 4000, totalRedemptions: 178, maxRedemptions: 500,
    image: '', description: 'เช่ารถ Sixt Premium ราคาพิเศษ เริ่มต้น 999 บาท/วัน + Free GPS',
    brand: 'Sixt', category: 'Travel'
  },
  {
    id: 'c8', name: 'Maserati x Azimut Sea & Drive', nameEN: 'Maserati x Azimut Sea & Drive',
    code: 'MAS-AZ-2026', type: 'lucky_draw', status: 'active',
    startDate: '2026-04-01', endDate: '2026-07-31',
    targetAudience: 'infinite_blue', pointsRequired: 20000, totalRedemptions: 12, maxRedemptions: 50,
    image: '', description: 'ลุ้นรับ Exclusive Yacht Day Trip กับ Azimut + Maserati Test Drive Experience',
    brand: 'Maserati', category: 'Ultra-Premium Experience'
  },
];

// Create coupons
export const coupons: Coupon[] = [
  { id: 'cp1', code: 'BMW-SDE-A1B2C3', campaignId: 'c1', campaignName: 'BMW Summer Drive', status: 'available', discount: '20% Off Service', expiryDate: '2026-05-31', image: '', brand: 'BMW', description: 'ส่วนลดค่าเซอร์วิส BMW 20%' },
  { id: 'cp2', code: 'MINI-LC-D4E5F6', campaignId: 'c3', campaignName: 'MINI Lifestyle', status: 'available', discount: 'Free MINI Cap', expiryDate: '2026-04-30', image: '', brand: 'MINI', description: 'หมวก MINI Limited Edition' },
  { id: 'cp3', code: 'MGC-BD-G7H8I9', campaignId: 'c6', campaignName: 'Birthday Special', status: 'available', discount: '15% Off Service', expiryDate: '2026-03-31', image: '', brand: 'All Brands', description: 'ส่วนลดวันเกิด 15%' },
  { id: 'cp4', code: 'SIXT-WG-J1K2L3', campaignId: 'c7', campaignName: 'Sixt Weekend', status: 'used', discount: 'Premium Rental ฿999/day', expiryDate: '2026-05-31', usedDate: '2026-03-15', image: '', brand: 'Sixt', description: 'เช่ารถราคาพิเศษ' },
  { id: 'cp5', code: 'HD-RC-M4N5O6', campaignId: 'c5', campaignName: 'HD Riding Camp', status: 'available', discount: 'Riding Camp Pass', expiryDate: '2026-06-30', image: '', brand: 'Harley-Davidson', description: 'บัตรเข้าร่วม Riding Camp' },
  { id: 'cp6', code: 'BMW-SDE-P7Q8R9', campaignId: 'c1', campaignName: 'BMW Summer Drive', status: 'expired', discount: '20% Off Service', expiryDate: '2026-02-28', image: '', brand: 'BMW', description: 'ส่วนลดค่าเซอร์วิส BMW 20% (หมดอายุ)' },
];

// Rewards catalog
export const rewards: Reward[] = [
  { id: 'r1', name: 'BMW Lifestyle Backpack', type: 'physical', pointsCost: 8000, stock: 50, totalRedeemed: 32, image: '', brand: 'BMW', description: 'กระเป๋าเป้ BMW M Motorsport Limited Edition', status: 'active' },
  { id: 'r2', name: 'Free Car Wash x5', type: 'e_coupon', pointsCost: 2000, stock: 999, totalRedeemed: 456, image: '', brand: 'All Brands', description: 'คูปองล้างรถฟรี 5 ครั้ง ที่ศูนย์บริการ MGC', status: 'active' },
  { id: 'r3', name: 'Rolls-Royce Umbrella', type: 'physical', pointsCost: 25000, stock: 20, totalRedeemed: 8, image: '', brand: 'Rolls-Royce', description: 'ร่ม Rolls-Royce Iconic Hand-crafted', status: 'active' },
  { id: 'r4', name: 'HD Leather Gloves', type: 'physical', pointsCost: 6000, stock: 100, totalRedeemed: 67, image: '', brand: 'Harley-Davidson', description: 'ถุงมือหนังแท้ Harley-Davidson', status: 'active' },
  { id: 'r5', name: 'MINI Driving Experience', type: 'e_coupon', pointsCost: 12000, stock: 30, totalRedeemed: 15, image: '', brand: 'MINI', description: 'สิทธิ์เข้าร่วม MINI Track Day Experience', status: 'active' },
  { id: 'r6', name: 'Service Voucher ฿5,000', type: 'e_coupon', pointsCost: 10000, stock: 200, totalRedeemed: 89, image: '', brand: 'All Brands', description: 'บัตรกำนัลค่าเซอร์วิส มูลค่า ฿5,000', status: 'active' },
];

// Appointments
export const appointments: Appointment[] = [
  { id: 'a1', memberId: '1', type: 'service', brand: 'BMW', branch: 'BMW Millennium Auto - Rama 4', date: '2026-03-28', time: '10:00', status: 'confirmed', notes: 'Annual Service 50,000 km' },
  { id: 'a2', memberId: '3', type: 'test_drive', brand: 'BMW', branch: 'BMW Millennium Auto - Ekkamai', date: '2026-03-30', time: '14:00', status: 'pending', notes: 'Test drive BMW iX' },
  { id: 'a3', memberId: '5', type: 'service', brand: 'Honda', branch: 'Summit Honda - Bangna', date: '2026-04-02', time: '09:00', status: 'confirmed', notes: 'Regular maintenance' },
];

// Notifications
export const notifications: Notification[] = [
  { id: 'n1', title: 'ได้รับ 8,500 คะแนน', message: 'คุณได้รับ 8,500 คะแนนจากการซื้อ BMW 520d Sport', type: 'points', read: false, date: '2026-03-20' },
  { id: 'n2', title: 'แคมเปญใหม่!', message: 'BMW Summer Drive Experience — รับส่วนลดค่าเซอร์วิสสูงสุด 20%', type: 'campaign', read: false, date: '2026-03-19' },
  { id: 'n3', title: 'คะแนนใกล้หมดอายุ', message: 'คุณมี 15,000 คะแนนที่จะหมดอายุในวันที่ 31 ธ.ค. 2026', type: 'points', read: true, date: '2026-03-15' },
  { id: 'n4', title: 'สุขสันต์วันเกิด! 🎂', message: 'รับ E-Coupon ส่วนลด 15% สำหรับเดือนเกิดของคุณ', type: 'birthday', read: true, date: '2026-03-01' },
  { id: 'n5', title: 'Tier Upgrade!', message: 'ยินดีด้วย! คุณได้เลื่อนระดับเป็น Infinite Blue Diamond', type: 'tier', read: true, date: '2026-02-28' },
];

// Dashboard stats
export const dashboardStats: DashboardStats = {
  totalMembers: 48520,
  activeMembers: 39301,
  newMembersThisMonth: 1250,
  totalPointsIssued: 285000000,
  totalPointsRedeemed: 142500000,
  outstandingPoints: 142500000,
  activeCampaigns: 8,
  redemptionRate: 68.5,
  tierDistribution: [
    { tier: 'Member', count: 28500, percentage: 58.7 },
    { tier: 'Diamond', count: 12800, percentage: 26.4 },
    { tier: 'Black Diamond', count: 5420, percentage: 11.2 },
    { tier: 'Infinite Blue Diamond', count: 1800, percentage: 3.7 },
  ],
  monthlyStats: [
    { month: 'Oct 2025', newMembers: 980, pointsEarned: 22000000, pointsRedeemed: 11000000, revenue: 185000000 },
    { month: 'Nov 2025', newMembers: 1100, pointsEarned: 25000000, pointsRedeemed: 12500000, revenue: 210000000 },
    { month: 'Dec 2025', newMembers: 1450, pointsEarned: 32000000, pointsRedeemed: 18000000, revenue: 280000000 },
    { month: 'Jan 2026', newMembers: 1200, pointsEarned: 28000000, pointsRedeemed: 14000000, revenue: 230000000 },
    { month: 'Feb 2026', newMembers: 1050, pointsEarned: 24000000, pointsRedeemed: 12000000, revenue: 195000000 },
    { month: 'Mar 2026', newMembers: 1250, pointsEarned: 30000000, pointsRedeemed: 15000000, revenue: 245000000 },
  ],
  topBrands: [
    { brand: 'BMW', members: 15200, spending: 4500000000 },
    { brand: 'Honda', members: 12800, spending: 1800000000 },
    { brand: 'MINI', members: 6500, spending: 1200000000 },
    { brand: 'Harley-Davidson', members: 4200, spending: 950000000 },
    { brand: 'Rolls-Royce', members: 1200, spending: 2800000000 },
    { brand: 'Maserati', members: 800, spending: 1500000000 },
    { brand: 'Sixt', members: 3500, spending: 180000000 },
    { brand: 'Peugeot', members: 2100, spending: 420000000 },
  ],
  recentTransactions: pointTransactions.slice(0, 10),
};

// Current logged-in user (for customer app)
export const currentUser: Member = members[0];
