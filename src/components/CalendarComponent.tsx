import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const onDayPress = (day: { dateString: string; day: number; month: number; year: number; timestamp: number }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        // Mark selected date calendar
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#00adf5' },
        }}
      />
      <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, 
    paddingHorizontal: 10,
  },
  selectedDateText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
});

export default CalendarComponent;
