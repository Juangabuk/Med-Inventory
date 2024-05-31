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

    const getAllItem = async()=>{

        try{
            const {data} = await axios({
                method:'get',
                url: `${baseUrl}/user/items?sort=id&page[size]=5&page[number]=1`
            })

            items.value = data.data
  
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

    return {getAllItem, getDetailItem, items, detailItem}
})