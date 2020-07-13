import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Icon, Overlay, Input, Button } from 'react-native-elements';
import { database } from '../../config/firebase';


const TaskScreen = ({navigation, route}) => {
  const {current, next} = route.params;
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const table = 'task';

  const toggleOverlay = () => {
    setVisible(!visible);
    setTitle("");
  };

  const addItem = async () => {
    try {
      database.collection(table).add({
        title: title,
        status: current
      });

      setVisible(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const updateItem = async (id) => {
    try {
      database.collection(table).doc(id).update({
        status: next
      });

      setVisible(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      database.collection(table).doc(id).delete();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    database
      .collection(table)
      .where('status', '==', current)
      .onSnapshot((query) => {
        const items = [];
        query.forEach((doc) => {
          items.push({ ...doc.data(), id: doc.id })
        });
        setData(items);
      });
  }, []);

  const renderItem = ({item}) => <ListItem bottomDivider title={item.title} rightElement={
    <View style={{flexDirection: 'row'}}>
      <Icon color="#f45" name="delete" reverse onPress={() => removeItem(item.id)}/>
      {next && (
        <Icon color="#495" name="arrow-forward" reverse onPress={() => updateItem(item.id)}/>
      )}      
    </View>
  }/>

  return(
    <View style={{flex: 1}}>
      <FlatList data={data} renderItem={renderItem}/>
      <Icon onPress={toggleOverlay} name="add" color="#f05" reverse containerStyle={{position: 'absolute', right: 20, bottom: 20}}/>
      <Overlay overlayStyle={{width: 300}} isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={{marginBottom: 20, fontWeight: "bold"}}>Tarefa</Text>
        <Input value={title} onChangeText={setTitle} placeholder="Qual a sua tarefa?"/>
        <Button title="Adicionar" onPress={addItem}></Button>
      </Overlay>
    </View>
  );
}

export default TaskScreen;