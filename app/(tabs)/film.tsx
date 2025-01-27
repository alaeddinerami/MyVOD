import SearchBar from '@/components/Search'
import React, { useState } from 'react'
import {  ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function film() {
    const [SearchFilm, setSearchFilm]=useState("")
   return (
     <SafeAreaView className='m-3 '>
 
     <ScrollView >
       <View >
         <SearchBar
         value={SearchFilm}
         onChangeText={(text)=> setSearchFilm(text)}
         placeholder='Search for Film'
         />
               <Text className='dark:text-white'>Searching for: {SearchFilm}</Text>
 
       </View>
     </ScrollView>
         </SafeAreaView>
  )
}
