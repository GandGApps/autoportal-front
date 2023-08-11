export default abstract class AbstractModel {
  getAttributes() {
    return Object.keys(this);
  }

  load(data: any) {
    this.getAttributes().forEach(attribute => {
      if (data && data.hasOwnProperty(attribute)) {
        (this as any)[attribute] = data[attribute];
      }

      return null;
    });
  }
}
