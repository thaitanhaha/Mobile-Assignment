import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

function ChartsTab({ data }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Traveling</Text>
            <Text style={styles.subtitle}>November</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Monthly</Text>
          </View>
        </View>

        <LineChart
          data={{
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={screenWidth - 40}
          height={200}
          chartConfig={{
            backgroundColor: '#f4f6f5',
            backgroundGradientFrom: '#f4f6f5',
            backgroundGradientTo: '#f4f6f5',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '0',
            },
          }}
          withHorizontalLines={false}
          withVerticalLines={false}
          bezier
          withDots={false}
          style={styles.chartStyle}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>A month ago</Text>
          <Text style={styles.footerText}>Today</Text>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f6f5',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6d6d6d',
  },
  tag: {
    backgroundColor: '#d3f8c4',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tagText: {
    color: '#007700',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chartStyle: {
    borderRadius: 12,
    alignItems: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 12,
    color: '#6d6d6d',
  },
});

export default ChartsTab;
