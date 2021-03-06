/* eslint-disable react-native/no-inline-styles */
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import InputField from 'src/components/FormFields/InputField';
import { LoginForm } from 'src/models';
import { RootAuthParamList } from 'src/navigations/models';
import { authActions, selectAuthError, selectAuthLoading } from 'src/redux/auth/slice';
import { Colors, DeviceUiInfo } from 'src/utils';
import * as yup from 'yup';
import { styles } from './styles';

type LoginScreenNavigation = NativeStackNavigationProp<RootAuthParamList, 'LOGIN_SCREEN'>;

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng nhập địa chỉ e-mail.')
    .email('E-mail không đúng định dạng.')
    .typeError('Vui lòng nhập địa chỉ e-mail.'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu.')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự.')
    .typeError('Vui lòng nhập mật khẩu.'),
});

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigation>();

  const loadingLogin = useAppSelector(selectAuthLoading);
  const errorLogin = useAppSelector(selectAuthError);

  const [showPass, setShowPass] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onDismissSnackbar = () => {
    dispatch(authActions.onResetError());
  };

  const onShowPass = () => {
    setShowPass(!showPass);
  };

  const onSubmitLogin = (data: LoginForm) => {
    dispatch(authActions.loginAccount(data));
  };

  const onNavigateRegisterScreen = () => {
    resetForm({ email: '', password: '' });
    navigation.navigate('REGISTER_SCREEN');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={DeviceUiInfo.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.logo}>
            <Text style={styles.titleLogo} allowFontScaling={false}>
              Insta App
            </Text>
          </View>
          <View style={styles.content}>
            <InputField
              containerStyles={styles.textInputEmail}
              style={styles.contentInput}
              name={'email'}
              keyboardType={'email-address'}
              maxLength={35}
              control={control}
              placeholder={'...@examp.com'}
              iconLeft={<MaterialIcons name={'email'} size={20} color={Colors.dodgerblue} />}
            />
            <InputField
              containerStyles={styles.textInputPass}
              style={styles.contentInput}
              name={'password'}
              maxLength={20}
              control={control}
              placeholder={'12345@123...'}
              iconLeft={<MaterialIcons name={'vpn-key'} size={20} color={Colors.dodgerblue} />}
              secureTextEntry={!showPass}
              iconRight={
                showPass ? (
                  <Ionicons name={'eye'} size={20} color={Colors.dimgrey} />
                ) : (
                  <Ionicons name={'eye-off'} size={20} color={Colors.dimgrey} />
                )
              }
              onPressRight={onShowPass}
            />
            <View style={styles.warpAction}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnLogin}
                onPress={handleSubmit(onSubmitLogin)}>
                {loadingLogin && (
                  <ActivityIndicator color={Colors.lime} style={{ marginRight: 5 }} />
                )}
                <Text allowFontScaling={false} style={styles.loginTitle}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <Text style={styles.textHaveAccount} allowFontScaling={false}>
                Bạn chưa có tài khoản?
              </Text>
              <View style={styles.btnCreate}>
                <TouchableOpacity activeOpacity={0.8} onPress={onNavigateRegisterScreen}>
                  <Text allowFontScaling={false} style={styles.textCreate}>
                    Tạo mới tài khoản
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.textHaveAccount} allowFontScaling={false}>
                ----- HOẶC -----
              </Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.btnLoginOther}>
                <Text allowFontScaling={false} style={styles.loginTitle}>
                  Tiếp tục với Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Snackbar
        visible={errorLogin.status}
        onDismiss={onDismissSnackbar}
        duration={Snackbar.DURATION_SHORT}>
        {errorLogin.message}
      </Snackbar>
    </SafeAreaView>
  );
};

export default LoginScreen;
