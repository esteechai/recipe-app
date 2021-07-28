// service is a TS class
import {Recipe} from "./recipe.model";
import { Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      ' Vegan Tofu Tikka Masala',
      'This vegan spin on classic British-Indian tikka masala is made with tofu in a masala (spice) sauce...',
      'https://www.thespruceeats.com/thmb/cO72JFFH0TCAufENSxUfqE8TmKw=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg',
      [
        new Ingredient('Tofu', 200),
        new Ingredient('Fries', 3),
      ],
    ),
    new Recipe(
      'Vegan Pasta Sauce',
      'Perfect vegan pasta sauce recipe that is simple, fuss-free and made using fresh ingredients...',
      'https://www.foodbymaria.com/wp-content/uploads/2020/02/Grandmas-Pasta-Sauce-Recipe-Easy-and-Vegan.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Fries', 3),
      ],
    )
  ];

  constructor(private slService: ShoppingListService) {

  }
  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index]
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients)
  }
}
