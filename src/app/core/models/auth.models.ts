export class User {
    id: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email: string;
}


export class UserModel {
  email: string;
  password: string;
}

export class UserRegistrer {
  email: string;
  password: string;
  username: string;
}

export class ImageModel {
  id: number;
  image: string;
  name: string;
  description: string;
  //tags
  tags : string[];
}
