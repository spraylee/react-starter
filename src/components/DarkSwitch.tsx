import { Box, Center, ColorScheme, Group, SegmentedControl, Switch, useMantineColorScheme } from '@mantine/core'
import { Sun, Moon } from 'tabler-icons-react'

export const DarkSwitch = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        value={colorScheme}
        onChange={(v) => toggleColorScheme(v as ColorScheme)}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <Sun size={16} />
                <Box ml={10}>Light</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <Moon size={16} />
                <Box ml={10}>Dark</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  )
}
