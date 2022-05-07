import React, { useState } from 'react'
import { createStyles, Navbar, Group, Code, Modal, Text, Button } from '@mantine/core'
import { DarkSwitch } from '../components/DarkSwitch'
import clsx from 'clsx'
import { useModals } from '@mantine/modals'
// import { MantineLogo } from '../../shared/MantineLogo'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')

  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
      fontSize: 18,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
        },
      },
    },
  }
})

const data = [
  { link: '', label: 'Notifications', icon: 'i-carbon:notification' },
  { link: '', label: 'Billing', icon: 'i-carbon:currency-dollar' },
  { link: '', label: 'Security', icon: 'i-carbon:security' },
  { link: '', label: 'SSH Keys', icon: 'i-carbon:unlocked' },
  { link: '', label: 'Databases', icon: 'i-carbon:data-base' },
  { link: '', label: 'Authentication', icon: 'i-carbon:two-factor-authentication' },
  { link: '', label: 'Other Settings', icon: 'i-carbon:settings' },
]

export function MainLayout() {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState('Billing')

  const [opened, setOpened] = useState(true)
  const models = useModals()
  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <div className={clsx([classes.linkIcon, item.icon])} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <Navbar height={'100vh'} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {/* <MantineLogo /> */}
          <Code
            sx={{ fontWeight: 700 }}
            onClick={() =>
              models.openConfirmModal({
                title: '温馨提示',
                children: '确定要退出登录吗？',
                closeOnConfirm: false,
                labels: { cancel: '取消', confirm: '确定' },
              })
            }
          >
            v3.1.2
          </Code>
          <DarkSwitch />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault()
            setOpened(!opened)
          }}
        >
          <div className={clsx(classes.linkIcon, 'i-carbon:arrows-horizontal', 'text-xl')} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <div className={clsx(classes.linkIcon, 'i-carbon:login', 'text-xl')} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
      <Modal opened={opened} onClose={() => setOpened(false)} title={'Change account'}>
        <Text>Modal content</Text>
        <div className="text-right">
          <Button variant="filled">确定</Button>
        </div>
      </Modal>
    </Navbar>
  )
}
