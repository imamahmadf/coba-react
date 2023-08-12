import React from "react";
import {
  Card,
  Image,
  CardBody,
  Heading,
  CardFooter,
  Stack,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function card(props) {
  return (
    <Box m="2">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          src={"http://localhost:8000" + props.data.image}
          alt="property image"
          width="100px"
          height="70px"
          me="10px"
          overflow="hiden"
          objectFit="cover"
        />

        <Stack>
          <CardBody m="2">
            <Heading size="md">{props.data.name}</Heading>

            <Text py="2">{props.data.description}</Text>
          </CardBody>

          <CardFooter>
            <Link to={`/detail/${props.data.id}`}>
              <Button variant="solid" colorScheme="blue" me="2">
                Detail
              </Button>
            </Link>
            <Link to={`/edit/${props.data.id}`}>
              <Button variant="solid" colorScheme="yellow">
                Edit
              </Button>
            </Link>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}

export default card;
