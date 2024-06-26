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
import { toast } from 'react-toastify';
import { signup } from '../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    "fullName": "",
    "userName": "",
    "email": "",
    "mobile": "",
    "password": "",
  })

  const authState = useSelector(state => state.auth);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    //check password match
    if (userDetails.password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-center",
        autoClose: 1000,
      });
      return
    }
    // Check if any field is empty
    if (Object.values(userDetails).some(value => value === "")) {
      toast.error('Fields cannot be empty', {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    // Check email and mobile format
    if (!isValidEmail(userDetails.email)) {
      toast.error('Invalid email address', {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    if (!isValidMobile(userDetails.mobile)) {
      toast.error('Invalid mobile number', {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    //signup 
    dispatch(signup(userDetails,navigate))
  }


  const isValidEmail = (email) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  }

  const isValidMobile = (mobile) => {
    const re = /^\d{10}$/;
    return re.test(mobile);
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
                <Input type={showConfirmPassword ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value)} />
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
                isLoading={authState.signupLoading}
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