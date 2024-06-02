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

    const getAllItem = async(page = 1)=>{

        try{
            const {data} = await axios({
                method:'get',
                url: `${baseUrl}/user/items?sort=id&page[size]=5&page[number]=${page}`
            })

            items.value = data.data
            totalItem.value = data.length
            totalPages.value= Math.ceil(data.length / numberItemPerPage.value)
            console.log("total",totalPages)
  
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

    return {getAllItem, getDetailItem, items, detailItem, totalPages}
})