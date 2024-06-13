import {ref} from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { backendUrl } from '../varConstants'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useItemStore = defineStore('item', ()=>{

    const router = useRouter()
    const baseUrl = backendUrl

    const items = ref(null)
    const detailItem = ref(null)
    const totalItem = ref(0)
    const totalPages = ref(1)
    const numberItemPerPage = 5

    const getAllItem = async(page = 1, search = null, sort = null, filter=null )=>{
        let option = ''
        if (search != null) {
            option += `&search=${search}`
        }

        if (sort != null ) {
            sort = sort.split(" ")
            if (sort[0]=="Jumlah"){
                if (sort[1]=="Asc"){
                    option += `&sort=jumlah`
                }
                else if (sort[1]=="Desc"){
                    option += `&sort=-jumlah`
                }
            }
            else if (sort[0]=="Nama"){
                if (sort[1]=="Asc"){
                    option += `&sort=namaBarang`
                }
                else if (sort[1]=="Desc"){
                    option += `&sort=-namaBarang`
                }
            }
        }

        if(filter != null){
            
            option += `&filter[jumlah]=${filter}`
        }

        try{
            let result
            const role = localStorage.getItem('role')
            if (role == 'User'){
                result  = await axios({
                    method:'get',
                    url: `${baseUrl}/user/items?page[size]=5&page[number]=${page}`+ option
                })
            } else{
                result  = await axios({
                    method:'get',
                    url: `${baseUrl}/admin/items?page[size]=5&page[number]=${page}`+ option
                })
            }

            items.value = result.data.data
            totalItem.value = result.data.length
            totalPages.value= Math.ceil(result.data.length/ numberItemPerPage)
            
  
        }
        catch(err){
 
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                // timer: 3000,
                // timerProgressBar: true,
          
                icon: 'error',
                title: 'Permission denied',
                text: `${err.response.data.message}`
              });
        }
    }

    const getDetailItem = async (id)=>{
        try {
            const {data} = await axios({
                method:'get',
                url: `${baseUrl}/user/item/${id}`,
                withCredentials:true
            })

            detailItem.value = data.data
        } catch (err) {
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                // timer: 3000,
                // timerProgressBar: true,
          
                icon: 'error',
                title: 'Permission denied',
                text: `${err.response.data.message}`
              });
        }
    }


    const postRentItems = async ()=>{
        try {
            const items = localStorage.getItem('items')
            Swal.fire({
                title: "Are you sure?",
                text: "Make sure you have check your order",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Rent it!"
            }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Success!",
                    text: "Your rent has been processed",
                    icon: "success"
                  });
                }
              });
        } catch (err) {
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                icon: 'error',
                title: 'Process Failed',
                text: `${err.response.data.message}`
              });
        }
    }

    const handleAddItem = async (input)=>{
        try {
        
            const { data } = await axios({
                method:'post',
                url: baseUrl +'/admin/add-item',
                data:input,
                headers:{
                  'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })

            Swal.fire({
                title: "Success!",
                text: "Item has been added",
                icon: "success",
                timer: 2000
            })
            return data
            
        } catch (err) {
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                icon: 'error',
                title: 'Process Failed',
                text: `${err.response.data.message}`
              });
        }
    }

    const deleteItem = async (id) =>{
        try {
            const { data } = await axios({
                method:'delete',
                url: baseUrl +'/admin/delete-item/'+id,
                withCredentials: true
            })
            return true

        } catch (err) {
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                icon: 'error',
                title: 'Process Failed',
                text: `${err.response.data.message}`
              });
        }
    }

    const handleEditItem = async (input, id )=>{
        try {
        
            const { data } = await axios({
                method:'put',
                url: baseUrl +'/admin/edit-item/'+id,
                data:input,
                headers:{
                  'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })

            Swal.fire({
                toast: true,
                showConfirmButton: true,
                // timer: 3000,
                // timerProgressBar: true,
            
                icon: 'success',
                title: 'Item Successfully Edited'
            })
            
            
        } catch (err) {
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                icon: 'error',
                title: 'Process Failed',
                text: `${err.response.data.message}`
              });
        }
    }

    return {
        getAllItem, 
        getDetailItem, 
        postRentItems, 
        handleAddItem, 
        deleteItem, 
        handleEditItem, 
        items, 
        detailItem, 
        totalPages}
})