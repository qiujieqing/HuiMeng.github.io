import { useState } from 'react';
import { Card, List, Button, Space, Tabs, Avatar, Empty, message } from 'antd';
import { UserAddOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './Contacts.css';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
}

const ContactsPage = () => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: '张三', avatar: '👨' },
    { id: '2', name: '李四', avatar: '👩' },
  ]);

  const [requests, setRequests] = useState<FriendRequest[]>([
    { id: '1', name: '王五', avatar: '👨‍💼' },
  ]);

  const handleAccept = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setFriends([...friends, { ...request }]);
      setRequests(requests.filter(r => r.id !== requestId));
      message.success('已添加为好友');
    }
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.filter(r => r.id !== requestId));
    message.info('已拒绝');
  };

  const handleRemoveFriend = (friendId: string) => {
    setFriends(friends.filter(f => f.id !== friendId));
    message.success('已删除好友');
  };

  return (
    <div className="contacts-container">
      <Tabs>
        <Tabs.TabPane tab={`好友列表 (${friends.length})`} key="friends">
          {friends.length === 0 ? (
            <Empty description="暂无好友" />
          ) : (
            <List
              dataSource={friends}
              renderItem={(friend) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      onClick={() => handleRemoveFriend(friend.id)}
                    >
                      删除
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar>{friend.avatar}</Avatar>}
                    title={friend.name}
                  />
                </List.Item>
              )}
            />
          )}
        </Tabs.TabPane>

        <Tabs.TabPane tab={`好友申请 (${requests.length})`} key="requests">
          {requests.length === 0 ? (
            <Empty description="暂无申请" />
          ) : (
            <List
              dataSource={requests}
              renderItem={(request) => (
                <List.Item
                  actions={[
                    <Space>
                      <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={() => handleAccept(request.id)}
                      >
                        接受
                      </Button>
                      <Button
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleReject(request.id)}
                      >
                        拒绝
                      </Button>
                    </Space>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar>{request.avatar}</Avatar>}
                    title={`${request.name} 申请添加你为好友`}
                  />
                </List.Item>
              )}
            />
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ContactsPage;
