exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: "연우",
      age: 85,
    }),
  };
};
