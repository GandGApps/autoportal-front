import AxiosClient from "../../api/axios/AxiosClient"
import { ApiClientTypes, IApiClient } from "../../api/ApiInterfaces"

export default abstract class AbstractApiRepository<
  T extends IApiClient = AxiosClient,
> {
  apiClient!: T

  private static clients: { [key: number]: IApiClient } = {
    [ApiClientTypes.axios]: new AxiosClient(),
  }

  constructor(apiClientType = ApiClientTypes.axios) {
    //@ts-ignore
    this.setApiClient(AbstractApiRepository.clients[apiClientType])
  }

  setApiClient = (apiClient: T) => {
    this.apiClient = apiClient
  }
}
