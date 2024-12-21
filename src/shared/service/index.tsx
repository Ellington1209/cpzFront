import { Http } from '../../api';

class Service {
  static async create<T = any>(obj: T, route: string): Promise<any> {
    let res: any = null;
    await Http.post(`/${route}`, obj).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async get(route: string): Promise<any> {
    let res: any = null;
    await Http.get(`/${route}`).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async getById(route: string, id: string | number): Promise<any> {
    let res: any = null;
    const url = `${route}/${id}`;
  
    try {
      const response = await Http.get(url);
      res = response.data;
    } catch (error) {
      console.error(`Error on GET by ID ${Http.defaults.baseURL}${url}:`, error);
    }
  
    return res;
  }
  

  static async update<T = any>(id: string | number, data: T, route: string): Promise<any> {
    let res: any = null;
    await Http.put(`${route}/${id}`, data).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async patch<T = any>(id: string | number, data: T, route: string): Promise<any> {
    let res: any = null;
    await Http.patch(`${route}/${id}`, data).then((response) => {
      res = response.data;
    });
    return res;
  }

  static async delete(id: string | number, route: string): Promise<any> {
    let res: any = null;
    await Http.delete(`${route}/${id}`).then((response) => {
      res = response.data;
    });
    return res;
  }
}

export default Service;
