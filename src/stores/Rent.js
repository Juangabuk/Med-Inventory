import {ref} from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { backendUrl } from '../varConstants'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useRentStore = defineStore('rent', ()=>{

    const router = useRouter()
    const baseUrl = backendUrl

    const items = ref(null)
    const users = ref(null)
    

    const getAllHistory = async(userId = null)=>{

        try{
            const role = localStorage.getItem('role')
            const userdata = JSON.parse(localStorage.getItem('user_data'))
            let result
            if (role == 'Admin'){
                result = await axios({
                    method:'post',
                    url: `${baseUrl}/admin/rented-item`,
                    data:{"id": userId || null },
                    withCredentials:true
                })
            } else{
                result = await axios({
                    method:'post',
                    url: `${baseUrl}/user/rented-item`,
                    data:{"id":Number(userdata.id)},
                    withCredentials:true
                })
            }

            items.value = result.data.data
            
  
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

    const postRentItems = async(items)=>{
        try {
           for (let item of items){
            delete item.id
           }
            const role = localStorage.getItem('role')
            if (role == 'Admin'){
                 await axios({
                    method:'post',
                    url: `${baseUrl}/admin/item-for-rent`,
                    data:{"items":items},
                    withCredentials:true
                })
            } else{
                await axios({
                    method:'post',
                    url: `${baseUrl}/user/item-for-rent`,
                    data:{"items":items},
                    withCredentials:true
                })
            }
            
        } catch (err) {
            throw err
        }
    }

    const getAllUsers = async()=>{
        try {
            const {data} = await axios({
                method:'get',
                url: `${baseUrl}/admin/all-users`,
                withCredentials:true
            })

            users.value = data.data

            
        } catch (err) {
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                icon: 'error',
                title: 'Permission denied',
                text: `${err.response.data.message}`
              });
        }
    }

    return {getAllHistory, postRentItems,getAllUsers,items, users}
})