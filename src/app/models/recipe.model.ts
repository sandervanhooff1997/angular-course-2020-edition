import { Ingredient } from './ingredient.model';

export class Recipe {
  public createdAt: Date;
  // public id?: string;

  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[],
    public id?: string
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.createdAt = new Date();
  }

  // * a toString in typescript
  public toString = (): string => {
    return `Recipe ${this.name} (${this.ingredients.length} Ingredients)`;
  };
}
