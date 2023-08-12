import Card from "./card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Center,
  Box,
  HStack,
  Button,
  Spacer,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  async function fetchProperty() {
    await axios
      .get(`http://localhost:8000/api/product/products`)
      .then((res) => {
        console.log(res.data.products);
        setData(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <>
      <HStack>
        <Box p="5">
          <Heading size="md">React-laravel</Heading>
        </Box>
        <Spacer />
        <Link to="/add-product">
          <Button colorScheme="blue" me="3">
            Add product +
          </Button>
        </Link>
      </HStack>
      <Center color="white">
        <Flex>
          {data.map((val, idx) => {
            return <Card data={val} key={idx} />;
          })}
        </Flex>
      </Center>
    </>
  );
}

export default Home;
