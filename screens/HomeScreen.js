import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing
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
        <Menu />
        <SafeAreaView>
          <Navbar>
            <SvgUri
              width="180"
              height="35"
              source={require("../assets/logoblack.svg")}
            />
            <TouchableOpacity onPress={this.props.openMenu}>
              <MenuToggle source={require("../assets/menuicon.png")} />
            </TouchableOpacity>
          </Navbar>
          <ScrollView>
            <Emojigrid />
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
  background-color: white;
  opacity: 1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Navbar = styled.View`
  width: 100%;
  margin-top: 40px;
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
