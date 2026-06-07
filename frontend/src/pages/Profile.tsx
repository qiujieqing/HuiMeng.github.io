import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Avatar, Space, Divider, message, Spin } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import './Profile.css';

interface UserProfile {
  _id: string;
  username: string;
  displayName: string;
  avatar: string;
  departmentId?: string;
  positionId?: string;
  isAdmin?: boolean;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/users/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
      form.setFieldsValue({
        username: response.data.username,
        displayName: response.data.displayName,
      });
    } catch (error) {
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (values: any) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/users/profile`,
        {
          displayName: values.displayName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success('资料更新成功!');
      setEditing(false);
      fetchProfile();
    } catch (error: any) {
      message.error(error.response?.data?.message || '更新失败');
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
          <Avatar size={80} icon={<UserOutlined />} />
          <div className="profile-info">
            <h2>{profile?.displayName || profile?.username}</h2>
            <p>@{profile?.username}</p>
            {profile?.isAdmin && <span className="admin-badge">管理员</span>}
          </div>
        </div>

        <Divider />

        {editing ? (
          <Form form={form} onFinish={handleSaveProfile}>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="显示名称"
              name="displayName"
              rules={[{ required: true, message: '请输入显示名称' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
                <Button onClick={() => setEditing(false)}>取消</Button>
              </Space>
            </Form.Item>
          </Form>
        ) : (
          <>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">用户名:</span>
                <span>{profile?.username}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">显示名称:</span>
                <span>{profile?.displayName}</span>
              </div>
              {profile?.departmentId && (
                <div className="detail-item">
                  <span className="detail-label">部门:</span>
                  <span>{profile.departmentId}</span>
                </div>
              )}
              {profile?.positionId && (
                <div className="detail-item">
                  <span className="detail-label">职位:</span>
                  <span>{profile.positionId}</span>
                </div>
              )}
            </div>

            <Divider />

            <Space>
              <Button type="primary" onClick={() => setEditing(true)}>
                编辑资料
              </Button>
              <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
                退出登录
              </Button>
            </Space>
          </>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
