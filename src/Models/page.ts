

 export interface comment{
    postId:number;
    id:number;
    name:string;
    email:string;
    body:string;
    
}


 export interface todo{
    id:number;
    title:string;
    completed:boolean
}


export interface product{
    id: number;
    title:string;
    description:string;
    category:string;
    price:number;
    stock: number;
    tags:[string];
}




 export interface Employee{
    id?:string;
    name: string;
    position: string;
    age: number;
}



export interface NewsModel{
    id?: string;
    title: string;
    description: string;
    image: string;
}