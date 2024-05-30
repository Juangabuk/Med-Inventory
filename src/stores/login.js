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

    const handleLoginUser = async (input)=>{

        try{

            const {data} = await axios({
                method:'post',
                url: `${baseUrl}/user/login`,
                data:input
            })

            userData.value = data.data
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('role', "User")
            
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

    return {handleLoginUser, userData}
})