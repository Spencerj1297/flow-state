export async function GET() {
    const URI = process.env.MONGODB_URI;
    console.log("This is the URI",URI)
    return Response.json({message: URI})
} 
    