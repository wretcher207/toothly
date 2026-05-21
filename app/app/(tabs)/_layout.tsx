import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { HapticTab } from "@/components/haptic-tab";
import { colors } from "@/lib/tokens";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.coral,
        tabBarInactiveTintColor: colors.ink[400],
        tabBarStyle: {
          backgroundColor: colors.bone,
          borderTopColor: colors.line,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontFamily: "JetBrainsMono_500Medium", fontSize: 10 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Study",
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Reference",
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="magnifyingglass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="chart.bar.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
