import {Client, Databases, Query, ID } from "appwrite"

const APP_WRITE_ID = import.meta.env.VITE_APPWRITE_ID
const DATABSE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(APP_WRITE_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie)=>{
    // console.log("✅ updateSearchCount FUNCTION WAS CALLED with:", searchTerm, movie);
    // console.log(APP_WRITE_ID,DATABSE_ID, TABLE_ID)
    // 1. use appwrite sdk to check if search term already exist in database
    try{
       const result = await database.listDocuments(DATABSE_ID, TABLE_ID, [Query.equal('searchTerm', searchTerm),])
        
       
       // 2. if it does, update the count
       if(result.documents.length > 0 ){
        const doc=result.documents[0]

        await database.updateDocument(DATABSE_ID, TABLE_ID, doc.$id, {
            count: doc.count + 1
        })
       }
       // if it dosent, create a new document with the search term and count as 1
       else{
        await database.createDocument(DATABSE_ID, TABLE_ID, ID.unique(), {
            searchTerm,
            count: 1,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        })

       }
    }
    catch(error){
        console.log(error);
    }
    
    
}