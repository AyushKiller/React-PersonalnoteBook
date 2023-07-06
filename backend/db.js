const mongoose=require('mongoose');
//const mongoURI=("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0",
// );
mongoose.set('strictQuery',false);

const connectToMongo=()=>{
    
   mongoose.connect("mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0",
   {useNewUrlParser:true,
    useUnifiedTopology:true}).
   then(()=>console.log("Susessfully conected to mongo")
   // console.log(`hostname:${mongoURI.connection.host}`) 
   )
   .catch((err)=>{console.log("At mongoose.connect:");
   console.error(err.message);

});
}
module.exports=connectToMongo;