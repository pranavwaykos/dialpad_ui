import BaseService from "./baseApi";
import { API_KEY } from "../common/constant";

class customerService extends BaseService {
  async create_contact(contactData) {
    try {
      const headers = {
        "Content-Type": "application/json"
      };
      let data = contactData
      data.emails = [contactData.emails]
      data.phones = [contactData.phones]
      return await this.fetcher.post("/add_contact", contactData, { headers: headers });
    } catch (error) {
      return error;
    }
  }

  async get_contact_list() {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      let params = {
        apikey: API_KEY,
      };
      const UrPparams = new URLSearchParams(params);
      return await this.fetcher.get(`/list`, {
        headers: headers,
      });
    } catch (error) {
      return error;
    }
  }

  async remove_contact(contactId) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      let params = {
        apikey: API_KEY,
      };
      const UrPparams = new URLSearchParams(params);
      return await this.fetcher.delete(`/delete/${contactId}`, {
        headers: headers,
      });
    } catch (error) {
      return error;
    }
  }

  async update_contact(contactData) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      return await this.fetcher.patch(`update/${contactData.uid}`, contactData, {
        headers: headers,
      });
    } catch (error) {
      return error;
    }
  }
}

export default customerService;
