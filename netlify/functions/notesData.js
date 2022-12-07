export const notes = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      notes: [
        {
          id: 1,
          content: "HTML is easy",
          date: "2022-1-17T17:30:31.098Z",
          important: true,
        },
        {
          id: 2,
          content: "Browser can execute only JavaScript",
          date: "2022-1-17T18:39:34.091Z",
          important: false,
        },
        {
          id: 3,
          content:
            "GET and POST are the most important methods of HTTP protocol",
          date: "2022-1-17T19:20:14.298Z",
          important: true,
        },
        {
          id: 4,
          content: "POST is used to add data to a REST api",
          date: "2022-1-17T19:24:12.029Z",
          important: false,
        },
        {
          id: 5,
          content: "Network tab of devtools is most beneficial",
          date: "2022-1-17T20:05:51.764Z",
          important: false,
        },
      ],
    }),
  };
};
