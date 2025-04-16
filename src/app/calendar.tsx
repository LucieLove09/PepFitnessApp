import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TextInput, Button, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface ScheduledItem {
  id: string;
  date: string;
  description: string;
}

const CalendarScreen: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemDescription, setItemDescription] = useState<string>('');
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([]);

  // Update date when a day is pressed
  const onDayPress = (day: { dateString: string; day: number; month: number; year: number; timestamp: number }) => {
    setSelectedDate(day.dateString);
  };

  // Saving the scheduled item
  const handleSaveItem = () => {
    if (itemDescription.trim().length > 0) {
      const newItem: ScheduledItem = {
        id: Date.now().toString(),
        date: selectedDate,
        description: itemDescription,
      };
      setScheduledItems([...scheduledItems, newItem]);
      setItemDescription('');
      setModalVisible(false);
    }
  };

  // Filter items for the selected date
  const scheduledForSelectedDate = scheduledItems.filter(item => item.date === selectedDate);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#00adf5' },
        }}
      />
      <Text style={styles.selectedText}>Selected Date: {selectedDate}</Text>

      <Button title="Schedule Item" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Schedule an Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter item description"
              value={itemDescription}
              onChangeText={setItemDescription}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => {
                setItemDescription('');
                setModalVisible(false);
              }} />
              <Button title="Save" onPress={handleSaveItem} />
            </View>
          </View>
        </View>
      </Modal>

      {/* List of scheduled items for the selected date */}
      <Text style={styles.itemsTitle}>Scheduled Items:</Text>
      {scheduledForSelectedDate.length === 0 ? (
        <Text style={styles.noItemsText}>No items scheduled for this date.</Text>
      ) : (
        <FlatList
          data={scheduledForSelectedDate}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text style={styles.itemText}>{item.description}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  selectedText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  noItemsText: {
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#666',
  },
  itemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CalendarScreen;