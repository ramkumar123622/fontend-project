
// 'use server'
// import { Employee } from "@/Models/page";
// import axios from "axios";
// import { revalidatePath } from "next/cache";


// export async function addEmployee(employee: Employee) {
//     try {
//         await axios.post('https://6940d172993d68afba6d18b3.mockapi.io/employees',employee);
//         revalidatePath('/');
//         return {success: true, message: 'Employed Added Successfully'}
//     } catch (err) {
//       return {success: false , message:'Faild to add employee'}  
//     }
     
// }

// export async function updateEmployee(employee: Employee) {
//     try {
//         await axios.patch(`https://6940d172993d68afba6d18b3.mockapi.io/employees/${employee.id}`,employee);
//         revalidatePath('/');
//         return {success: true, message: 'Employed updated Successfully'}
//     } catch (err) {
//       return {success: false , message:'Faild to updated employee'}  
//     }
    
// }

// export async function removeEmployee(id: string) {
//     try {
//         await axios.delete(`https://6940d172993d68afba6d18b3.mockapi.io/employees/${id}`);
//           revalidatePath('/');
//         return {success: true, message: 'Employed removed Successfully'}
//     } catch (err:any) {
//       return {success: false , message:'Faild to remove employee'}  
//     }
    
// }

 


"use server"

import { News } from "@/Models/News";
import { connectDb } from "./db"
import { NewsModel } from "@/Models/page";
import { revalidatePath } from "next/cache";



export async function getNews() {
    await connectDb();
    try {
        const news = await News.find({});
        return { success: true, data: news };
    } catch (err) {
       return {success: false, message: 'Failed to get News'}
    }
}

export async function getNewsById(id: string) {
    await connectDb();
    try {
        const news = await News.findById(id);
        return { success: true, data: news };
    } catch (err) {
       return {success: false, message: 'Failed to get News'}
    }
}


export async function addNews(news:NewsModel) {
    await connectDb();
    try {
        await News.create(news);
          revalidatePath('/');
        return { success: true, message: 'News Added Successfully' }
        
    } catch (err:any) {
        return { success: false, message: err.message }    
        
    }
}


export async function removeNews(id: string) {
    await connectDb();
    try {
        await News.findByIdAndDelete(id);
          revalidatePath('/');
        return { success: true, message: 'News Removed Successfully' }
      
    } catch (err) {
        return { success: false, message: 'Failed to remove News' }
    }
}


export async function updateNews(id: string, news:NewsModel) {
    await connectDb();
    try {
        await News.findByIdAndUpdate(id, news);
          revalidatePath('/');
        return { success: true, message: 'News Updated Successfully' }
      
    } catch (err) {
        return { success: false, message: 'Failed to update News' }
    }
}