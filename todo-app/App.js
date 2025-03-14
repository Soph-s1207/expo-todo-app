import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, View } from 'react-native';
import { CheckBox } from '@rneui/themed';


export default function App() {
 // State to store tasks
 const [tasks, setTasks] = useState([
   { key: '1', description: 'Buy groceries', completed: false },
   { key: '2', description: 'Read a book', completed: false }
 ]);


 // State to store new task input
 const [newTask, setNewTask] = useState('');


 // Function to toggle completion status
 const toggleTaskCompletion = (taskKey) => {
   setTasks(tasks.map(task =>
     task.key === taskKey ? { ...task, completed: !task.completed } : task
   ));
 };


 // Function to add a new task
 const addTask = () => {
   if (newTask.trim() !== '') {
     setTasks([...tasks, { key: String(tasks.length + 1), description: newTask, completed: false }]);
     setNewTask('');
   }
 };


 // Render function for each task
 const renderItem = ({ item }) => (
   <View style={styles.taskContainer}>
     <CheckBox
       checked={item.completed}
       onPress={() => toggleTaskCompletion(item.key)}
     />
     <Text style={[styles.taskText, item.completed && styles.completedTask]}>
       {item.description}
     </Text>
   </View>
 );


 return (
   <SafeAreaView style={styles.container}>
     <FlatList
       data={tasks}
       renderItem={renderItem}
       keyExtractor={(item) => item.key}
     />
     <View style={styles.inputContainer}>
       <TextInput
         style={styles.input}
         placeholder="Enter new task"
         value={newTask}
         onChangeText={setNewTask}
       />
       <Button title="Add" onPress={addTask} />
     </View>
   </SafeAreaView>
 );
}


// Styles for UI components
const styles = StyleSheet.create({
 container: {
   flex: 1,
   paddingTop: 25,
   backgroundColor: '#fff'
 },
 taskContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   padding: 10
 },
 taskText: {
   fontSize: 18
 },
 completedTask: {
   textDecorationLine: 'line-through',
   textDecorationStyle: 'solid'
 },
 inputContainer: {
   flexDirection: 'row',
   padding: 10
 },
 input: {
   flex: 1,
   borderWidth: 1,
   borderColor: '#ccc',
   padding: 10,
   marginRight: 10
 }
});

