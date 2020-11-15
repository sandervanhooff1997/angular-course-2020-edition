import { Ingredient } from './ingredient.model';

export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

  // * a toString in typescript
  public toString = (): string => {
    return `Recipe ${this.name} (${this.ingredients.length} Ingredients)`;
  };
}
