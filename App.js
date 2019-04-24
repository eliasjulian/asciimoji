import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import SvgUri from "react-native-svg-uri";
import Emojigrid from "./components/contentgrid";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Navbar>
          <SvgUri
            width="180"
            height="35"
            source={require("./assets/logoblack.svg")}
          />
          <TouchableOpacity>
            <MenuToggle source={require("./assets/menuicon.png")} />
          </TouchableOpacity>
        </Navbar>
        <ScrollView>
          <Emojigrid />
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Navbar = styled.View`
  width: 100%;
  margin-top: 80px;
  padding-left: 20px;
  padding-bottom: 30px;
  background-color: white;
`;

const MenuToggle = styled.Image`
  width: 32px;
  height: 21px;
  position: absolute;
  right: 20;
  bottom: 5;
`;
