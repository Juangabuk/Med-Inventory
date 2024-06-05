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
    const numberItemPerPage = ref(5)

    const getAllItem = async(page = 1, search = null, sort = null )=>{
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

        try{
            const {data} = await axios({
                method:'get',
                url: `${baseUrl}/user/items?sort=id&page[size]=5&page[number]=${page}`+ option
            })

            items.value = data.data
            totalItem.value = data.length
            totalPages.value= Math.ceil(data.data.length / numberItemPerPage.value)
            console.log("total",data.data.length)
  
        }
        catch(err){
            console.log(err);
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

    return {getAllItem, getDetailItem, postRentItems, items, detailItem, totalPages}
})