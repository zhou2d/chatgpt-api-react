// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default async function handler(req, res) {
  const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers
  console.log("referer");
  console.log(referer);
  console.log(req);
  if (req.method !== 'POST') {
    console.log('Method should be POST');
    res.status(405).json({ message: 'Method should be POST' });
  } else if (process.env.NODE_ENV !== "development") {
    console.log(referer);
    console.log(process.env.APP_URL);
    if (!referer || referer !== process.env.APP_URL) {
      console.log('Unauthorized');
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
  else {
    try 
      console.log("2.req");
      console.log(req);
      const { body } = req;
      api_url = process.env.LLM_URL;
      console.log(api_url);
      //const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${process.env.LLM_API_KEY}`
      };

      const response = await axios.post(api_url, body, { headers: headers })

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  
}
