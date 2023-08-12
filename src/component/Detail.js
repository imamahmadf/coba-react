import axios from "axios";
import React, { useEffect, useState } from "react";
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
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";

import { useDisclosure } from "@chakra-ui/react";

function Detail(props) {
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  async function fetchData() {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/products/${props.match.params.id}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.product);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const deleteBtnHandler = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/productsdelete/${props.match.params.id}`
      )
      .then((res) => {
        onClose();
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Text>tes ini detail</Text>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          src={
            process.env.REACT_APP_BACKEND_BASE_URL + "/storage/" + data.image
          }
          alt="property image"
          width="100px"
          height="70px"
          me="10px"
          overflow="hiden"
          objectFit="cover"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{data.name}</Heading>

            <Text py="2">{data.description}</Text>
          </CardBody>

          <CardFooter>
            <HStack>
              <Link to="/">
                <Button variant="solid" colorScheme="blue">
                  Back
                </Button>
              </Link>
              <Button variant="solid" colorScheme="yellow">
                edit
              </Button>
              <Button onClick={onOpen} variant="solid" colorScheme="red">
                delete
              </Button>
            </HStack>
          </CardFooter>
        </Stack>
      </Card>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader> Delete room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this room?</ModalBody>
          <ModalCloseButton />

          <ModalFooter>
            <Button
              onClick={deleteBtnHandler}
              borderRadius={0}
              colorScheme="red"
              mr={3}
            >
              Delete
            </Button>
            <Button borderRadius={0} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Detail;
