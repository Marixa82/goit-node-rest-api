import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";
import User from "../db/User.js";


const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test login controller", () => {
    let server = null;
    beforeAll(async () => {

        await mongoose.connect(TEST_DB_HOST)
        server = app.listen(PORT);
    })
    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    })
    afterEach(async () => {
        await User.deleteMany({});
    });

    // test("test register with correct data", async () => {
    //     const registerData = {
    //         email: "test1234@gmail.com",
    //         password: "123456",
    //         subscription: "starter",
    //     };

    //     const { statusCode, body } = await request(app).post("/users/register").send(registerData);
    //     expect(statusCode).toBe(201);
    //     expect(body.email).toBe(registerData.email);
    //     const user = await User.findOne({ email: registerData.email });
    //     expect(user.subscription).toBe(registerData.subscription);
    // });

    // expect(body.subscription).toBe(registerData.subscription);

    //     const loginResponse = await request(app).post("/login").send({
    //         email: registerData.email,
    //         password: registerData.password,
    //     });

    //     expect(loginResponse.statusCode).toBe(200);
    //     expect(loginResponse.body.email).toBe(registerData.email);
    //     expect(loginResponse.body.subscription).toBe(registerData.subscription);
    // });

    test("test login with correct data", async () => {
        const registerData = {
            email: "test123@gmail.com",
            password: "123456",
            subscription: "pro",
        };

        await request(app).post("/users/register").send(registerData);


        const loginData = {
            email: "test123@gmail.com",
            password: "123456",
        }

        const { statusCode, body } = await request(app).post("/users/login").send(loginData);
        expect(statusCode).toBe(200);
        expect(body.token).toBeDefined();


        const user = await User.findOne({ email: loginData.email });
        expect(user.email).toBe(loginData.email);
        expect(typeof user.email).toBe("string");
        expect(user.subscription).toBe(registerData.subscription);
        expect(typeof user.subscription).toBe("string");
        expect(user.token).toBe(body.token)
    })
})
