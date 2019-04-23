import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatGrid } from "react-native-super-grid";

class Emojigrid extends Component {
  render() {
    const items = [
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" },
      { name: "¯_(ツ)_/¯" },
      { name: "ʕ·͡ᴥ·ʔ" },
      { name: "•`_´•" }
    ];

    return (
      <FlatGrid
        itemDimension={130}
        items={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={2}
        renderItem={({ item, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: "#F7F7F7" }]}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        )}
      />
    );
  }
}

export default Emojigrid;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    height: 125
  },
  itemName: {
    fontSize: 18,
    color: "black",
    fontWeight: "400"
  }
});
