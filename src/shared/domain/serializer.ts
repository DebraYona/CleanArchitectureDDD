export interface Serializer<R> {
  serialize(data: any, map: any): R;
}
