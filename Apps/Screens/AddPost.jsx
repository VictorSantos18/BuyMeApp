import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, Image, ToastAndroid, ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Pressable, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import { Camera, CameraType } from 'expo-camera'
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native';

export default function AddPost() {
  const db = getFirestore(app);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const storage = getStorage();
  const { user } = useUser();
  const [categoryList, setCategoryList] = useState([])
  const [image, setImage] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);


  useEffect(() => {
    getCategoryList();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const getCategoryList = async () => {
    try {
      const categoryRef = collection(db, 'Category');
      const querySnapshot = await getDocs(categoryRef);
      const categories = querySnapshot.docs.map(doc => doc.data());
      setCategoryList(categories);
    } catch (error) {
      console.error('Error fetching category list:', error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
    closeMenu();
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setCapturedImage(photo.uri);
      setImage(photo.uri);
      closeCamera();
      closeMenu();
    }
  };

  const onSubmitMethod = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, 'communityPost/' + Date.now() + ".jpg");

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      const postData = {
        ...values,
        image: downloadURL,
        userName: user.fullName,
        userEmail: user.primaryEmailAddress.emailAddress,
        userImage: user.imageUrl,
        createdAt: Date.now()
      };

      await addDoc(collection(db, 'UserPost'), postData);

      setLoading(false);
      Alert.alert("Sucesso", "Item adicionado com sucesso, boas vendas!");
      resetForm();
      setImage(null);
      setCapturedImage(null);
      navigation.navigate('explore');
    } catch (error) {
      setLoading(false);
      console.error('Error uploading file:', error);
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o item. Por favor, tente novamente mais tarde.");
    }
  };

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const openCamera = async () => {
    if (hasPermission === null) {
      console.log('Acesso não permitido ainda');
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      return;
    }
    if (hasPermission === false) {
      // Se o usuário negou a permissão, você pode exibir uma mensagem ou solicitar novamente
      console.log('Acesso à câmera negado');
      return;
    }
    // Se tiver permissão, então abra a câmera
    setCameraVisible(true);
  };

  const closeCamera = () => {
    setCameraVisible(false)
  };




  return (
    <KeyboardAvoidingView>
      <ScrollView className=' p-10 bg-gray-100 h-full'>
        <Text className='text-[25px] font-bold pb-2 text-violet-500'>Criar Nova Publicação</Text>
        <Formik
          initialValues={{ title: '', desc: '', category: '', address: '', price: '', image: '', userName: '', userEmail: '', userImage: '', createdAt: Date.now() }}
          onSubmit={(values, formik) => onSubmitMethod(values, formik)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
            <View>
              <TouchableOpacity onPress={openMenu}>
                {image ?
                  <Image source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 5 }}
                  />
                  :
                  <Image source={require('../../assets/placegolder.jpg')}
                    style={{ width: 100, height: 100, borderRadius: 5 }}

                  />}
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder='Titulo'
                value={values?.title}
                onChangeText={handleChange('title')}
              />
              <TextInput
                style={styles.input}
                placeholder='Descrição'
                value={values?.desc}
                numberOfLines={4}
                onChangeText={handleChange('desc')}
              />
              <TextInput
                style={styles.input}
                placeholder='Preço'
                value={values?.price}
                keyboardType='number-pad'
                onChangeText={handleChange('price')}
              />
              <TextInput
                style={styles.input}
                placeholder='Rua, Bairro'
                value={values?.address}
                onChangeText={handleChange('address')}
              />

              {/* dropdown para categoria do produto */}
              <View className='border rounded-xl'>
                <Picker
                  selectedValue={values?.category}
                  className='border-2 '
                  onValueChange={itemValue => setFieldValue('category', itemValue)}
                >
                  {categoryList.length > 0 && categoryList?.map((item, index) => (
                    item && <Picker.Item key={index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
                </Picker>
              </View>


              {/* Botão com efeito de loading após adicionar um novo item */}
              <TouchableOpacity
                style={{
                  backgroundColor: loading ? '#ccc' : '#7D32CE',
                }}
                disabled={loading}
                onPress={() => {
                  // Realiza a validação aqui antes de chamar handleSubmit
                  const requiredFields = ['title', 'desc', 'category', 'address', 'price'];
                  const formErrors = {};

                  requiredFields.forEach((field) => {
                    if (!values[field]) {
                      console.log(`${field} is missing`);
                      ToastAndroid.show(`${field} is missing`, ToastAndroid.SHORT);
                      formErrors[field] = `${field} is missing`;
                    }
                  });

                  if (Object.keys(formErrors).length === 0) {
                    handleSubmit();
                  }
                }}
                className='p-3 bg-violet-500 rounded-full mt-5'
              >
                {loading ?
                  <ActivityIndicator color="#fff" />
                  :
                  <Text className='text-white text-center text-[16px]'>Criar</Text>
                }
              </TouchableOpacity>
              {/* Modal para exibir o menu de fotos */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={isMenuVisible}
                onRequestClose={closeMenu}
              >

                <Pressable
                  className=' flex-1 justify-center items-center'
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                  onPress={closeMenu}
                >
                  <View className='flex flex-col justify-between bg-gray-200 p-8 rounded-2xl' >
                    <Text className='mb-5 text-[20px] text-gray-600'>Escolha uma opção</Text>
                    <View className='flex flex-row justify-between'>
                      <TouchableOpacity
                        onPress={pickImage}
                        className='flex items-center justify-center p-4 bg-gray-400 rounded-lg'
                      >
                        <Ionicons name="images-outline" size={24} color="black" />
                        <Text className='text-black'>
                          Galeria
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={openCamera}
                        className='flex items-center justify-center p-4 bg-gray-400 rounded-lg'
                      >
                        <Ionicons name="camera-outline" size={24} color="black" />
                        <Text className='text-black'>Câmera</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Pressable>
              </Modal>


              {/* camera em si aberta */}
              <Modal
                visible={cameraVisible}
                onRequestClose={closeCamera}
              >
                <View style={{ flex: 1 }}>
                  <Camera
                    style={{ flex: 1 }}
                    type={Camera.Constants.Type.back}
                    ref={(ref) => {
                      this.camera = ref;
                    }}
                  />
                  <TouchableOpacity onPress={takePicture} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, color: 'white' }}>Capturar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeCamera} style={{ position: 'absolute', top: 10, alignSelf: 'flex-end' }}>
                    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10 }}>X</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          )}

        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginTop: 10,
    textAlignVertical: 'top',
    marginBottom: 8,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 10,
    fontSize: 17,
    color: 'gray',
    borderColor: 'gray'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
})