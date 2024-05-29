import {ref, computed} from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { backendUrl } from '../varConstants'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useLoginStore = defineStore('login', ()=>{

    const router = useRouter()
    const baseUrl = backendUrl

    const handleLoginUser = async (input)=>{
        console.log(input)
        try{
            console.log(URL)
            const {data} = await axios({
                method:'post',
                url: `${baseUrl}/user/login`,
                data:input
            })
            localStorage.setItem('access_token', data.access_token)
            Swal.fire({
                toast: true,
                showConfirmButton: false,
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
                showConfirmButton: false,
                // timer: 3000,
                // timerProgressBar: true,
          
                icon: 'error',
                title: 'Permission denied',
                text: `${err.response.data.message}`
              });
        }
    }

    return {handleLoginUser}
})