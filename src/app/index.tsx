import { StyleSheet, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

const FoodListItem = ({ item }) => {
  return (
    <View 
        style={{ 
          backgroundColor: 'gainsboro', 
          padding: 10, 
          borderRadius: 5, 
          flexDirection: 'row',
          justifyContent: 'space-between', 
          alignItems: 'center', 
        }}
     >
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.label}</Text>
        <Text style={{ color: 'dimgray' }}>{item.cal} cal, {item.brand}</Text>    
      </View>  
        <AntDesign name="pluscircleo" size={24} color="royalblue" />
     </View>
  )

}

export default function App() {
  return (
  <View style={styles.container}>
       {/*Food Item View */}
       <FoodListItem item={{label: "Pizza", cal: 75, brand: 'Dominos' }}/>
       <FoodListItem item={{label: "Apple", cal: 50, brand: 'Generic' }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    padding: 10,
    gap: 5, 
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
