import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components'

export default function Home() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("")
  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen 
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimention="60%" />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimention="60%" />
                ),
                headerTitle: ""
            }}
        />

        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={{
                flex: 1,
                padding: SIZES.medium,
            }}>
                <Welcome 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={() => {
                        if(searchTerm) {
                           router.push(`/search/${searchTerm}`)
                        }
                    }}
                />
                <Popularjobs />
                <Nearbyjobs />
            </View>
        </ScrollView>
   </SafeAreaView>
  )
}
