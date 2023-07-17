import React from "react";
import axios from "axios";
import { createResourceId } from "src/utils/create-resource-id";
import { wait } from "src/utils/wait";
import usersApi from "../customers";

class AuthApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async signIn(request) {
    const {gmail, password} = request;
    return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`${this.baseUrl}/login` , {gmail,password});
          console.log(response);
          resolve(response.data);
        } catch (error) {
          console.error("Error while fetching users:", error);
          // window.location.href = "/500";
          return null;
        }
        
    });
  }

  async signUp(request) {
    const { name, gmail, password } = request;

    return new Promise(async (resolve, reject) => {
      try {
        let data = null;
        try {
          const response = await axios.get(`${this.baseUrl}`);
          data = response.data;
        } catch (error) {
          console.error("Error while fetching users:", error);
          // window.location.href = "/500";
          return null;
        }
        let user = data.find((user) => user.gmail === gmail);

        if (user) {
          reject(new Error("User already exists"));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          gmail,
          name,
          password,
          role: "user",
        };

        try {
          const response = await axios.post(`${this.baseUrl}`, user);
          return resolve(response);
        } catch (error) {
          console.error("Error while creating user:", error);
          return null;
        }
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }
}

export const authApi = new AuthApi("http://localhost:8081/user");
