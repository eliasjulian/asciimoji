import React from "react";
import styled from "styled-components";

const Card = props => (
  <Container>
    <Cover />
  </Container>
);

export default Card;

const Container = styled.View`
  background: #f7f7f7;
  height: 100%;
  width: 45%;
  margin-top: 150px;
  margin-left: 20px;
`;

const Cover = styled.View`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
