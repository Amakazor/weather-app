import axios from "axios";

export class AxiosFetcher {
  private constructor() {}

  static get fetcher() {
    return (url: string, params: { [key: string]: string }) =>
      axios.get(url, { params: params }).then((res) => res.data);
  }
}
