// // netlify/functions/jobs.js

// exports.handler = async function (event, context) {
//   const jobs = [
//     {
//       id: "074f",
//       title: "Frontend Developer",
//       type: "Full-time",
//       description:
//         "We are looking for a skilled Frontend Developer to join our team. You will be responsible for implementing visual elements that users see and interact with in a web application.",
//       salary: "$70,000 - $90,000",
//       company: {
//         name: "Tech Solutions",
//         location: "New York, NY",
//         website: "https://techsolutions.com",
//         logo: "https://techsolutions.com/logo.png",
//         industry: "Information Technology",
//       },
//     },
//     {
//       id: "1a2b",
//       title: "Backend Developer",
//       type: "Part-time",
//       description:
//         "Join our backend team to design, build, and maintain server-side applications. You will work closely with frontend developers to integrate user-facing elements with server logic.",
//       salary: "$60,000 - $80,000",
//       company: {
//         name: "Innovatech",
//         location: "San Francisco, CA",
//         website: "https://innovatech.com",
//         logo: "https://innovatech.com/logo.png",
//         industry: "Software Development",
//       },
//     },
//     {
//       id: "2c3d",
//       title: "Data Scientist",
//       type: "Full-time",
//       description:
//         "We are seeking a Data Scientist to analyze large amounts of raw information to find patterns that will help improve our company. You will build data products to extract valuable business insights.",
//       salary: "$8,000 - $11,000",
//       company: {
//         name: "Data Insights",
//         location: "Boston",
//         website: "https://datainsights.com",
//         logo: "https://datainsights.com/logo.png",
//         industry: "Data Analytics",
//       },
//     },
//     {
//       id: "3e4f",
//       title: "UX/UI Designer",
//       type: "Full-time",
//       description:
//         "We are looking for a creative UX/UI Designer to design software and platforms that meet people’s needs. You will combine interfaces and workflows to enhance user experience.",
//       salary: "$65,000 - $85,000",
//       company: {
//         name: "Creative Minds",
//         location: "Seattle, WA",
//         website: "https://creativeminds.com",
//         logo: "https://creativeminds.com/logo.png",
//         industry: "Design Services",
//       },
//     },
//     {
//       id: "4g5h",
//       title: "Project Manager",
//       type: "Part-time",
//       description:
//         "We are seeking an experienced Project Manager to oversee projects from inception to completion. You will coordinate teams, manage timelines, and ensure project goals are met.",
//       salary: "$75,000 - $95,000",
//       company: {
//         name: "Enterprise Solutions",
//         location: "Chicago, IL",
//         website: "https://enterprisesolutions.com",
//         logo: "https://enterprisesolutions.com/logo.png",
//         industry: "Business Consulting",
//       },
//     },
//     {
//       id: "5i6j",
//       title: "Marketing Specialist",
//       type: "Full-time",
//       description:
//         "Join our marketing team to develop and implement marketing strategies that drive brand awareness and customer engagement. You will analyze market trends and create compelling campaigns.",
//       salary: "$5,000 - $7,000",
//       company: {
//         name: "MarketPros",
//         website: "https://marketpros.com",
//         industry: "Marketing and Advertising",
//         location: "Los Angeles, CA",
//       },
//     },
//     {
//       id: "84a6",
//       title: "Python Engineer",
//       type: "Full-time",
//       description:
//         "building data pipeline that would streamline businesses and also equip our company portfolio for a greater thee",
//       salary: "R500,000 - R400,000 ",
//       company: {
//         name: "Solution Hub",
//         website: "https://marketpros.com",
//         industry: "Software Engineering",
//         location: "South Africa",
//       },
//     },
//     {
//       id: "85d0",
//       title: "Vuejs Developer",
//       type: "Full-time",
//       description:
//         "A vuejs developer is needed for a long time job with possibility of get a visa to come abroad",
//       salary: "$5,000 - $9,000",
//       company: {
//         name: "Edjuno",
//         website: "http://www.edjuno.com.ng",
//         industry: "Technology and Engineering",
//         location: "Switzerland",
//       },
//     },
//     {
//       id: "80c3",
//       title: "Junior Python Developer",
//       type: "Part-time",
//       description: "In need of a junior Python developer.",
//       salary: "$300,000 - $500,000",
//       company: {
//         name: "Little Tough",
//         website: "https://www.rent4less.com",
//         industry: "IT and Engineering",
//         location: "London",
//       },
//     },
//   ];

//   const path = event.path; // e.g. /.netlify/functions/jobs/85d0
//   const parts = path.split("/");
//   const id = parts[parts.length - 1]; // get last segment

//   if (id && id !== "jobs") {
//     const job = jobs.find((j) => j.id === id);
//     if (!job) {
//       return {
//         statusCode: 404,
//         body: JSON.stringify({ error: "Job not found" }),
//       };
//     }
//     return {
//       statusCode: 200,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(job),
//     };
//   }

//   return {
//     statusCode: 200,
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ jobs }),
//   };
// };


// netlify/functions/jobs.js

let jobs = [
  {
    id: "074f",
    title: "Frontend Developer",
    type: "Full-time",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for implementing visual elements that users see and interact with in a web application.",
    salary: "$70,000 - $90,000",
    company: {
      name: "Tech Solutions",
      location: "New York, NY",
      website: "https://techsolutions.com",
      logo: "https://techsolutions.com/logo.png",
      industry: "Information Technology",
    },
  },
  {
    id: "1a2b",
    title: "Backend Developer",
    type: "Part-time",
    description:
      "Join our backend team to design, build, and maintain server-side applications. You will work closely with frontend developers to integrate user-facing elements with server logic.",
    salary: "$60,000 - $80,000",
    company: {
      name: "Innovatech",
      location: "San Francisco, CA",
      website: "https://innovatech.com",
      logo: "https://innovatech.com/logo.png",
      industry: "Software Development",
    },
  },
  {
    id: "85d0",
    title: "Vuejs Developer",
    type: "Full-time",
    description:
      "A vuejs developer is needed for a long time job with possibility of get a visa to come abroad",
    salary: "$5,000 - $9,000",
    company: {
      name: "Edjuno",
      website: "http://www.edjuno.com.ng",
      industry: "Technology and Engineering",
      location: "Switzerland",
    },
  },
  {
    id: "80c3",
    title: "Junior Python Developer",
    type: "Part-time",
    description: "In need of a junior Python developer.",
    salary: "$300,000 - $500,000",
    company: {
      name: "Little Tough",
      website: "https://www.rent4less.com",
      industry: "IT and Engineering",
      location: "London",
    },
  },
];

// Helper function to generate a random ID
function generateId() {
  return Math.random().toString(36).substring(2, 6);
}

exports.handler = async function (event) {
  const { httpMethod, path, body } = event;
  const parts = path.split("/");
  const id = parts[parts.length - 1];

  // ✅ GET all jobs
  if (httpMethod === "GET" && id === "jobs") {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobs }),
    };
  }

  // ✅ GET one job
  if (httpMethod === "GET" && id !== "jobs") {
    const job = jobs.find((j) => j.id === id);
    if (!job) {
      return { statusCode: 404, body: JSON.stringify({ error: "Job not found" }) };
    }
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    };
  }

  // ✅ CREATE new job
  if (httpMethod === "POST") {
    const newJob = JSON.parse(body || "{}");
    if (!newJob.title || !newJob.company) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields: title and company" }),
      };
    }
    newJob.id = generateId();
    jobs.push(newJob);

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Job created successfully", job: newJob }),
    };
  }

  // ✅ UPDATE a job
  if (httpMethod === "PUT" && id !== "jobs") {
    const updatedData = JSON.parse(body || "{}");
    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) {
      return { statusCode: 404, body: JSON.stringify({ error: "Job not found" }) };
    }
    jobs[index] = { ...jobs[index], ...updatedData };
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Job updated successfully", job: jobs[index] }),
    };
  }

  // ✅ DELETE a job
  if (httpMethod === "DELETE" && id !== "jobs") {
    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) {
      return { statusCode: 404, body: JSON.stringify({ error: "Job not found" }) };
    }
    const deleted = jobs.splice(index, 1)[0];
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Job deleted successfully", job: deleted }),
    };
  }

  // Method not supported
  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method Not Allowed" }),
  };
};
