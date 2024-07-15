import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { API } from '../../config/API';
import SweetAlert from '../SweetAlert';

const Jadwal = ({ showModal, setShowModal, isUpdated, ObjectData }) => {
  const [judulKegiatan, setJudulKegiatan] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalBerakhir, setTanggalBerakhir] = useState('');
  const [jamMulai, setJamMulai] = useState('');
  const [jamBerakhir, setJamBerakhir] = useState('');
  const [project, setProject] = useState('');
  const [dataProject, setDataProject] = useState([]);
  const token = localStorage.getItem('token');


//   state alert 
  const [titleAlert, setTitleAlert] = useState('')
  const [messageAlert, setMessageAlert] = useState('')
  const [iconAlert, setIconAlert] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const tgReff = useRef()
  const tbReff = useRef()
  const jmReff = useRef()
  const jbReff = useRef()
  const titleReff = useRef()
  const projectReff = useRef()
  const buttonReff = useRef()


  const handleKey = (e, nextRef) => {
      if (e.key === 'Enter' && nextRef.current) {
          nextRef.current.focus()
      } else if (e.key === 'Enter') {
          submitRef.current.focus()
      }
  }

  const getDataProject = async () => {
    try {
      const res = await axios.get(`${API}/project`, {
        headers: {
          Authorization: token,
        },
      });
      setDataProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataEdit = () =>{
    if(isUpdated){  
      setJudulKegiatan(ObjectData.title)
      setTanggalMulai(ObjectData.tanggal_mulai)
      setTanggalBerakhir(ObjectData.tanggal_selesai)
      setJamMulai(ObjectData.jam_mulai)
      setJamBerakhir(ObjectData.jam_selesai)
      setProject(ObjectData.projectId)
    }else{
      setJudulKegiatan('')
      setTanggalMulai('')
      setTanggalBerakhir('')
      setJamMulai('')
      setJamBerakhir('')
      setProject('')
    }
  }

  useEffect(() => {
    if (showModal) {
      getDataProject();
      getDataEdit()
    }
  }, [showModal]);


  const handleClose = () => setShowModal(false);

  const handleProjectChange = (e) => {
    setProject(e.target.value);
  };

//   add Jadwal
  const addJadwal = async ()=>{
    try {
        await axios.post(`${API}/jadwal/add`, {
            title: judulKegiatan,
            projectId: parseInt(project),
            tanggal_mulai: tanggalMulai,
            tanggal_selesai: tanggalBerakhir,
            jam_mulai: jamMulai,
            jam_selesai: jamBerakhir
        },
        {
            headers:{
                Authorization: token
            }
        })
        setTitleAlert('Berhasil')
        setMessageAlert('Tambah Jadwal Kegiatan Baru Berhasil')
        setIconAlert('success')
        setShowAlert(true)
        setShowModal(false)
    } catch (error) {
        setTitleAlert('gagal')
        setMessageAlert(error.response.data.message)
        setIconAlert('error')
        setShowAlert(true)
    }
  }


  // edit Jadwal 
  const editJadwal = async (id) =>{
    console.log(jamMulai.substring(0,5))
    try {
      await axios.put(`${API}/jadwal/update/${id}`, {
        title: judulKegiatan,
        projectId: parseInt(project),
        tanggal_mulai: tanggalMulai,
        tanggal_selesai: tanggalBerakhir,
        jam_mulai: jamMulai.substring(0,5),
        jam_selesai: jamBerakhir.substring(0,5)
      },
      {
        headers:{
          Authorization: token
        }
      })
      setTitleAlert('Berhasil')
      setMessageAlert('Jadwal Berhasil Di Update')
      setIconAlert('success')
      setShowAlert(true)
      setShowModal(false)
    } catch (error) {
      setTitleAlert('Gagal')
      setMessageAlert(error.response.data.message)
      setIconAlert('error')
      setShowAlert(true)
    }
  }
  return (
    <Modal show={showModal} onHide={handleClose} centered size="xl">
    <SweetAlert
        show = {showAlert}
        title= {titleAlert}
        text = {messageAlert}
        icon = {iconAlert}
        onConfirm={()=>setShowAlert(false)}
     />
      <Modal.Header closeButton>
        <Modal.Title>Tambah Kegiatan Baru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group controlId="formTanggalMulai">
              <Form.Label>Tanggal Mulai</Form.Label>
              <Form.Control
                type="date"
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                ref={tgReff}
                onKeyDown={(e)=>handleKey(e, tbReff)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTanggalBerakhir">
              <Form.Label>Tanggal Berakhir</Form.Label>
              <Form.Control
                type="date"
                value={tanggalBerakhir}
                onChange={(e) => setTanggalBerakhir(e.target.value)}
                ref={tbReff}
                onKeyDown={(e)=>handleKey(e, jmReff)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formJamMulai">
              <Form.Label>Jam Mulai</Form.Label>
              <Form.Control
                type="time"
                value={jamMulai}
                onChange={(e) => setJamMulai(e.target.value)}
                ref={jmReff}
                onKeyDown={(e)=>handleKey(e, jbReff)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formJamSelesai">
              <Form.Label>Jam Berakhir</Form.Label>
              <Form.Control
                type="time"
                value={jamBerakhir}
                onChange={(e) => setJamBerakhir(e.target.value)}
                ref={jbReff}
                onKeyDown={(e)=>handleKey(e, titleReff)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mt-3">
          <Form.Label>Judul Kegiatan</Form.Label>
          <Form.Control
            type="text"
            value={judulKegiatan}
            onChange={(e) => setJudulKegiatan(e.target.value)}
            ref={titleReff}
            onKeyDown={(e)=>handleKey(e, projectReff)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Nama Proyek</Form.Label>
          <Form.Select 
            onChange={handleProjectChange} 
            value={project} 
            ref={projectReff}
            onKeyDown={(e)=>handleKey(e, buttonReff)}
            >
            <option value="">Pilih....</option>
            {dataProject.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" style={{ color: '#F15858', backgroundColor: 'white' }} onClick={handleClose}>
            Kembali
        </Button>
        {isUpdated ? (
              <Button variant="danger" style={{ backgroundColor: '#F15858' }} onClick={() => editJadwal(`${ObjectData.id}`)} ref={buttonReff}>
                Edit
              </Button>
        ) : (
            <Button variant="danger" style={{ backgroundColor: '#F15858' }} onClick={addJadwal} ref={buttonReff}>
              Simpan
            </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Jadwal;
