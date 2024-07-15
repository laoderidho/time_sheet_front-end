import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../config/API';
import SweetAlert from '../Components/SweetAlert';

const Setting = () => {
  const [rate, setRate] = useState('');
  const [name, setName] = useState('');

  const [titleAlert, setTitleAlert] = useState('')
  const [messageAlert, setMessageAlert] = useState('')
  const [iconAlert, setIconAlert] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const token = localStorage.getItem('token');

  // Function to format number to Indonesian Rupiah format
  const formatToRupiah = (value) => {
    // Remove non-numeric characters from input value
    const numericValue = value.replace(/\D/g, '');

    // Format numeric value to Indonesian Rupiah format
    const formattedValue = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numericValue);
    return formattedValue;
  };

  // Function to fetch data from API
  const getDataProfile = async () => {
    try {
      const res = await axios.get(`${API}/auth/profile`, {
        headers: {
          Authorization: token,
        },
      });
      setName(res.data.name);
      // Format rate received from API
      const formattedRate = formatToRupiah(res.data.rate.toString());
      setRate(formattedRate);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataProfile();
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  useEffect(()=>{
     if(showAlert){
        setTimeout(() =>{
            setShowAlert(false)
          },[3000])
     }
  },[showAlert])

  const handleChangeRate = (event) => {
    const { value } = event.target;
    const formattedValue = formatToRupiah(value);
    setRate(formattedValue);
  };

  const updateProfile = async () =>{
    const numericRate = rate.replace(/\D/g, '');
    const rateInt = parseInt(numericRate, 10);
    
    try {
        await axios.post(`${API}/auth/update`, {
          name,
          rate: rateInt
        },
        {
          headers:{
            Authorization: token
          }
        })

        setTitleAlert('Berhasil')
        setMessageAlert('Update Profile Berhasil')
        setIconAlert('success')
        setShowAlert(true)
        getDataProfile();

    } catch (error) {
      console.log(error)
    }
  }

  const cancelHandle = () =>{
    getDataProfile();
  }

  return (
    <Navigation>
    <SweetAlert
        title={titleAlert}
        message={messageAlert}
        icon={iconAlert}
        show={showAlert}
        setShow={setShowAlert}
    />
      <div className='content-setting d-flex justify-content-center align-items-center'>
        <Card className='card-setting'>
          <CardBody>
            <Form className='m-4'>
              <Form.Group>
                <Form.Label>Nama Karyawan</Form.Label>
                <Form.Control
                  type='text'
                  className='w-100'
                  placeholder='Nama Karyawan'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mt-3 mb-3'>
                <Form.Label>Rate</Form.Label>
                <InputGroup>
                  <Form.Control
                    type='text'
                    className='w-75'
                    value={rate}
                    onChange={handleChangeRate}
                    placeholder='Rate'
                  />
                  <InputGroup.Text>/jam</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <div className='d-flex justify-content-between'>
                <button className='w-50 btn cancel-setting-button' onClick={cancelHandle} > {/* Tombol Batalkan */}
                  Batalkan
                </button>
                <Button variant='primary' className='w-50' onClick={updateProfile}> {/* Tombol Login */}
                  Simpan
                </Button>
              </div>
            </Form>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    </Navigation>
  );
};

export default Setting;
