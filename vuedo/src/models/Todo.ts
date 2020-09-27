export class Todo {
  id?: number;
  name: string;
  description: string;
  type: string;

  constructor( name: string, description: string,type: string, id?: number ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
  }


}
