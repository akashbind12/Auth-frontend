import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { signupAPI } from '../redux/auth/api';
import { toast } from 'react-toastify';

const Signup = ()  => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    "fullName": "",
    "userName": "",
    "email": "",
    "mobile": "",
    "password": "",
  })

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    //check password match
    if(userDetails.password!==confirmPassword){
      toast.error('Passwords do not match', {
        position: "top-center",
        autoClose: 1000,
      });
      return
    }
    //empty field validation
    if(userDetails.fullName==="" || userDetails.userName==="" || userDetails.email==="" || userDetails.mobile==="" || userDetails.password===""){
      toast.error('fields can not be empty', {
        position: "top-center",
        autoClose: 1000,
      });
      return
    }
    //signup 
    try{
      await signupAPI(userDetails);
      toast.success("Registration successful", {
        position: "top-center",
        autoClose: 1000,
      });
      navigate("/login");
    }catch(error){
      // console.log("err:",error)
      toast.error(error, {
        position: "top-center",
        autoClose: 1000,
      });
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="fullName" isRequired>
              <FormLabel>Full name</FormLabel>
              <Input name="fullName" type="text" onChange={(e) => handleChange(e)} />
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="userName" type="text" onChange={(e) => handleChange(e)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input name="email" type="email" onChange={(e) => handleChange(e)} />
            </FormControl>
            <FormControl id="mobile" isRequired>
              <FormLabel>Mobile number</FormLabel>
              <Input name="mobile" type="tel" onChange={(e) => handleChange(e)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" onChange={(e) => handleChange(e)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirm_password" isRequired>
              <FormLabel>Confirm password</FormLabel>
              <InputGroup>
                <Input type={showConfirmPassword ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value)}  />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword) 
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={handleSubmit} >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'} >
                Already a user? <Link to="/login">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}


export default Signup;