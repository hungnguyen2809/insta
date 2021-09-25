import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { counterActions, selectCount } from 'src/redux/counter/slice';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const counter = useAppSelector(selectCount);

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleCount}>{counter}</Text>
      <TouchableOpacity onPress={increment} style={styles.btnAction}>
        <Text style={styles.titleAction}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decrement} style={styles.btnAction}>
        <Text style={styles.titleAction}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleCount: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  btnAction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginHorizontal: '10%',
    marginVertical: 20,
    height: 30,
    borderRadius: 3,
  },
  titleAction: {
    color: '#fff',
    fontSize: 20,
  },
});
