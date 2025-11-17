// 我们的 "用户" 合约
export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  role: 'consumer' | 'blogger' | 'merchant';
}

// 模拟的假用户数据
export const MOCK_USER: User = {
  id: "u1",
  username: "ProDeveloper",
  avatarUrl: "https://via.placeholder.com/150", // 一个占位符头像
  role: "merchant",
};