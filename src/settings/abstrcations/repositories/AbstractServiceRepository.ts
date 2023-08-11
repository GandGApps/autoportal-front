export default abstract class AbstractServiceRepository {
  protected create<T>(Model: any, data: any): T {
    return new Model(data)
  }

  protected createList<T>(Model: any, data: any): T[] {
    return data.map((json: any) => new Model(json))
  }
}
