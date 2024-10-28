import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Generate travel plan for Location : London , for 3 days for couple with a Cheap budget ,Give me a hotel options list with Hotel Name,Hotel address,Price,Hotel image url ,geocoordinates,ratings,description and suggest iterniary with placename,placedetails,placeimage url,geocoordinates,ticketpricing,rating,Time travel each of the location for 3 days with each day plan with each best time to visit in JSON format\n",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
  export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate travel plan for Location : London , for 3 days for couple with a Cheap budget ,Give me a hotel options list with Hotel Name,Hotel address,Price,Hotel image url ,geocoordinates,ratings,description and suggest iterniary with placename,placedetails,placeimage url,geocoordinates,ticketpricing,rating,Time travel each of the location for 3 days with each day plan with each best time to visit in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotels\": [\n    {\n      \"name\": \"The George Inn\",\n      \"address\": \"77 Borough High St, London SE1 1NH, United Kingdom\",\n      \"price\": \"from £60 per night\",\n      \"imageUrl\": \"https://www.thegeorgeinn.co.uk/wp-content/uploads/2019/06/George-Inn-Exterior.jpg\",\n      \"geocoordinates\": \"51.5044, -0.0935\",\n      \"ratings\": 4.5,\n      \"description\": \"A historic pub and hotel in Southwark, offering comfortable rooms and a traditional pub atmosphere.\"\n    },\n    {\n      \"name\": \"The Premier Inn London Southwark\",\n      \"address\": \"44 Southwark Bridge Rd, London SE1 9HA, United Kingdom\",\n      \"price\": \"from £50 per night\",\n      \"imageUrl\": \"https://www.premierinn.com/media/images/hotels/london/london-southwark-hotel/london-southwark-exterior.jpg\",\n      \"geocoordinates\": \"51.5059, -0.0979\",\n      \"ratings\": 4.0,\n      \"description\": \"A modern budget hotel with comfortable rooms and a central location near Borough Market.\"\n    },\n    {\n      \"name\": \"The Generator London\",\n      \"address\": \"18-22 Great Eastern St, London EC2A 3ES, United Kingdom\",\n      \"price\": \"from £30 per night\",\n      \"imageUrl\": \"https://www.generatorhostels.com/media/images/hostels/london/london-exterior-02.jpg\",\n      \"geocoordinates\": \"51.5245, -0.0784\",\n      \"ratings\": 4.2,\n      \"description\": \"A trendy hostel with a social atmosphere, offering private rooms and dorms.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"morning\": {\n        \"placeName\": \"Tower of London\",\n        \"placeDetails\": \"A historic castle with a rich history, offering tours and exhibitions.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/tower-of-london-picture-gallery\",\n        \"geocoordinates\": \"51.5074, -0.0863\",\n        \"ticketPricing\": \"Adults: £30.50, Children: £15.25\",\n        \"rating\": 4.5,\n        \"timeTravel\": \"9:00 AM - 12:00 PM\"\n      },\n      \"afternoon\": {\n        \"placeName\": \"Tower Bridge\",\n        \"placeDetails\": \"A Victorian bridge with a glass floor offering stunning views of the city.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/tower-bridge\",\n        \"geocoordinates\": \"51.5056, -0.0848\",\n        \"ticketPricing\": \"Adults: £11.50, Children: £5.75\",\n        \"rating\": 4.2,\n        \"timeTravel\": \"1:00 PM - 3:00 PM\"\n      },\n      \"evening\": {\n        \"placeName\": \"Borough Market\",\n        \"placeDetails\": \"A bustling market with a variety of food stalls, offering delicious treats and souvenirs.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/borough-market\",\n        \"geocoordinates\": \"51.5048, -0.0935\",\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 4.7,\n        \"timeTravel\": \"4:00 PM - 6:00 PM\"\n      }\n    },\n    \"day2\": {\n      \"morning\": {\n        \"placeName\": \"Buckingham Palace\",\n        \"placeDetails\": \"The official residence of the Queen, offering guided tours and a chance to witness the Changing of the Guard ceremony.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/buckingham-palace\",\n        \"geocoordinates\": \"51.5014, -0.1419\",\n        \"ticketPricing\": \"Adults: £26, Children: £12.50\",\n        \"rating\": 4.3,\n        \"timeTravel\": \"9:00 AM - 12:00 PM\"\n      },\n      \"afternoon\": {\n        \"placeName\": \"Hyde Park\",\n        \"placeDetails\": \"A large park in central London, offering a variety of activities, including boating, walking, and picnicking.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/hyde-park\",\n        \"geocoordinates\": \"51.5074, -0.1651\",\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 4.8,\n        \"timeTravel\": \"1:00 PM - 4:00 PM\"\n      },\n      \"evening\": {\n        \"placeName\": \"Piccadilly Circus\",\n        \"placeDetails\": \"A lively intersection with iconic advertising boards and street performers.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/piccadilly-circus\",\n        \"geocoordinates\": \"51.5074, -0.1405\",\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 3.9,\n        \"timeTravel\": \"5:00 PM - 7:00 PM\"\n      }\n    },\n    \"day3\": {\n      \"morning\": {\n        \"placeName\": \"British Museum\",\n        \"placeDetails\": \"A world-renowned museum with a vast collection of artifacts from around the globe.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/british-museum\",\n        \"geocoordinates\": \"51.5194, -0.1278\",\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 4.6,\n        \"timeTravel\": \"9:00 AM - 12:00 PM\"\n      },\n      \"afternoon\": {\n        \"placeName\": \"National Gallery\",\n        \"placeDetails\": \"An art museum with a collection of European paintings from the 13th to the 19th centuries.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/national-gallery\",\n        \"geocoordinates\": \"51.5074, -0.1278\",\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 4.4,\n        \"timeTravel\": \"1:00 PM - 4:00 PM\"\n      },\n      \"evening\": {\n        \"placeName\": \"South Bank\",\n        \"placeDetails\": \"A lively area with a variety of restaurants, bars, and entertainment venues.\",\n        \"placeImageUrl\": \"https://www.visitlondon.com/things-to-do/london-attractions/southbank\",\n        \"geocoordinates\": \"51.5031, -0.1167\",\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 4.7,\n        \"timeTravel\": \"5:00 PM - 8:00 PM\"\n      }\n    }\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary focuses on free or low-cost activities. \n* Consider using public transport as it is more affordable and convenient.\n* Many attractions offer free entry on specific days or times. Check the official websites for details.\n* The hotel prices are approximate and may vary depending on the season and availability.\n* Remember to book accommodations and attractions in advance, especially during peak season.\n* Consider bringing your own snacks and drinks to save money.\n* Pack comfortable walking shoes as you'll be doing a lot of walking.\n"},
          ],
        },
      ],
    });
  
    

export const AI_PROMPT='Generate Travel Plan for Location:{location} for {totaldays} days for {traveler} people with a {budget} budget ,Give me a hotel options list with Hotel Name,Hotel address,Price,Hotel image url ,geocoordinates,ratings,description and suggest iterniary with placename,placedetails,placeimage url,geocoordinates,ticketpricing,rating,Time travel each of the location for {totaldays} days with each day plan with each best time to visit in JSON format'    
  
  