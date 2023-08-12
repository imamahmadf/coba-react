import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Image,
  Select,
  FormHelperText,
  Textarea,
  Alert,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";

function AddProperty() {
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileSizeMsg, setFileSizeMsg] = useState("");
  let history = useHistory();

  //console.log(TenantId);

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

  // formik

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: selectedFile,
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("name cannot be empty"),
      description: Yup.string().required("description cannot be empty"),
      image: Yup.string().required("image cannot be empty"),
    }),

    validateOnChange: false,
    onSubmit: async (value) => {
      //console.log("tess", value);
      const { name, description, image } = value;

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);

      //console.log("berhasil masuk formik");

      await axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/products`, formData)
        .then(async (res) => {
          //console.log(res.data);
          history.push("/");
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
  });

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
              me="10px"
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
            Add New Product
          </Text>
        </Flex>
      </Container>
      <Container maxW="1140px">
        <FormControl>
          <Image
            src={"/Assets/add_photo.png"}
            id="imgpreview"
            alt="Room image"
            width="100%"
            height={{ ss: "210px", sm: "210px", sl: "650px" }}
            me="10px"
            mt="20px"
            overflow="hiden"
            objectFit="cover"
          />
          {formik.errors.image ? (
            <Alert status="error" color="red" text="center">
              <i className="fa-solid fa-circle-exclamation"></i>
              <Text ms="10px">image cannot be empty</Text>
            </Alert>
          ) : null}
        </FormControl>
        <FormControl mt="20px">
          <FormHelperText>Max size: 1MB</FormHelperText>
          <Button
            variant="secondary"
            w="100%"
            onClick={() => inputFileRef.current.click()}
          >
            Add Photo
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
            placeholder="Name Product"
            borderRadius="0"
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
          {formik.errors.name ? (
            <Alert status="error" color="red" text="center">
              <i className="fa-solid fa-circle-exclamation"></i>
              <Text ms="10px">{formik.errors.name}</Text>
            </Alert>
          ) : null}
        </FormControl>

        <FormControl>
          <Textarea
            id="description"
            height="180px"
            mt="20px"
            borderRadius="0px"
            placeholder="add description"
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
          mt="20px"
          mb="40px"
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
      </Container>
    </Box>
  );
}

export default AddProperty;
