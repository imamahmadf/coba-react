import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormHelperText,
  Textarea,
  Alert,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";

function EditProperty(props) {
  const [propertyData, setPropertyData] = useState([]);
  const [old_img, setOld_img] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [name, setName] = useState("");
  const [image, setimage] = useState("");
  const [description, setDescription] = useState("");
  const [fileSizeMsg, setFileSizeMsg] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const handleFile = (event) => {
    if (event.target.files[0].size / 1024 > 1024) {
      setFileSizeMsg("File size is greater than maximum limit");
    } else {
      setSelectedFile(event.target.files[0]);
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(event.target.files[0]);
      formik.setFieldValue("image", event.target.files[0]);
    }
  };
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
  async function fetchData() {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/products/${props.match.params.id}`
      )
      .then((res) => {
        setName(res.data.product.name);
        setOld_img(res.data.product.image);
        setDescription(res.data.product.description);

        formik.values.name = res.data.product.name;
        formik.values.description = res.data.product.description;
        formik.values.old_img = res.data.product.image;
        formik.values.id = res.data.product.id;
      })
      .catch((err) => {
        //console.log(err.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      name,
      description,
      image: selectedFile,
      old_img,
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("name cannot be empty"),
      description: Yup.string().required("description cannot be empty"),
      old_img: Yup.string().required("required old img"),
    }),

    validateOnChange: false,
    onSubmit: async (value) => {
      const { name, description, image, old_img } = value;

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", old_img);
      formData.append("old_img", old_img);

      await axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/productsupdate/${props.match.params.id}`,
          formData
        )
        .then(async (res) => {
          console.log(res.data.product);
          history.push("/");
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box mt="80px">
      <Container mt="100px" maxW="1140px">
        <Flex mb="10px" w="100%" mx="auto">
          <Link to="/">
            <Button
              position="relative"
              borderRadius="0px"
              border="1px"
              borderColor="gray.200"
              bg="white"
              h="40px"
              me="20px"
              _hover={{
                background: "black",
                color: "white",
                borderColor: "black",
              }}
            >
              Back
            </Button>
          </Link>

          <Text fontWeight="900" fontSize="20px" color="black" px="5px">
            Edit Property
          </Text>
        </Flex>
      </Container>
      <Container maxW="1140px">
        <Image
          src={"http://127.0.0.1:8000/storage/" + old_img}
          alt="Room image"
          id="imgpreview"
          width="100%"
          height={{ ss: "210px", sm: "210px", sl: "650px" }}
          me="10px"
          mt="5px"
          mb="20px"
          overflow="hiden"
          objectFit="cover"
        />
        <FormControl my="20px">
          <FormHelperText>Max size: 1MB</FormHelperText>
          <Button
            variant="secondary"
            w="100%"
            onClick={() => inputFileRef.current.click()}
          >
            Edit Photo
          </Button>
          {fileSizeMsg ? (
            <Alert status="error" color="red" text="center">
              <i className="fa-solid fa-circle-exclamation"></i>
              <Text ms="10px">{fileSizeMsg}</Text>
            </Alert>
          ) : null}
        </FormControl>
        <FormControl mt="20px" id="name">
          <Input
            type="text"
            placeholder="Name Property"
            borderRadius="0"
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <Alert status="error" color="red" text="center">
              <i className="fa-solid fa-circle-exclamation"></i>
              <Text ms="10px">{formik.errors.name}</Text>
            </Alert>
          ) : null}
        </FormControl>

        <FormControl mb="20px">
          <Textarea
            id="description"
            height="180px"
            borderRadius="0px"
            placeholder="add description"
            value={formik.values.description}
            onChange={(e) =>
              formik.setFieldValue("description", e.target.value)
            }
          />
          {formik.errors.description ? (
            <Alert status="error" color="red" textAlign="center">
              <i className="fa-solid fa-circle-exclamation"></i>
              <Text ms="10px">{formik.errors.description}</Text>
            </Alert>
          ) : null}
        </FormControl>
        <FormControl>
          <Input
            onChange={handleFile}
            ref={inputFileRef}
            accept="image/png, image/jpeg"
            display="none"
            type="file"

            // hidden="hidden"
          />
        </FormControl>

        <Button
          variant="primary"
          w="100%"
          mb="40px"
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
        <Button
          onClick={onOpen}
          variant="solid"
          colorScheme="red"
          w="100%"
          mb="40px"
        >
          delete
        </Button>
      </Container>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader> Delete product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this product?</ModalBody>
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

export default EditProperty;
