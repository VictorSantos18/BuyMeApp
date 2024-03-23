import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import LatestItems from '../../Components/Home/LatestItems'
import { useNavigation } from '@react-navigation/native'

export default function MyProducts() {
  const db = getFirestore(app)
  const { user } = useUser();
  const [productList, setProductList] = useState([])
  const navigation = useNavigation()

  const getUserPost = async () => {
    setProductList([]);
    const q = query(collection(db, 'UserPost'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
    const snapshot = await getDocs(q)
    snapshot.forEach(doc => {
      setProductList(productList => [...productList, doc.data()])
    })
  }

  useEffect(() => {
    const onFocus = () => {
      console.log("Screen focused");
      getUserPost();
    };

    const unsubscribe = navigation.addListener('focus', onFocus);

    return () => {
      unsubscribe();
    };
  }, [navigation, user]);

  return (
    <View>
      {productList?.length > 0 ?
        <LatestItems LatestItemsList={productList}  heading={'Todos os produtos que você postou'}/>
        :
        <Text className='p-5 text-[18px] justify-center text-center text-gray-400'>
          Nenhum post adicionado recentemente.
        </Text>
      }
    </View>
  )
}