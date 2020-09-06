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
    marginTop: -160,
    color: 'white',
    fontSize: 65,
    fontWeight: 'bold',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 70,
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
  let [minute, setMinute] = useState(0);
  let [second, setSecond] = useState(50);
  let [active, setActive] = useState(false);
  let [lastTime, setLastTime] = useState([0, 0]);

  useEffect(() => {
    let timeControl = setInterval(() => {
      const minutos = minute;
      const segundos = second;
      if (segundos < 59) {
        setSecond(segundos + 1);
      } else {
        setMinute(minutos + 1);
        setSecond(0);
      }
    }, 1000);
    if (!active) {
      clearInterval(timeControl);
    }
    return () => clearInterval(timeControl);
  }, [active, minute, second]);

  function restartHandler() {
    setLastTime([minute, second]);
    setSecond(0);
    setMinute(0);
    setActive(false);
  }

  function startHandler() {
    setActive(!active);
    setLastTime([0, 0]);
  }

  return (
    <View style={styles.background}>
      <Image source={cronometro} />
      <Text style={styles.timer}>
        {minute < 10 ? `0${minute}` : minute}:
        {second < 10 ? `0${second}` : second}
      </Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={startHandler}>
          <Text style={styles.btnText}>{!active ? 'Vai' : 'Parar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={restartHandler}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.lastText}>
        {lastTime[0] === 0 && lastTime[1] === 0
          ? ''
          : `O último registro foi: ${lastTime[0]< 10 ? `0${lastTime[0]}` : lastTime[0]}:${lastTime[1]< 10 ? `0${lastTime[1]}` : lastTime[1]}`}
      </Text>
    </View>
  );
}
