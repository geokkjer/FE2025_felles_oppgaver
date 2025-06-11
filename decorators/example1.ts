function frozen(target: Function) {
  Object.freeze(target);
  Object.freeze(target.prototype);
}

function required(target: any, key: string) {
  let currentValue = target[key];

  Object.defineProperty(target, key, {
    set: (newValue: string) => {
      if (!newValue) {
        throw new Error(`${key} is required.`);
      }
      currentValue = newValue;
    },
    get: () => currentValue,
  });
}

function deprecated(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalDef = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Warning: ${key}() is deprecated. Use other methods instead.`);
    return originalDef.apply(this, args);
  };
  return descriptor;
}
@frozen
class User {
  private static userType: string = "Generic";
    
  @required
  private _email: string;

  @required
  public username: string;

  public addressLine1: string = "";
  public addressLine2: string = "";
  public country: string = "";

  constructor(username: string, email: string) {
    this.username = username;
    this._email = email;
   ;
  }

  get userType() {
    return User.userType;
  }

  get email() {
    return this._email;
  }

  set email(newEmail: string) {
    this._email = newEmail;
  }

  @deprecated
  address(): any {
    return `${this.addressLine1}\n${this.addressLine2}\n${this.country}`;
  }
}
const u = new User("example", "example@example.com");
const p = new User("exampleUser", "example@exmaple.com");
p.addressLine1 = "1, New Avenue";
p.addressLine2 = "Bahcelievler, Istanbul";

console.log(p, u); 