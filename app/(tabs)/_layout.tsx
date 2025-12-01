import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const scheme = (colorScheme as 'light' | 'dark') ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[scheme].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }: { color?: string }) => (
            <IconSymbol size={28} name="house.fill" color={color ?? Colors[scheme].icon} />
          ),
        }}
      />
      <Tabs.Screen
        name="agendamentos"
        options={{
          title: 'Agendamentos',
          tabBarIcon: ({ color }: { color?: string }) => (
            <IconSymbol size={28} name="calendar" color={color ?? Colors[scheme].icon} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }: { color?: string }) => (
            <IconSymbol size={28} name="person.fill" color={color ?? Colors[scheme].icon} />
          ),
        }}
      />
    </Tabs>
  );
}
