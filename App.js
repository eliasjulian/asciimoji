import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import SvgUri from "react-native-svg-uri";
import Card from "./components/contentgrid";

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <ScrollView>
          <Navbar>
            <SvgUri
              width="180"
              height="35"
              source={require("./assets/logoblack.svg")}
            />
            <Menu source={require("./assets/menuicon.png")} />
          </Navbar>
          <Card />
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
  position: absolute;
`;

const Menu = styled.Image`
  width: 35px;
  height: 23px;
  position: absolute;
  right: 20;
  top: 5;
`;
