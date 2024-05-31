import {ref, computed} from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { backendUrl } from '../varConstants'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useRegisterStore = defineStore('register', ()=>{

    const router = useRouter()
    const baseUrl = backendUrl

    const handleRegisterUser = async (input)=>{
        
        try{
            if (input.password != input.passwordConfirmation){
                throw{response:{data:{message:"Password tidak sama"}}}
            }

            delete input.passwordConfirmation
            const {data} = await axios({
                method:'post',
                url: `${baseUrl}/user/register`,
                data:input
            })
           
      
            
            router.push('/login')
            Swal.fire({
                toast: true,
                showConfirmButton: true,
                // timer: 3000,
                // timerProgressBar: true,
            
                icon: 'success',
                title: `Pendaftaran Berhasil`
            })

            
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

    return {handleRegisterUser}
})