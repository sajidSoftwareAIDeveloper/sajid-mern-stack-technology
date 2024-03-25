import { MongoClient } from "mongodb";

export async function ConnectMongo() {
    const url =
    "mongodb+srv://sajidshuba:ukokuQd8YtgNZ4zI@cluster0.x2beiqv.mongodb.net/sajid-quiz-project?retryWrites=true&w=majority&appName=Cluster0";
    const client = await MongoClient.connect(url);
    return client;   
}
  // insert all data 
export async function PostData(data,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).insertOne(data);
  client.close();
  return result;
}

/*
export async function UpdateData(data){
  const client = await ConnectMongo();
  const db=client.db();
  const updated=({"_id": data._id},{"name":data.name,"email":data.email});
  const result = await db.collection("crud").replaceOne(updated)
  client.close();
  return result;
}

export async function DeleteData(id){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection("crud").deleteOne(id);
  client.close();
  return result;
}
export async function FindAllData(){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection("crud").find().toArray();
  client.close();
  return result;
}
   */
  
// validate registration time unique email 
export async function validateUniqueEmail(email,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).
  findOne({email},{email:1});
  client.close();
  return result;
}   

// validate login value
export async function SearchEmailPassword(id,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).
  findOne({email:id.email, password:id.password},{name:1,_id:0});
  client.close();
  return result;  
}   

 // find the value using uniq id    
export async function findSingleValueUsingId(_id,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).findOne({_id});
  client.close();
  return result;
}  

// find the value using userId  
export async function findQuestionIdUsingUserId(userId,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).find({userId},{topicName:1,_id:1}).toArray();
  client.close();
  return result;
}  

// find value using questionId  answer
export async function findValueUsingQuestionId(resultId,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).
  find({questionId:resultId},{userName:1,score:1,date:1}).toArray();
  client.close();
  return result;
}  
// find value using userId   from answer 
export async function findValueUsingUerId(resultId,collect){
  const client = await ConnectMongo();
  const db=client.db();
  const result = await db.collection(collect).
  find({userId:resultId},{topicName:1,userName:1,score:1,date:1}).toArray();
  client.close();
  return result;
} 
