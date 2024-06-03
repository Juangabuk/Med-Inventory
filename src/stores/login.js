import {ref, computed} from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { backendUrl } from '../varConstants'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useLoginStore = defineStore('login', ()=>{

    const router = useRouter()
    const baseUrl = backendUrl

    const userData = ref(null)
    const loginRole = ref(null)

    const handleLoginUser = async (input)=>{
        console.log(backendUrl)
        try{

            const {data} = await axios({
                method:'post',
                url: `${baseUrl}/user/login`,
                data:input,
                withCredentials:true
            })

            userData.value = data.data
            loginRole.value = "Admin"
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('role', "User")
            localStorage.setItem('user_data',JSON.stringify(data.data))
            
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                // timer: 3000,
                // timerProgressBar: true,
            
                icon: 'success',
                title: 'Selamat Datang'
            })

            router.push('/')
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

    const handleLoginAdmin = async (input)=>{

        try{

            const {data} = await axios({
                method:'post',
                url: `${baseUrl}/admin/login`,
                data:input,
                withCredentials:true
            })

            userData.value = data.data
            loginRole.value = "Admin"
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('role', "Admin")
            localStorage.setItem('user_data',JSON.stringify(data.data))
            
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                // timer: 3000,
                // timerProgressBar: true,
            
                icon: 'success',
                title: 'Selamat Datang'
            })

            router.push('/')
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

    return {handleLoginUser, handleLoginAdmin, userData, loginRole}
})