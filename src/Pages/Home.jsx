import React, { useEffect, useState } from 'react'
import Navigation from '../Components/Navigation'
import { Card, CardHeader, CardBody, CardFooter, Skeleton, Box } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { API } from '../config/API'
import Jadwal from '../Components/Form/Jadwal'
import SweetAlert from '../Components/SweetAlert'
import AddProject from '../Components/Form/AddProject'


const Home = () => {
  const name = localStorage.getItem('name')
  const rate = localStorage.getItem('rate')
  const token = localStorage.getItem('token')

  const [dataJadwal, setDataJadwal] = useState([])
  const [showModalTambahJadwal, setShowModalTambahJadwal] = useState(false)

    //   state alert 
  const [titleAlert, setTitleAlert] = useState('')
  const [messageAlert, setMessageAlert] = useState('')
  const [iconAlert, setIconAlert] = useState('')
  const [showAlert, setShowAlert] = useState(false)


  // state modal
  const [isUpdated, setIsUpdated] = useState(false)
  const [data, setData] = useState(null)

  // state durasi
  const [durasi, setDurasi] = useState('')

  // state pendapatan
  const [pendapatan, setPendapatan] = useState('')

  // state project modal
  const [showModalTambahProject, setShowModalTambahProject] = useState(false)
  const [isUpdatedProject, setIsUpdatedProject] = useState(false)

  useEffect(()=>{
    if(showModalTambahJadwal === false){
        getKegiatan()
        getTotalDurasi()
        getTotalPendapatan()
    }
  },[showModalTambahJadwal])

  const getKegiatan = async () =>{
    try {
      const res = await axios.get(`${API}/jadwal`, {
        headers: {
          Authorization: token
        }
      }) 
      setDataJadwal(res.data)
    } catch (error) {
      
    }
  }

  const getTotalDurasi = async () =>{
    try {
      const res = await axios.get(`${API}/jadwal/total-durasi`,{
        headers:{
          Authorization: token 
        }
      })
      setDurasi(res.data.totalDurasi)
    } catch (error) {
        console.log(error)
    }
  }

  const getTotalPendapatan = async () =>{
    try {
      const res = await axios.get(`${API}/jadwal/pendapatan`, {
        headers:{
          Authorization: token
        }
      })

      setPendapatan(res.data.totalSemua)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getKegiatan()
    getTotalDurasi()
    getTotalPendapatan()
  },[])

  const handleEdit =  async (id) =>{
      try {
        const res = await axios.get(`${API}/jadwal/detail/${id}`, {
              headers: {
                Authorization: token
              }
            })
            setData(res.data)
            setIsUpdated(true)
            setShowModalTambahJadwal(true)
      } catch (error) {
        
      }
  }

  const harga = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR',  minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(number)
  }

  // datatable column 
  const columnsDatatable = [
      {
        name: 'Judul Kegiatan',
        selector: row => row.title
      },
      {
        name: 'Nama Proyek',
        selector: row =>row.project_name
      },
      {
        name: 'Tanggal Mulai',
        selector: row =>row.tanggal_mulai.substring(0, 10)
      },
      {
        name: 'Tanggal Berakhir',
        selector: row =>row.tanggal_selesai.substring(0, 10)
      },
      {
        name: 'Waktu Mulai',
        selector: row =>row.jam_mulai.substring(0, 5)
      },
      {
        name: 'Waktu Selesai',
        selector: row =>row.jam_selesai.substring(0,5)
      },
      {
        name: 'Durasi',
        selector: row =>row.durasi.substring(0,5)
      },
       {
        name: 'Aksi',
        cell: row => (
            <div>
                <button onClick={() => handleEdit(row.id)} style={{ cursor: 'pointer', color: "#F15858" }} className='btn'>
                    <EditIcon/>
                </button>
                <button onClick={() => deleteJadwal(row.id)} style={{ cursor: 'pointer', color: "#F15858" }} className='btn'>
                    <DeleteIcon/>
                </button>
            </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
  ]


  const HandleShowModalTambahJadwal = () =>{
    setShowModalTambahJadwal(true)
    setIsUpdated(false)
  }


  const deleteJadwal = async (id) =>{
    console.log(id)
    try {
        await axios.delete(`${API}/jadwal/delete/${id}`,{
          headers: {
            Authorization: token
          }
        })
        setTitleAlert('Berhasil')
        setIconAlert('success')
        setMessageAlert('Berhasil Menghapus Data')
        setShowAlert(true)
        getKegiatan()
        getTotalDurasi()
        getTotalPendapatan()
    } catch (error) {

    }
  }

  const HandleShowModalTambahProject = () =>{
    setShowModalTambahProject(true)
    setIsUpdatedProject(false)
  }

  return (
    <Navigation  className="d-flex justify-content-center">
        <SweetAlert
            show = {showAlert}
            title= {titleAlert}
            text = {messageAlert}
            icon = {iconAlert}
            onConfirm={()=>setShowAlert(false)}
        />
        <Jadwal 
          showModal={showModalTambahJadwal} 
          setShowModal={setShowModalTambahJadwal}
          isUpdated = {isUpdated}
          ObjectData = {data}
          />
          <AddProject
            show={showModalTambahProject}
            handleClose={setShowModalTambahProject}
           />
        <Card className='container mt-5 mb-5'>
          <CardHeader className='d-flex justify-content-start'>
            <div className='name-margin mb-0'>
              <p className='mb-2'>Nama Karyawan</p>
              <p className='h5'>{name}</p>
            </div>
            <div>
              <p className='mb-2'>Rate</p>
              <p className='h5'>{`${harga(rate)}/Jam`}</p>
            </div>
          </CardHeader>
          <CardBody className='mb-0'>
            <div className='d-flex mb-5'>
              <h3 className='daftar-kegiatan'>Daftar Kegiatan</h3>
              <button 
                className='btn btn-tambah-kegiatan'
                onClick={HandleShowModalTambahJadwal}
                > 
                <span  className='tambah-kegiatan-icon'><AddIcon/></span> 
                <span className='daftar-kegiatan-text'>daftar-kegiatan</span>
              </button>
              <button 
                className='btn btn-tambah-kegiatan mx-5'
                onClick={HandleShowModalTambahProject}
                > 
                <span  className='tambah-kegiatan-icon'><AddIcon/></span> 
                <span className='daftar-kegiatan-text'>Projek</span>
              </button>
            </div>
            <DataTable
                className='custom-datatable'
                columns={columnsDatatable}
                data={dataJadwal}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
             />
          </CardBody>
          <CardFooter className='mt-0 d-flex flex-column'>
            <div className='w-100'>
                <div className='d-flex justify-content-between'>
                  <h5 className='total-durasi'>Total Durasi</h5>
                  <h5 className='total-durasi'>{durasi}</h5>
                </div>
            </div>
             <div className='w-100'>
                <div className='d-flex justify-content-between'>
                  <h4 className='total-durasi'>Total Pendapatan</h4>
                  <h4 className='total-durasi'>{harga(pendapatan)}</h4>                    
                </div>
            </div>
          </CardFooter>
        </Card>
    </Navigation>
  )
}

export default Home