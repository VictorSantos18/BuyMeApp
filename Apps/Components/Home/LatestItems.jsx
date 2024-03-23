import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PostItem from './postItem';

export default function LatestItems({ LatestItemsList, heading }) {

  // Agrupando os itens em pares
  const groupedItems = LatestItemsList.reduce((acc, item, index) => {
    const groupIndex = Math.floor(index / 2);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(item);
    return acc;
  }, []);

  return (
    <View className='mb-12 mt-3'>
      <Text className='font-bold text-[20px] mb-3 text-violet-500'>{heading}</Text>
      <ScrollView>
        {groupedItems.map((group, groupIndex) => (
          <View key={groupIndex} className='flex-row'>
            {group.map((item, index) => (
              <PostItem key={index} item={item} />
            ))}
            {/* Verifica se a quantidade de itens no grupo é ímpar e aplica um estilo especial ao último item */}
            {group.length % 2 !== 0 && (
              <View className='flex-1' /> // Item vazio para ocupar o espaço restante
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
