import { Brand, InputField } from '@/Components'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Image,
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { student_login } from '@/Services/modules/users/Api/student_api'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#314252',
  },
  inputArea: {
    width: '100%',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  TextInput: {
    marginBottom: 15,
  },
  headerImage: {
    height: '28%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  header: {
    fontSize: 40,
    color: '#ffff',
    margin: 15,
  },
  forgotPassword: {
    alignItems: 'center',
  },
  textForgotPassword: {
    fontSize: 18,
    color: '#6c7a7d',
  },
  loginButton: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#2d86ab',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  textLoginButton: {
    fontSize: 20,
    color: 'white',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d7d7d7',
  },
  inputField: {
    padding: 10,
    fontSize: 17,
    width: '90%',
    color: 'black',
  },
})

const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState('eye')

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-slash')
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === 'eye-slash') {
      setRightIcon('eye')
      setPasswordVisibility(!passwordVisibility)
    }
  }

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  }
}

const Login = ({ navigation }) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility()

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = () => {
    student_login({
      email: data.email,
      password: data.password,
    })
      .then(result => {
        console.log(result.data)
        if (result.data.code == 200) {
          AsyncStorage.setItem('AccessToken', result.data.data.token)
          AsyncStorage.setItem('data', result.data.data)
          navigation.replace('Home')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require('../Assets/Images/LOGO.png')}
      />
      <Text style={styles.header}>IPS Academy</Text>
      <View style={styles.inputArea}>
        <InputField
          name="email"
          label="Email"
          variant="standard"
          onChangeText={value => setData(prev => ({ ...prev, email: value }))}
          value={data.email}
        />
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={value =>
              setData(prev => ({ ...prev, password: value }))
            }
            style={styles.inputField}
            value={data.password}
            name="password"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            secureTextEntry={passwordVisibility}
            enablesReturnKeyAutomatically
          />
          <Icon
            onPress={handlePasswordVisibility}
            name={rightIcon}
            size={22}
            color="grey"
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.textLoginButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.textForgotPassword}>forgot password</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login
