import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const PriceTabs = styled.div`
  /* width: 50px;
  height: 50px;
  border: 2px;
  border-color: black;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5); */
`;
const PriceTab = styled.div``;
function Price() {
  return (
    <Container>
      <PriceTabs>hi</PriceTabs>
    </Container>
  );
}

export default Price;
