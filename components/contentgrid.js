import React, { Component } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Clipboard,
  Button,
  onPress
} from "react-native";
import { FlatGrid } from "react-native-super-grid";

class Emojigrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "WELL AT LEAST THE CLIPBOARD WORKS",
      clipboardContent: null
    };
  }

  writeToClipboard = async () => {
    await Clipboard.setString(this.state.text);
    alert("Boom, Copied");
  };

  render() {
    return (
      <FlatGrid
        itemDimension={130}
        items={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={this.writeToClipboard}>
            <View
              style={[styles.itemContainer, { backgroundColor: "#F7F7F7" }]}
            >
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
}

export default Emojigrid;

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

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    marginBottom: 400,
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
