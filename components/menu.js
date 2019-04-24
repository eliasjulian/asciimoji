import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  render() {
    return <Menu />;
  }
}

export default Menu;

const Menu = styled.View`
  flex: 1;
  background-color: black;
  height: ${screenHeight};
`;
