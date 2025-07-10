import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector as useReduxSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setApps, toggleRestricted, loadRestrictedAppsThunk } from '../redux/slices/appListSlice';
import { removeTrigger } from '../redux/slices/triggersSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import { logout } from '../redux/slices/authSlice';
import { loadTriggersThunk } from '../redux/slices/triggersSlice';

const MOCK_APPS = [
  { id: '1', name: 'Instagram', icon: 'https://img.icons8.com/color/48/000000/instagram-new.png' },
  { id: '2', name: 'YouTube', icon: 'https://img.icons8.com/color/48/000000/youtube-play.png' },
  { id: '3', name: 'TikTok', icon: 'https://img.icons8.com/color/48/000000/tiktok--v1.png' },
  { id: '4', name: 'Facebook', icon: 'https://img.icons8.com/color/48/000000/facebook-new.png' },
  { id: '5', name: 'Twitter', icon: 'https://img.icons8.com/color/48/000000/twitter--v1.png' },
  { id: '6', name: 'Reddit', icon: 'https://img.icons8.com/color/48/000000/reddit.png' },
];

type Props = NativeStackScreenProps<any>;

const AppListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { apps, restricted } = useReduxSelector((state: RootState) => state.appList);
  const triggers = useReduxSelector((state: RootState) => state.triggers.triggers);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [activeTrigger, setActiveTrigger] = React.useState<{ type: string; value: string } | null>(null);

  useEffect(() => {
    dispatch(setApps(MOCK_APPS));
    (dispatch as any)(loadRestrictedAppsThunk());
    (dispatch as any)(loadTriggersThunk());
  }, [dispatch]);

  const handleSelect = (appId: string) => {
    dispatch(toggleRestricted(appId));
  };

  const handleAssignTrigger = (appId: string) => {
    navigation.navigate('TriggerAssign', { appId });
  };

  const handleShowMotivation = (appId: string) => {
    const trigger = triggers[appId];
    if (trigger) {
      setActiveTrigger(trigger);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Select Apps to Restrict</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => { dispatch(logout()); navigation.replace('Login'); }}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={apps}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isRestricted = restricted.includes(item.id);
          const trigger = triggers[item.id];
          return (
            <View style={[styles.card, isRestricted && styles.cardSelected]}>
              <TouchableOpacity style={styles.row} onPress={() => isRestricted && trigger ? handleShowMotivation(item.id) : handleSelect(item.id)}>
                <Image source={{ uri: item.icon }} style={styles.icon} />
                <Text style={styles.appName}>{item.name}</Text>
                <View style={[styles.checkbox, isRestricted && styles.checkboxSelected]} />
              </TouchableOpacity>
              {isRestricted && (
                <>
                  <TouchableOpacity
                    style={styles.assignButton}
                    onPress={() => handleAssignTrigger(item.id)}
                  >
                    <Text style={styles.assignButtonText}>{trigger ? 'Edit Trigger' : 'Assign Trigger'}</Text>
                  </TouchableOpacity>
                  {trigger && (
                    <View style={styles.triggerSummaryRow}>
                      <Text style={styles.triggerSummaryText}>
                        {trigger.type === 'text' ? '📝' : '🎬'} Trigger set
                      </Text>
                      <TouchableOpacity
                        style={styles.removeTriggerButton}
                        onPress={() => dispatch(removeTrigger(item.id))}
                      >
                        <Text style={styles.removeTriggerText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} style={styles.modal}>
        <View style={styles.modalContent}>
          {activeTrigger?.type === 'text' ? (
            <Text style={styles.motivationText}>{activeTrigger.value}</Text>
          ) : activeTrigger?.type === 'video' ? (
            <Video
              source={{ uri: activeTrigger.value }}
              style={styles.video}
              controls
              resizeMode="contain"
              fullscreen
            />
          ) : null}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEAA7',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C5CE7',
    marginBottom: 16,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#6C5CE7',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#00CEC9',
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 8,
  },
  appName: {
    flex: 1,
    fontSize: 18,
    color: '#2D3436',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6C5CE7',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#00CEC9',
    borderColor: '#00CEC9',
  },
  assignButton: {
    marginTop: 12,
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  assignButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  triggerSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  triggerSummaryText: {
    color: '#00B894',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeTriggerButton: {
    marginLeft: 12,
    backgroundColor: '#FD79A8',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  removeTriggerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  motivationText: {
    fontSize: 20,
    color: '#6C5CE7',
    marginBottom: 24,
    textAlign: 'center',
  },
  video: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
    backgroundColor: '#000',
  },
  closeButton: {
    backgroundColor: '#00CEC9',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
    width: 120,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#FD79A8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AppListScreen;