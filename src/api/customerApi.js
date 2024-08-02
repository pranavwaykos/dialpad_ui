import BaseService from "./baseApi";
import { API_KEY } from "../common/constant";

class customerService extends BaseService {
  async create_contact(contactData) {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      };
      return await this.fetcher.post("", contactData, { headers: headers });
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
      return await this.fetcher.get(`?${UrPparams}`, {
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
      return await this.fetcher.delete(`${contactId}?${UrPparams}`, {
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
      let params = {
        apikey: API_KEY,
      };
      const UrPparams = new URLSearchParams(params);
      return await this.fetcher.put(`?${UrPparams}`, contactData, {
        headers: headers,
      });
    } catch (error) {
      return error;
    }
  }
}

export default customerService;
