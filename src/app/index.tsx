import { Link } from 'expo-router';
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import dayjs from 'dayjs';

const query = gql`
  query foodLogsForDate($date: Date!, $user_id: String!) {
    foodLogsForDate(date: $date, user_id: $user_id) {
      created_at
      food_id
      id
      kcal
      label
      user_id
    }
  }
`;

const HomeScreen = () => {
  const user_id = 'vadim';
  const { data, loading, error } = useQuery(query, {
    variables: {
      date: dayjs().format('YYYY-MM-DD'),
      user_id,
    },
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to fetch data</Text>
      </View>
    );
  }

  // Navigation options 
  const navOptions = [
    { title: 'Message', href: '/message' },
    { title: 'Workout', href: '/workouts' },
    { title: 'Progress', href: '/progress' },
    { title: 'Nutrition', href: '/nutrition' },
    { title: 'Community', href: '/community' },
    { title: 'Daily Challenges', href: '/challenges' },
    { title: 'Things To Do', href: '/todolist' },
    { title: 'Training Check In', href: '/checkin' },
    { title: 'Photo Progress', href: '/photoprogress' },
    { title: 'Calendar', href: '/calendar' },
    { title: 'Step Tracker', href: '/steps' },
  ];

  // Custom navigation button 
  const NavButton = ({ title, href }: { title: string; href: string }) => (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.navButton}>
        <Text style={styles.navButtonText}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>MENU</Text>
      <View style={styles.navContainer}>
        {navOptions.map((option, index) => (
          <NavButton key={index} title={option.title} href={option.href} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  navContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 8,
    minWidth: '40%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default HomeScreen;
