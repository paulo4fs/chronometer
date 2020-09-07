import React, {useState, useEffect} from 'react';
import cronometro from './src/assets/images/cronometro.png';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#00aeef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    marginTop: -145,
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 80,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  lastText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
  },
});
export default function App() {
  let [second, setSecond] = useState(0);
  let [active, setActive] = useState(false);
  let [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    let timeControl = null;
    if (active) {
      timeControl = setInterval(() => {
        setSecond(() => second + 1);
      }, 1000);
    } else {
      clearInterval(timeControl);
    }
    return () => clearInterval(timeControl);
  }, [active, second]);

  function restartHandler() {
    setLastTime(second);
    setSecond(0);
    setActive(false);
  }

  function startHandler() {
    setActive(!active);
    setLastTime(0);
  }

  return (
    <View style={styles.background}>
      <Image source={cronometro} />
      <Text style={styles.timer}>{second.toFixed(0)}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={startHandler}>
          <Text style={styles.btnText}>{!active ? 'Vai' : 'Parar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={restartHandler}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.lastText}>
        {lastTime !== 0 ? `O último registro foi: ${lastTime.toFixed(0)}` : ''}
      </Text>
    </View>
  );
}
