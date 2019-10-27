import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Clipboard
} from "react-native";
import { FlatGrid } from "react-native-super-grid";

class Emojigrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  writeToClipboard = async text => {
    await Clipboard.setString(text);
    alert("Boom, copied.");
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
          <TouchableOpacity onPress={() => this.writeToClipboard(item.name)}>
            <View
              style={[styles.itemContainer, { backgroundColor: "#1F1F1F" }]}
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
  { name: "¯＼_(ツ)_／¯" },
  { name: "ʕ·͡ᴥ·ʔ" },
  { name: "•`_´•" },
  { name: "( •͡˘ _•͡˘)ノð" },
  { name: "ツ" },
  { name: "( ͡° ͜ʖ ͡°)" },
  { name: "ಠ_ಠ" },
  { name: "( •_•)" },
  { name: "(⌐■_■)" },
  { name: "༼ つ ◕_◕ ༽つ" },
  { name: "ʕ•ᴥ•ʔ" },
  { name: "•ᴗ•" },
  { name: "(╯°□°)╯︵" },
  { name: "ಠᴗಠ" },
  { name: "(•̀ᴗ•́)و ̑̑" },
  { name: "ฅ^•ﻌ•^ฅ" },
  { name: "ಥ_ಥ" },
  { name: "◕_◕" },
  { name: "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]" },
  { name: "(づ￣ ³￣)づ" },
  { name: "(⊙_☉)" },
  { name: "ლ(ಠ_ಠლ)" },
  { name: "ᕦ(ò_óˇ)ᕤ" },
  { name: "(ง •̀_•́)ง" },
  { name: "(ﾉ◕ヮ◕)ﾉ*:" },
  { name: "ʘ‿ʘ" },
  { name: "( ˇ෴ˇ )" },
  { name: "( ˘ ³˘)♥" },
  { name: "(◕‿◕✿)" },
  { name: "(~‾▿‾)~" },
  { name: "(╥_╥)" },
  { name: "(☉_☉)" },
  { name: "(=ↀωↀ=)" },
  { name: "ᕙ(⇀‸↼‶)ᕗ" },
  { name: "V●ᴥ●V" },
  { name: "◔_◔" },
  { name: "¯＼_(⊙_ʖ⊙)_／¯" },
  { name: "(/•-•)/" },
  { name: "｡^‿^｡" },
  { name: "(●__●)" },
  { name: "ヽ(。_°)ノ" },
  { name: "(◍•﹏•)" },
  { name: "ヽ(ﾟДﾟ)ﾉ" },
  { name: "(ᴗ˳ᴗ)" },
  { name: "(•̀o•́)ง" },
  { name: "¯＼_( ͡° ͜ʖ ͡°)_／¯" },
  { name: "ヽ(°◇° )ノ" },
  { name: "┌П┐(ಠ_ಠ)" },
  { name: "(◕ω◕)♡" },
  { name: "ヾ(⌐■_■)ノ♪" },
  { name: "ヾ(^_^ )ゞ" },
  { name: "( ͡° ͜ʖ ( ͡° ͜ʖ ͡°) ͜ʖ ͡°)" },
  { name: "(‘◉⌓◉’)" },
  { name: "༼つಠ益ಠ༽つ" },
  { name: "(°o°)" },
  { name: "※＼(^o^)／※" },
  { name: "(✜︵✜)" },
  { name: "୧(▲ᴗ▲)ノ" },
  { name: "♥‿♥" },
  { name: "ʕ •́؈•̀)" },

];

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    marginBottom: 120,
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
    color: "white",
    fontWeight: "400"
  }
});
