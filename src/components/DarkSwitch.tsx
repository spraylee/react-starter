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
        {colorScheme === 'dark' ? <div className="i-carbon:sun text-lg" /> : <div className="i-carbon:moon text-lg" />}
      </ActionIcon>
    </Group>
  )
}
