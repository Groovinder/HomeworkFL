import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'

export default function Login(props:any){
  return (
    <View>
    <AuthForm title="Sign in" actionText="Sign in" />
    <View >
      <Text >Don't have an account?<Link href='/signUp'>
        <Text> Sign Up</Text>
      </Link></Text>
    </View>
  </View>
  )
}