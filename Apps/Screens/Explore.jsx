import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItems from '../Components/Home/LatestItems';

export default function Explore() {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar o refresh

  useEffect(() => {
    getAllProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getAllProducts();
    setRefreshing(false);
  };

  const getAllProducts = async () => {
    setProductList([]);
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => doc.data());
    setProductList(products);
  };

  return (
    <ScrollView className='px-5 py-8 bg-gray-100'
      refreshControl={ 
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text className='text-[20px] font-bold text-violet-500'>Todos os produtos disponíveis</Text>
      <LatestItems LatestItemsList={productList}/>
    </ScrollView>
  );
}
