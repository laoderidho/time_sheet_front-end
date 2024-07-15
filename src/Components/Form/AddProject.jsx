// MyModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../../config/API';
import SweetAlert from '../SweetAlert';

const AddProject = ({ show, handleClose }) => {
  const [project, setProject] = useState('')

  const closemyModal = () =>{
    handleClose(false)
  }

  const token = localStorage.getItem('token')

  // state alert 
  const [titleAlert, setTitleAlert] = useState('')
  const [messageAlert, setMessageAlert] = useState('')
  const [iconAlert, setIconAlert] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const submitProject = async () =>{
      try {
        await axios.post(`${API}/project/add`, 
            {
            name: project
            },
            {
              headers: {
              Authorization: token
            }})

        setTitleAlert('Berhasil')
        setMessageAlert('Project berhasil ditambahkan')
        setIconAlert('success')
        setShowAlert(true)
        setProject('')
        handleClose(false)
      } catch (error) {
        setTitleAlert('Gagal')
        setMessageAlert('Project gagal ditambahkan')
        setIconAlert('error')
        setShowAlert(true)
      }
  }

  return (
    <Modal show={show} onHide={handleClose} centered size='lg'>
      <SweetAlert
          show = {showAlert}
          title= {titleAlert}
          text = {messageAlert}
          icon = {iconAlert}
          onConfirm={()=>setShowAlert(false)}
      />
      <Modal.Header closeButton>
        <Modal.Title>TEST</Modal.Title>
      </Modal.Header>
      <Modal.Body>  
          <Form.Group >
            <Form.Label>Nama Proyek</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Nama Project" 
              onChange={(e) => setProject(e.target.value)}
            />
          </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" style={{ color: '#F15858', backgroundColor: 'white' }} onClick={closemyModal}>
            Kembali
        </Button>
        <Button variant="danger" style={{ backgroundColor: '#F15858' }} onClick={submitProject}>
              Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProject;
