import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTrigger, Trigger } from '../redux/slices/triggersSlice';
import { RootState } from '../redux/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// For now, just mock video selection
const MOCK_VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4';

type Props = NativeStackScreenProps<any>;

const TriggerAssignScreen: React.FC<Props> = ({ route, navigation }) => {
  const { appId } = route.params || {};
  const dispatch = useDispatch();
  const isPremium = useSelector((state: RootState) => state.subscription.isPremium);
  const [text, setText] = useState('');
  const [video, setVideo] = useState<string | null>(null);

  const handleSave = () => {
    if (!text && !video) {
      Alert.alert('Please enter a motivational text or select a video.');
      return;
    }
    const trigger: Trigger = video
      ? { type: 'video', value: video }
      : { type: 'text', value: text };
    dispatch(setTrigger({ appId, trigger }));
    navigation.goBack();
  };

  const handleSelectVideo = () => {
    // In real app, show video picker or library
    setVideo(MOCK_VIDEO_URL);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Trigger</Text>
      <Text style={styles.label}>Motivational Text</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter motivational message"
        value={text}
        onChangeText={setText}
        multiline
      />
      {isPremium && (
        <>
          <Text style={styles.label}>Or Select Motivational Video</Text>
          <TouchableOpacity style={styles.button} onPress={handleSelectVideo}>
            <Text style={styles.buttonText}>{video ? 'Video Selected' : 'Select Video'}</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Trigger</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEAA7',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C5CE7',
    marginBottom: 24,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: '#2D3436',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#6C5CE7',
    marginBottom: 16,
    minHeight: 60,
  },
  button: {
    backgroundColor: '#00CEC9',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TriggerAssignScreen;