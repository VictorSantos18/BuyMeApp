import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import LatestItems from '../Components/Home/LatestItems'
import { app } from '../../firebaseConfig'

export default function ItemList() {
  const db = getFirestore(app)
  const { params } = useRoute()
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    params && getItemListByCategory();
  }, [params])

  const getItemListByCategory = async () => {
    setItemList([]);
    const q = query(collection(db, 'UserPost'), where('category', '==', params.category))
    const snapshot = await getDocs(q)
    snapshot.forEach(doc => {
      console.log(doc.data())
      setItemList(itemList => [...itemList, doc.data()])
    })
  }
  return (
    <View className='p-2'>
     {itemList?.length>0? <LatestItems LatestItemsList={itemList} 
      heading={'Todos da categoria'} />
      : <Text className='p-5 text-[18px] justify-center text-center text-gray-400'>Nenhum post adicionado recentemente.</Text>}
    </View>
  )
}