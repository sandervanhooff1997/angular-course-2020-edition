export class Ingredient {
  public createdAt: Date;

  // this will automatically create and assign the properties
  constructor(public name: string, public amount: number, public id?: string) {
    this.createdAt = new Date();
  }

  // * a toString in typescript
  public toString = (): string => {
    return `Ingredient ${this.name} (${this.amount})`;
  };
}
