import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Home/header'
import Slider from '../Components/Home/slider'
import { collection, getDoc, getDocs, getFirestore, orderBy } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import CategoryList from '../Components/Home/categoriesList'
import LatestItems from '../Components/Home/LatestItems'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
  const db = getFirestore(app)
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getSliderImage(), getCategoryList(), getLatestItemList()]);
    };

    fetchData();
  }, []);


  // busca as imagens do banco
  const getSliderImage = async () => {
    setSliderList([])
    const querySnapshot = await getDocs(collection(db, 'Slider'));
    querySnapshot.forEach((doc) => {
      // console.log("Imagens: ", doc.data());
      setSliderList(sliderList => [...sliderList, doc.data()]);
    });
  }

  // busca a lista de categorias do banco
  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const categoryRef = collection(db, 'Category');
      const querySnapshot = await getDocs(categoryRef);
      querySnapshot.forEach((doc) => {
        // console.log("Docs:", doc.data());
        setCategoryList(categoryList => [...categoryList, doc.data()]);
      });
    } catch (error) {
      console.error('Error fetching category list:', error);
    }
  }

  // busca os itens mais recentes e lista
  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapShot = await getDocs(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    querySnapShot.forEach((doc) => {
      // console.log("Documentos:", doc.data())
      setLatestItemList(latestItemList => [...latestItemList, doc.data()]);
    })
  }

  const onRefresh = () => {
    setRefreshing(true); 
    getLatestItemList();
    getSliderImage();
     getCategoryList();
    setRefreshing(false); 
  };

  return (
    <ScrollView className="py-8 px-4 bg-gray-100 flex-1"
      refreshControl={ 
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <LatestItems LatestItemsList={latestItemList}
        heading={'Adicionados Recentemente'}
      />
    </ScrollView>
  )
}