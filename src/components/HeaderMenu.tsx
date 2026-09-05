import { useState } from 'react';
import {
  SettingOutlined,
  InfoCircleOutlined,
  GithubOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Modal, Flex, Switch, Button, Typography } from 'antd';
import type { UseRime } from 'react-rime';
import styles from './HeaderMenu.module.css';

const CREDITS = [
  { name: 'RIME', href: 'https://github.com/rime/home', icon: <GithubOutlined /> },
  {
    name: 'pinyin-pro',
    href: 'https://github.com/zh-lx/pinyin-pro',
    icon: <GithubOutlined />,
  },
  {
    name: 'my_rime',
    href: 'https://github.com/LibreService/my_rime',
    icon: <GithubOutlined />,
  },
  {
    name: 'CC-CEDICT (CC BY-SA 4.0)',
    href: 'https://cc-cedict.org/',
    icon: <LinkOutlined />,
  },
];

type MenuItem = Required<MenuProps>['items'][number];
type ModalKey = 'about' | 'settings';

const items: MenuItem[] = [
  {
    label: 'About',
    key: 'about',
    icon: <InfoCircleOutlined />,
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: <SettingOutlined />,
  },
];

interface HeaderMenuProps {
  rime: UseRime;
}

export function HeaderMenu({ rime }: HeaderMenuProps) {
  const [modal, setModal] = useState<ModalKey | null>(null);

  const onClick: MenuProps['onClick'] = (e) => {
    setModal(e.key as ModalKey);
  };

  const closeModal = () => setModal(null);

  return (
    <>
      <Menu
        onClick={onClick}
        theme="dark"
        selectedKeys={modal ? [modal] : []}
        mode="horizontal"
        items={items}
        className={styles.menu}
      />
      <Modal
        title="About"
        open={modal === 'about'}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Typography.Text>
          Pin-Board is a learning tool and typing aid for non-native Mandarin
          speakers who already read the Latin alphabet. It leans on that
          existing literacy, using pinyin to compose text so learners aren't
          blocked by not yet knowing characters. Pinyin isn't Chinese — but it
          lowers the barrier to entry and hopefully keeps pulling learners
          toward the characters underneath it.
        </Typography.Text>
        <Typography.Link
          href="https://github.com/zrisha/pin-board"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', marginTop: 8 }}
        >
          <GithubOutlined /> View Pin-Board on GitHub
        </Typography.Link>
        <Typography.Title level={5}>Credits</Typography.Title>
        <Typography.Text type="secondary">
          Pin-Board is powered by the following projects:
        </Typography.Text>
        <Flex wrap="wrap" gap="middle" style={{ marginTop: 8 }}>
          {CREDITS.map((credit) => (
            <Typography.Link
              key={credit.name}
              href={credit.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {credit.icon} {credit.name}
            </Typography.Link>
          ))}
        </Flex>
      </Modal>
      <Modal
        title="Settings"
        open={modal === 'settings'}
        onCancel={closeModal}
        footer={
          <Button type="primary" onClick={closeModal}>
            Done
          </Button>
        }
      >
        <Flex vertical gap="middle" className={styles.settings}>
          <Flex justify="space-between" align="center">
            <Typography.Text>English punctuation</Typography.Text>
            <Switch
              checked={rime.isEnglishPunctuation}
              onChange={() => rime.changePunctuation()}
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Typography.Text>Emoji suggestions</Typography.Text>
            <Switch
              checked={rime.enableEmoji}
              onChange={() => rime.changeEmoji()}
            />
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
