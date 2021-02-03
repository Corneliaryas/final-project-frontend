import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Earth_Happy from "../assets/Earth_Happy.svg";

import {
  Container,
  Button,
  Title,
  Paragraph,
  Image,
  StyledLink
} from "components/StyledComponents";
import { fetchQuestions } from "reducers/game";

export const Start = () => {
  const dispatch = useDispatch();
  const startGame = () => {
    dispatch(fetchQuestions());
  };

  return (
    <Container>
      <Image src={Earth_Happy} />
      <Title>Klimatspelet</Title>
      <Paragraph>Superkort information om spelet och klimatet</Paragraph>

      {/* Fix semantic/accessibility */}
      <Link to="/login">
        <Button>Logga in</Button>
      </Link>
      <Link to="/gameboard">
        <Button onClick={startGame}>Spela som gäst</Button>
      </Link>
      <StyledLink to="/signup">Skapa nytt konto
      </StyledLink>
    </Container>
  );
};
