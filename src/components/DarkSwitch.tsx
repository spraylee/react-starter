import {
  ActionIcon,
  Box,
  Center,
  ColorScheme,
  Group,
  SegmentedControl,
  Switch,
  useMantineColorScheme,
} from '@mantine/core'
import { Sun, Moon, MoonStars } from 'tabler-icons-react'

export const DarkSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Group position="center">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    </Group>
  )
}
