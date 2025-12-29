
'use server'
import { Employee } from "@/Models/page";
import axios from "axios";
import { revalidatePath } from "next/cache";


export async function addEmployee(employee: Employee) {
    try {
        await axios.post('https://6940d172993d68afba6d18b3.mockapi.io/employees',employee);
        revalidatePath('/');
        return {success: true, message: 'Employed Added Successfully'}
    } catch (err) {
      return {success: false , message:'Faild to add employee'}  
    }
     
}

export async function updateEmployee(employee: Employee) {
    try {
        await axios.patch(`https://6940d172993d68afba6d18b3.mockapi.io/employees/${employee.id}`,employee);
        revalidatePath('/');
        return {success: true, message: 'Employed updated Successfully'}
    } catch (err) {
      return {success: false , message:'Faild to updated employee'}  
    }
    
}

export async function removeEmployee(id: string) {
    try {
        await axios.delete(`https://6940d172993d68afba6d18b3.mockapi.io/employees/${id}`);
          revalidatePath('/');
        return {success: true, message: 'Employed removed Successfully'}
    } catch (err:any) {
      return {success: false , message:'Faild to remove employee'}  
    }
    
}

 

