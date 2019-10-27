import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StatusBar
} from "react-native";
import styled from "styled-components";
import SvgUri from "react-native-svg-uri";
import Emojigrid from "../components/contentgrid";
import Menu from "../components/menu";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      })
  };
}

class HomeScreen extends React.Component {
  state = {
    opacity: new Animated.Value(1)
  };

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ opacity: this.state.opacity }}>
        <StatusBar barStyle="light-content" translucent={true} />
        <Menu />
        <SafeAreaView>
          <Navbar>
            <SvgUri
              width="180"
              height="35"
              fill="white"
              source={require("../assets/logoblack.svg")}
            />
            <TouchableOpacity onPress={this.props.openMenu}>
              <MenuToggle source={require("../assets/menuicon.png")} />
            </TouchableOpacity>
          </Navbar>
          <ScrollView>
            <Emojigrid />
            <FooterText>Tap to copy, paste anywhere.</FooterText>
            <FooterEmoji>(｡◕‿‿◕｡)</FooterEmoji>
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const Container = styled.View`
  flex: 1;
  background-color: black;
  opacity: 1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Navbar = styled.View`
  width: 100%;
  margin-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  background-color: black;
`;

const MenuToggle = styled.Image`
  width: 40px;
  height: 25px;
  position: absolute;
  right: 20;
  bottom: 5;
`;

const FooterText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 500;
  width: 150px;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 25px;
`;

const FooterEmoji = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 500;
  width: 150px;
  margin-top: 20px;
  margin-bottom: 150px;
  margin-left: 25px;
`;
