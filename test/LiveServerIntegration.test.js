var request = require("supertest")("http://localhost:3011");

describe("server", () => {
  test("should respond to GET requests for /api/items/:id", done => {
    request
      .get("/api/items/5")
      .expect(200)
      .expect(res => {
        expect(res.statusCode).toBe(200);
      })
      .end(done);
  });

  test("should fetch array of similar listings", done => {
    request
      .get("/api/items/50")
      .expect(200)
      .expect(res => {
        for (var i = 0; i < res.body.length; i++) {
          expect(typeof res.body[i].city).toBe("string");
          expect(typeof res.body[i].address).toBe("string");
          expect(typeof res.body[i].price).toBe("number");
          expect(typeof res.body[i].bedNum).toBe("number");
          expect(typeof res.body[i].bathNum).toBe("number");
          expect(typeof res.body[i].sqFootage).toBe("number");
          expect(typeof res.body[i].imageUrl).toBe("string");
        }
      })
      .end(done);
  });

  test("should fetch array of length 9", done => {
    request
      .get("/api/items/70")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(9);
      })
      .end(done);
  });
});
