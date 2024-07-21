import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

export default function diaryView() {
  return (
    <View>
      <Text>diaryView</Text>
      <Link href="/(tabs)/diary/addDiary">Add Data</Link>
    </View>
  )
}