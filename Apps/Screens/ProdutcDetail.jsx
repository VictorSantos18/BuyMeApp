import { View, Text, Image, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { useUser } from '@clerk/clerk-expo'
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'

export default function ProductDetail() {
  const { params } = useRoute()
  const [product, setProduct] = useState([])
  const { user } = useUser()
  const db = getFirestore(app)
  const nav = useNavigation()

  useEffect(() => {
    console.log(params)
    params && setProduct(params.product)
  }, [])

  const sendEmailMessage = () => {
    const subject = 'Regarding' + product.title;
    const body = "Oi!" + product.userName + "\n" + "me interessei por este produto"
    Linking.openURL('mailto:' + product.userEmail + "?subject=" + subject + "&body=" + body)
  }

  const deleteUserPost = () => {
    Alert.alert('Deletar o post?', 'Você quer mesmo fazer isso?', [
      {
        text: 'Sim',
        onPress: () => deleteFromFirestore()
      },
      { text: 'Não', onPress: () => console.log('cancelado') },
    ]);
  }

  const deleteFromFirestore = async () => {
    const q = query(collection(db, 'UserPost'), where('title', '==', product.title))
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      deleteDoc(doc.ref).then(resp => {
        console.log('Deletado');
        nav.goBack()
      })
    })

  }

  return (
    <ScrollView className='bg-gray-100 '>

      {/* Product Information */}
      <Image source={{ uri: product.image }}
        className='h-[320px] w-full'
      />
      <View className='p-3'>
        <View className='flex flex-row justify-between items-center'>
          <View className='items-baseline'>
            <Text className='text-[20px] font-bold text-gray-500'>{product.title}</Text>
            <Text className='text-[16px] p-1 px-2 rounded-full text-violet-200 bg-violet-500'>
              {product.category}
            </Text>
          </View>
          <View className=' flex flex-col items-end'>
            <Text className='p-2 bg-green-600 rounded-xl text-white'>Produto a venda</Text>
          </View>
        </View>
        {/* product description */}
        <Text className='text-[18px] mt-3 font-bold text-gray-400'>Descrição do produto</Text>
        <Text className='text-[16px] mb-3 text-gray-400'>{product.desc}</Text>

        {/* product price */}
        <Text className='text-violet-500 text-[20px] font-bold'>R$ {product.price}</Text>
      </View>

      <Text className='text-gray-400 text-[16px] p-2'>Adicionado por:</Text>
      {/* User Information */}
      <View className='bg-violet-200'>
        <View className='p-3 gap-2 flex flex-row items-center'>
          <Image source={{ uri: product.userImage }}
            className='w-10 h-10 rounded-full'
          />
          <View>
            <Text className=' font-bold text-[16px] text-gray-600'>{product.userName}</Text>
            <Text className=' text-gray-500'>{product.userEmail}</Text>
          </View>
        </View>
      </View>

      {user?.primaryEmailAddress.emailAddress == product.userEmail ?
        <TouchableOpacity
          onPress={() => deleteUserPost()}
          className='z-40 bg-red-500 p-3 m-6 rounded-full items-center'>
          <Text className='fixed text-white'>Apagar produto</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          onPress={() => sendEmailMessage()}
          className='z-40 bg-violet-500 p-3 m-6 rounded-full items-center'>
          <Text className='fixed text-white'>Falar com o vendedor</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  )
}